$($ => {

	let generateButton = $("#generate");
	let resetButton = $("#reset");
	let gameBoard = $("#grid");
	let columns = $("#columns");
	let rows = $("#rows");
	// 
	let mines = $("#mines");
	// tracking the current number of mines generated
	let numberOfMines = 0;

 // 

 	resetButton.on("click", function() {

	 window.location.reload();

	});

	generateButton.on("click", function () {



		generateBoard();

	});



	function generateBoard() {
		// width of each cell
		let w = 50;
		// constructing the board by running through the number of columns * the number of rows with 2 for loops
		for(var x = 0; x < columns.val(); x++) {
        
        	for(var y = 0; y < rows.val(); y++) {
            	// creating a div for each unit
            	let cell = $("<div>");
            	cell.addClass("cell");

            	let col = x;
            	let row = y;
            	// shifting each cell either right or down in the grid based on col / row number * the width of the cell
            	cell.css( "left", col * w);
            	cell.css( "top", row * w);
            	
            	// adding a class to ensure borders display correctly on the bottom right of the grid
            	if(col === columns.val() - 1)cell.addClass("right");
            	if(row === rows.val() - 1)cell.addClass("bottom");
            	
            	// adds each cell to the grid <div> as children
            	cell.appendTo(gameBoard);
            }
		}

		generateMines();
	}


	function generateMines() { 
		
		let numberOfBoxes = columns.val() * rows.val();
		let maxMines = mines.val();

		// a loop to repeat the mine generating function until the correct number of mines have been generated
		do {
			// looping over  each individual cell <div>
			$(".cell").each ((index, el) => {
				
				let cell = $(el);
				// random number generator set to the max size of the game board - used to match the index of each div to a random number so as to randomly place mines when the two equal
				let randomNum = Math.floor(Math.random() * numberOfBoxes + 1);
				
				// maximum number of mines condition (ensures the number of mines does not exceed that set by the user)
				if(numberOfMines < maxMines) {
				
				// prevents mines from being applied to divs which already contain a mine 
					if (!cell.hasClass("mine")) {
						

						if (index === randomNum) {
		         			let mine = $("<text>x</text>");
							cell.addClass("mine");
		         			mine.appendTo(cell);
		         			numberOfMines += 1;

		         			
						}
					}
				}
			})
		}
		// similar to the condition above, ensures the number of mines does not exceed that set by the user
		while (numberOfMines < maxMines);

		// ensures the next function only runs once the correct number of mines has been generated
		if (numberOfMines = maxMines) {
			checkMineLocation();
		}
	
	}


	function checkMineLocation() {

		let mineCells = [];
		let notMineCells = [];
		
		// iterates over each cell <div> and stores their coordinates in two seperate arrays for mine coordinates, and empty cell coordinates
		$(".cell").each ((index, el) => {
			let cell = $(el);

			if (cell.hasClass("mine")) {
				
				// cell.position() returns the top and left css values of each cell
				mineCells.push(cell.position());
			}

			if (!cell.hasClass("mine")) {

				notMineCells.push(cell.position()); 
			}

		})
		// passes both arrays into the next function
		setMineDistance(mineCells, notMineCells);
	
	}


	function setMineDistance(mineArr, notMineArr) {

		// $.each accesses each object in an array i.e. notMineArr
		$.each(notMineArr, function(i, value) {
			
			let blankObj = value;

			// a counter to keep track of how many mines are nearby, set to 0 for each object
			blankObj.counter = 0;

			$.each(mineArr, function(i, obj) {
				
				let mineObj = obj;

				// a set of conditions that compare the positions of each blank cell to each mine
				// if any condition is met, a mine must be nearby, and the counter is increased by one.
				if (mineObj.top === blankObj.top && Math.abs(mineObj.left - blankObj.left) === 50) {
				  	blankObj.counter += 1;
				}

				if (mineObj.left === blankObj.left && Math.abs(mineObj.top - blankObj.top) === 50) {
				  	blankObj.counter += 1;
					
				}

				if (Math.abs(mineObj.top - blankObj.top) === 50 && Math.abs(mineObj.left - blankObj.left) === 50) {
				  	blankObj.counter += 1;
					
				}
			})
		})

		// iterating over each cell for the purpose of applying the object counter to the cell, should that counter exist
		$(".cell").each ((index, el) => {
			let cell = $(el);

			$.each(notMineArr, function(i, obj) {

				
				if (obj.counter) {

					// matches the position of the cells to the position stored in the object to ensure that the correct counter is applied to the correct object
					if (cell.position().top === obj.top && cell.position().left === obj.left) {
						
						let mineDistance = $("<text>"+obj.counter+"</text>");
		         			mineDistance.appendTo(cell);
		         			

		         		if (obj.counter === 1) {
						cell.addClass("one")
						} else if (obj.counter === 2) {
							cell.addClass("two")
						} else if (obj.counter === 3) {
							cell.addClass("three")
						} else if (obj.counter === 4) {
							cell.addClass("four")
						} else if (obj.counter === 5) {
							cell.addClass("five")
						}
					}


				}
			})
		})
	}
});