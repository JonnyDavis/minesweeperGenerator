# Minesweeper Board Generator - Jonathan Davis

# Planning / Thought Process

1. Accept user inputs of column & row size, as well as the number of mines.
2. Construct a grid based on the users inputs.
3. Generate mines randomly dispersed around the grid.
4. Calculate number of mines surrounding each empty cell.

I used Javascript in conjunction with JQuery as I not only felt comfortable using this language, but also felt that the nature of the task lends itself well to JQuery / Javascript due to the mathematics & generation through functions that would be involved.

## Generating the Board

In order to generate the board I need to accept 'n' columns & rows and can iterate over both these numbers with for loops in order to produce the correct number of cells (empty divs). I can then position these cells using CSS.

## Generating the Mines

I can generate the mines by iterating over each div and utilising a randomly generated number to assign an 'X' to each div when said number equals the index. I can repeat this process until the maximum number of mines has been produced.

## Setting Blank Cells to Display Number of Surrounding Mines

I can take the coordinates of each cell containing mines and each blank cell and store them in seperate arrays. I can then iterate over each object in both arrays and set a condition to determine whether an object in the blank array is close to an object in the mines array.

Using a counter variable to keep track of how many mines are surrounding a blank cell, i can then assign the appropriate text to that cell.

# Conclusion / Possible Improvements

I'm happy that the criteria of the task has been met although I feel having completed the task, that certain sections could have been done differently.

- Firstly, the code is poorly optimised, particularly due to the amount of times each cell is being iterated over. This is noticable if you try to generate a large number of cells. Finding a different way to store cell coordinates could help combat this problem.
- If i had more time I would implement some CSS, as in its current state the game is looking pretty barebones and not particularly attractive to potential users.
- Another beneficial improvement could be to completely reset the grid should the user generate multiple times without refreshing. In its current state the new grid will generate on top the previous grid should the user not refresh the page.