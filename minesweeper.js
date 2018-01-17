$($ => {

	let generateButton = $("#generate");
	let gameBoard = $("#grid");
	let columns = $("#columns");
	let rows = $("#rows");
	let maxMines = 10;
	let block = $("#block");
	let numberOfMines = $("#mines").val();



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

		while (numberOfMines < maxMines) {
			
			$(".block").each ((index, el) => {
				let block = $(el);

				let randomNum = Math.floor(Math.random() * numberOfBoxes + 1);
				
				if(numberOfMines < maxMines) {
				
					if (!block.hasClass("mine")) {
						
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