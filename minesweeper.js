$($ => {

	let generateButton = $("#generate");
	let gameBoard = $("#grid");
	let columns = $("#columns");
	let rows = $("#rows");
	// 
	let mines = $("#mines");
	let block = $("#block");
	// tracking the current number of mines generated
	let numberOfMines = 0;

 // 

	generateButton.on("click", function () {

		generateBoard();


        	
    	

	});

	function generateBoard() {
		// width of each box
		let w = 50;
		
		
		for(var x = 0; x < columns.val(); x++) {
        
        	for(var y = 0; y < rows.val(); y++) {
            	
            	let box = $("<div>");
            	box.addClass("block");
            	
            	let col = (x % columns.val());
            	let row = Math.floor(y % rows.val());
            	
            	box.css( "left", col * w);
            	box.css( "top", row * w);
            	
            	if(col === columns.val() - 1)box.addClass("right");
            	if(row === rows.val() - 1)box.addClass("bottom");
            	
            	box.appendTo(gameBoard);
	
            }
		}

		generateMines();
	}


	function generateMines() { 
		
		let numberOfBoxes = columns.val() * rows.val();
		let maxMines = mines.val();
		console.log(maxMines);
		// a loop to repeat the mine generating function until the correct number of mines have been generated
		while (numberOfMines < maxMines) {
			// a loop to apply a function for each block (div)
			$(".block").each ((index, el) => {
				
				let block = $(el);
				// random number generator set to the max size of the game board - used to match the index of each div to a random number so as to randomly place mines
				let randomNum = Math.floor(Math.random() * numberOfBoxes + 1);
				
				// maximum number of mines condition (similar functionality as while loop above)
				if(numberOfMines < maxMines) {
				
				// prevents mines from being applied to divs which already contain a mine 
					if (!block.hasClass("mine")) {
						
						// 
						if (index === randomNum) {
		         			let mine = $("<text>x</text>");
							block.addClass("mine");
		         			mine.appendTo(block);
		         			numberOfMines += 1;

		         			console.log(numberOfMines);
						}


					}
				}

			})
		}

	}


});