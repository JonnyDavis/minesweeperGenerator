$($ => {

	let generateButton = $("#generate");
	let gameBoard = $("#grid");
	let columns = $("#columns");
	let rows = $("#rows");
	// 
	let mines = $("#mines");
	// tracking the current number of mines generated
	let numberOfMines = 0;

 // 

	generateButton.on("click", function () {


		generateBoard();

	});

	function generateBoard() {
		// width of each cell
		let w = 50;
			
		for(var x = 0; x < columns.val(); x++) {
        
        	for(var y = 0; y < rows.val(); y++) {
            	
            	let cell = $("<div>");
            	cell.addClass("cell");

            	
            	let col = (x % columns.val());
            	let row = Math.floor(y % rows.val());
            	
            	cell.css( "left", col * w);
            	cell.css( "top", row * w);
            	
            	if(col === columns.val() - 1)cell.addClass("right");
            	if(row === rows.val() - 1)cell.addClass("bottom");
            	
            	cell.appendTo(gameBoard);
            }
		}

		generateMines();
	}


	function generateMines() { 
		
		let numberOfBoxes = columns.val() * rows.val();
		let maxMines = mines.val();
		//console.log(maxMines);
		// a loop to repeat the mine generating function until the correct number of mines have been generated
		do {
			// a loop to apply a function for each cell (div)
			$(".cell").each ((index, el) => {
				
				let cell = $(el);
				// random number generator set to the max size of the game board - used to match the index of each div to a random number so as to randomly place mines
				let randomNum = Math.floor(Math.random() * numberOfBoxes + 1);
				
				// maximum number of mines condition (similar functionality as while loop above)
				if(numberOfMines < maxMines) {
				
				// prevents mines from being applied to divs which already contain a mine 
					if (!cell.hasClass("mine")) {
						

						if (index === randomNum) {
		         			let mine = $("<text>x</text>");
							cell.addClass("mine");
		         			mine.appendTo(cell);
		         			numberOfMines += 1;

		         			//console.log(numberOfMines);
						}
					}
				}
			})
		}
		
		while (numberOfMines < maxMines);

		//console.log(numberOfMines);
		//console.log(maxMines);

		if (numberOfMines = maxMines) {
			checkMineDistance();
		}
	
	}


	function checkMineDistance() {

		let bombCells = [];
		let notBombCells = [];
		
		$(".cell").each ((index, el) => {
			let cell = $(el);

			if (cell.hasClass("mine")) {
			
				bombCells.push(cell.position());
			}

			if (!cell.hasClass("mine")) {

				notBombCells.push(cell.position()); 
			}

		})

		setMineDistance(bombCells, notBombCells);
	
	}


	function setMineDistance(bombArr, notBombArr) {
		let testBomb = { top: 100, left: 50};
		let testCell = { top: 100, left: 150};
		// console.log(bombArr);
		// console.log(notBombArr);

		$.each(notBombArr, function(i, value) {
			let blankObj = value;
			blankObj.counter = 0;
			console.log(blankObj);

			$.each(bombArr, function(i, obj) {
				let bombObj = obj;

				//console.log(bombObj.top);
				if (bombObj.top === blankObj.top && Math.abs(bombObj.left - blankObj.left) === 50) {
				  	blankObj.counter += 1;
				}

				if (bombObj.left === blankObj.left && Math.abs(bombObj.top - blankObj.top) === 50) {
				  	blankObj.counter += 1;
					
				}

				if (Math.abs(bombObj.top - blankObj.top) === 50 && Math.abs(bombObj.left - blankObj.left) === 50) {
				  	blankObj.counter += 1;
					
				}
			})
		})

		//console.log(notBombArr);

		$(".cell").each ((index, el) => {
			let cell = $(el);

			//console.log(cell.position().top);
			$.each(notBombArr, function(i, obj) {

				//console.log(obj.top);
				if (obj.counter) {

					//console.log(obj);
					if (cell.position().top === obj.top && cell.position().left === obj.left) {
						let mineDistance = $("<text>"+obj.counter+"</text>");
		         			mineDistance.appendTo(cell);
		         			
					}
				}
			})
		})
	}
});