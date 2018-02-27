var self = module.exports = {
//---------------Helper Functions

// parse 2D array to html table
createTable: function (myArray) {
  var result = "<table>";
  for(var i=0; i<myArray.length; i++) {
      result += "<tr>";
      for(var j=0; j<myArray[i].length; j++){
          if(myArray[i][j]!==0){
            result += "<td>"+myArray[i][j]+"</td>";
          }else{
            result += "<td><input></td>";
          }
      }
      result += "</tr>";
  }
  result += "</table>";

  return result;
},

// a helper function which turns the following Array
//[ [[], [], []], [[], [], []], [[], [], []] ] to following format
// [ [], [], [], [], [], [], [], [], [] ]
groupsTo2dAgain: function(arr) {
    var temp = [];
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            temp.push(arr[i][j]);
        }
    }
    return temp;
},

//a helper function which return column of 2DArray in Row
 extractColumn: function(arr, column) {
    function reduction(previousValue, currentValue) {
        previousValue.push(currentValue[column]);
        return previousValue;
    }
    return arr.reduce(reduction, []);
},

//Generate two unique random values between (0,1,2)
generateTwoRandomValues: function() {
    var max = 2;
    var min = 0;
    var temp = (max - min + 1) + min;
    var numberOne = Math.floor(Math.random(temp) * 3);

    do {
        var numberTwo = Math.floor(Math.random(temp) * 3);
    } while (numberOne == numberTwo);

    return [numberOne, numberTwo];
},

// returns a random value between 0,1,2
randomGroupNumber: function() {
    var min = 0;
    var max = 3;
    return Math.floor(Math.random() * (max - min) + min);
},

//parse array to string format of sample board
parseBoardToString: function(arr) {
    var res = "";
    var temp;
    for (var i = 0; i < arr.length; i++) {
        temp = (arr[i]);
        res = res + temp.toString();
        res = res.split(',').join('');
        if (i < arr.length - 1)
            res += '\n';
    }
    return res;
},

//Parse Board to an Array
parseBoard: function(board) {

    return board.split('\n').map(function(row) {
        return row.split('').map(function(num) {
            return +num;
        });
    });
},

//---------------End of Helper Functions


//---------------Row permutation's functions

//return rows of the board in  a 2Darray
 getRows: function(board) {
    return self.parseBoard(board);
},

//every 3 rows are one rowGroup so for example row1, row2, row3 are row group 1
// and row4, row5, row6 are row group 2 and so on
//return  a row group in a 2Darray
 getRowGroup: function(board, group) {
    var rows = self.getRows(board);
    var rowGroup;
    switch (group) {
        case 1:
            rowGroup = rows.slice(0, 3);
            break;
        case 2:
            rowGroup = rows.slice(3, 6);
            break;
        case 3:
            rowGroup = rows.slice(6, 9);
            break;
    }
    return rowGroup;
},

//return a 2Darray with every rowGroup being stored in a seperate array
 getRowGroups: function(board) {
    var rowGroups = [];
    for (var i = 1; i < 4; i++) {
        var temp = self.getRowGroup(board, i);
        rowGroups.push(temp);
    }
    return rowGroups;
},

// return an array which contain selected row from selected group
 getRowOfTheGroup: function(board, group, row) {
    var rowGroup = self.getRowGroup(board, group);
    return rowGroup[row - 1];
},

//permute place of two row groups (for example row1,row2,row3 permuted with row7, row8, row9)
//and returns a string in format of sampleBoard
 swapRowGroups: function(board, groupA, groupB) {
    var temp;
    var groups = self.getRowGroups(board);
    var groupOne = groups[groupA - 1];
    var groupTwo = groups[groupB - 1];
    groups.splice(groupA - 1, 1);
    groups.splice(groupA - 1, 0, groupTwo);
    groups.splice(groupB - 1, 1);
    groups.splice(groupB - 1, 0, groupOne);
    temp = self.groupsTo2dAgain(groups);
    return self.parseBoardToString(temp);
},

//permute places of rows in a given group (for example group 1 permute row1 and row3)
//and return a string in format of sampleBoard
 swapRowsOfSameGroup: function(board, group, rowA, rowB) {
    var temp;
    var firstRow = self.getRowOfTheGroup(board, group, rowA);
    var secondRow = self.getRowOfTheGroup(board, group, rowB);
    var tempGroup = self.getRowGroup(board, group);
    var groups = self.getRowGroups(board);
    tempGroup.splice(rowA - 1, 1);
    tempGroup.splice(rowA - 1, 0, secondRow);
    tempGroup.splice(rowB - 1, 1);
    tempGroup.splice(rowB - 1, 0, firstRow);
    groups.splice(group - 1, 1);
    groups.splice(group - 1, 0, tempGroup);
    temp = self.groupsTo2dAgain(groups);
    return self.parseBoardToString(temp);

},
//----------------End of row permutation's functions

//----------------Column permutations Functions

//return columns of the board in  a 2Darray
getColumns: function(board) {
    var rows = self.getRows(board);
    var columns = [];
    for (var i = 0; i < rows.length; i++) {
        columns.push(self.extractColumn(rows, i));
    }
    return columns;
},

//every 3 columns are one columnGroup so for example col1, col2, col3 are column group 1
// and col4, col5, col6 are column group 2 and so on
//return  a column group in a 2Darray
 getColumnGroup: function(board, group) {
    var columns = self.getColumns(board);
    var columnGroup;
    switch (group) {
        case 1:
            columnGroup = columns.slice(0, 3);
            break;
        case 2:
            columnGroup = columns.slice(3, 6);
            break;
        case 3:
            columnGroup = columns.slice(6, 9);
            break;
    }
    return columnGroup;
},

//return a 2Darray with every columnGroup being stored in a seperate array
getColumnGroups:  function(board) {
    var columnGroups = [];
    for (var i = 1; i < 4; i++) {
        var temp = self.getColumnGroup(board, i);
        columnGroups.push(temp);
    }
    return columnGroups;
},

// return an array which contain selected row from selected group
getColumnOfTheGroup: function(board, group, col) {
    var columnGroup = self.getColumnGroup(board, group);
    return columnGroup[col - 1];
},

//permute place of two column groups (for example col1,col2,col3 permuted with col7, col8, col9)
//and returns a string in format of sampleBoard
 swapColumnGroups: function(board, groupA, groupB) {
    var temp;
    var res;
    var groups = self.getColumnGroups(board);
    var groupOne = groups[groupA - 1];
    var groupTwo = groups[groupB - 1];
    groups.splice(groupA - 1, 1);
    groups.splice(groupA - 1, 0, groupTwo);
    groups.splice(groupB - 1, 1);
    groups.splice(groupB - 1, 0, groupOne);
    temp = self.parseBoardToString(self.groupsTo2dAgain(groups));
    res = self.getColumns(temp);
    return self.parseBoardToString(res);
},

//permute places of columns in a given group (for example group 1 permute col1 and col3)
//and return a string in format of sampleBoard
 swapColumnsOfSameGroup: function(board, group, colA, colB) {
    var temp;
    var res;
    var firstColumn = self.getColumnOfTheGroup(board, group, colA);
    var secondColumn = self.getColumnOfTheGroup(board, group, colB);
    var tempGroup = self.getColumnGroup(board, group);
    var groups = self.getColumnGroups(board);
    tempGroup.splice(colA - 1, 1);
    tempGroup.splice(colA - 1, 0, secondColumn);
    tempGroup.splice(colB - 1, 1);
    tempGroup.splice(colB - 1, 0, firstColumn);
    groups.splice(group - 1, 1);
    groups.splice(group - 1, 0, tempGroup);
    temp = self.parseBoardToString(self.groupsTo2dAgain(groups));
    res = self.getColumns(temp);
    return self.parseBoardToString(res);
},

//----------------End of Column permutations Functions


//it takes the sample board as input, swap two random column groups,
//then takes a random column group and switch two random columns of that group
//Does the same thing with rows and returns the new board as a string in format of sample boards
// the result will be a valid new 3*3 board
 generateNewBoard: function() {
   //this presents a 3*3 sudoku board
   var sampleBoard =
       '090000006\n' +
       '000960485\n' +
       '000581000\n' +
       '004000000\n' +
       '517200900\n' +
       '602000370\n' +
       '100804020\n' +
       '706000810\n' +
       '300090000';
    var randomValues = self.generateTwoRandomValues();
    var board = self.swapColumnGroups(sampleBoard, (randomValues[0] + 1), (randomValues[1] + 1));
    randomValues = self.generateTwoRandomValues();
    var randomGroup = self.randomGroupNumber();
    board = self.swapColumnsOfSameGroup(board, (randomGroup + 1), (randomValues[0] + 1), (randomValues[1] + 1));
    randomValues = self.generateTwoRandomValues();
    board = self.swapRowGroups(board, (randomValues[0] + 1), (randomValues[1] + 1));
    randomValues = self.generateTwoRandomValues();
    var randomGroup = self.randomGroupNumber();
    board = self.swapRowsOfSameGroup(board, (randomGroup + 1), (randomValues[0] + 1), (randomValues[1] + 1));

    return board;
},

//----------------Functions for solving the board

//return an 2Darray with position of zeros in the array(parsed)board
 saveEmptyPositions: function(sampleBoard){
  var emptyPositions = [];
  for(var i = 0; i < sampleBoard.length; i++) {
    for(var j = 0; j < sampleBoard[i].length; j++) {
      if(sampleBoard[i][j] === 0) {
        emptyPositions.push([i, j]);
      }
    }
  }
  return emptyPositions;
},

//Check to see if there is the same value in the same row
checkRow: function(board, row, value) {
  for(var i = 0; i < board[row].length; i++) {
    if(board[row][i] === value) {
      return false;
    }
  }
  return true;
},

//Check to see if there is the same value in the same col
checkColumn: function(board, column, value) {
  for(var i = 0; i < board.length; i++) {
    if(board[i][column] === value) {
      return false;
    }
  }
  return true;
},

//Check to see if there is the same value in the 3*3 square
checkSquare: function(board, column, row, value) {
  var columnCorner = 0;
  var rowCorner = 0;
  var squareSize = 3;

  // Find the left-most column
  while(column >= columnCorner + squareSize) {
    columnCorner += squareSize;
  }

  // Find the upper-most row
  while(row >= rowCorner + squareSize) {
    rowCorner += squareSize;
  }

  for(var i = rowCorner; i < rowCorner + squareSize; i++) {
    for(var j = columnCorner; j < columnCorner + squareSize; j++) {
      if(board[i][j] === value) {
        return false;
      }
    }
  }
  return true;
},

//Checks if the value exisit in the same col row and square
checkValue: function(board, column, row, value) {
  if(self.checkRow(board, row, value) &&
    self.checkColumn(board, column, value) &&
    self.checkSquare(board, column, row, value)) {
    return true;
  } else {
    return false;
  }
},

//solve the puzzle and return the board
solvePuzzle: function(board, emptyPositions) {
  var limit = 9;
  var i;
  var row;
  var column;
  var value;
  var found;

  for(i = 0; i < emptyPositions.length;) {
    row = emptyPositions[i][0];
    column = emptyPositions[i][1];
    value = board[row][column] + 1;
    found = false;
    while(!found && value <= limit) {
      if(self.checkValue(board, column, row, value)) {
        found = true;
        board[row][column] = value;
        i++;
      }
      else {
        value++;
      }
    }
    if(!found) {
      board[row][column] = 0;
      i--;
    }
  }
  board.forEach(function(row) {
    row.join();
  });
  return board;
},

//gets string board and solve it and return it
solveSudoku: function(board) {
  var parsedBoard = self.parseBoard(board);
  var emptyPositions = self.saveEmptyPositions(parsedBoard);
  var res = self.solvePuzzle(parsedBoard, emptyPositions);
  res = self.parseBoardToString(res);
  return res;
}
};
//----------------End of Functions for solving the board
