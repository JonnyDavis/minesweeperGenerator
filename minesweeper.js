$($ => {

	let generateButton = $("#generate");
	let columns = $("#columns");
	let rows = $("#rows");


	generateButton.on("click", function () {

		let w = 50;
		let boxNumbers = columns.val() * rows.val();
		for(var x = 0; x < columns.val(); x++) {
        	for(var y = 0; y < rows.val(); y++) {
            	let box = $("<div>");
            	box.addClass("block");
            	box.addClass(x);
            	let col = (x % columns.val());
            	let row = Math.floor(y % rows.val());
            	box.css( "left", col * w);
            	box.css( "top", row * w);
            	if(col === columns.val() - 1)box.addClass("right");
            	if(row === rows.val() - 1)box.addClass("bottom");
            	box.appendTo("#container");

    //     		let mine = $("<text>x</text>");
				// mine.addClass("mine");
    //     		mine.appendTo(box);
            
            	

        	}
    	}





	});


});