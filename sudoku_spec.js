var Chai = require('chai');
var expect = Chai.expect;
var sudoku = require('./sudoku');

describe('Sudoku Generator And Solver\n', function() {
    var board = '090000006\n' +
        '000960485\n' +
        '000581000\n' +
        '004000000\n' +
        '517200900\n' +
        '602000370\n' +
        '100804020\n' +
        '706000810\n' +
        '300090000';
    var parsedBoard, groups, expectedBoard, twoRandomValues, parseBoardToString,
        rows, rowGroup, rowGroups, rowOfTheGroup, swapedRowGroups, swapedRowsOfSameGroup,
        columns, columnGroup, columnGroups, columnOfTheGroup, swapedColumnGroups, swapedColumnOfSameGroup;


        describe('#createTable()\n', function() {
            it('should parse a 2Darray to html table ',function() {
                    parsedBoard = sudoku.parseBoard(board);
                    expectedBoard ="<table><tr><td><input></td><td>9</td><td><input></td><td><input></td><td><input></td><td><input></td><td><input></td><td><input></td><td>6</td></tr><tr><td><input></td><td><input></td><td><input></td><td>9</td><td>6</td><td><input></td><td>4</td><td>8</td><td>5</td></tr><tr><td><input></td><td><input></td><td><input></td><td>5</td><td>8</td><td>1</td><td><input></td><td><input></td><td><input></td></tr><tr><td><input></td><td><input></td><td>4</td><td><input></td><td><input></td><td><input></td><td><input></td><td><input></td><td><input></td></tr><tr><td>5</td><td>1</td><td>7</td><td>2</td><td><input></td><td><input></td><td>9</td><td><input></td><td><input></td></tr><tr><td>6</td><td><input></td><td>2</td><td><input></td><td><input></td><td><input></td><td>3</td><td>7</td><td><input></td></tr><tr><td>1</td><td><input></td><td><input></td><td>8</td><td><input></td><td>4</td><td><input></td><td>2</td><td><input></td></tr><tr><td>7</td><td><input></td><td>6</td><td><input></td><td><input></td><td><input></td><td>8</td><td>1</td><td><input></td></tr><tr><td>3</td><td><input></td><td><input></td><td><input></td><td>9</td><td><input></td><td><input></td><td><input></td><td><input></td></tr></table>";


                    var table = sudoku.createTable(parsedBoard);
                    expect(table.length).to.equal(expectedBoard.length);
                    expect(table).to.equal(expectedBoard);
                  });
        });


    describe('#parseBoard()\n', function() {
        it('should parse a sudoku board into a 2D array ' +
            ' and convert to integers \n',
            function() {
                parsedBoard = sudoku.parseBoard(board);
                expectedBoard = [
                    [0, 9, 0, 0, 0, 0, 0, 0, 6],
                    [0, 0, 0, 9, 6, 0, 4, 8, 5],
                    [0, 0, 0, 5, 8, 1, 0, 0, 0],
                    [0, 0, 4, 0, 0, 0, 0, 0, 0],
                    [5, 1, 7, 2, 0, 0, 9, 0, 0],
                    [6, 0, 2, 0, 0, 0, 3, 7, 0],
                    [1, 0, 0, 8, 0, 4, 0, 2, 0],
                    [7, 0, 6, 0, 0, 0, 8, 1, 0],
                    [3, 0, 0, 0, 9, 0, 0, 0, 0]
                ];

                expect(parsedBoard.length).to.equal(9);
                expect(parsedBoard[0].length).to.equal(9);
                expect(parsedBoard).to.eql(expectedBoard);
            });
    });

    describe('#groupsTo2dAgain()\n', function() {
        it('should parse array of groups [[],[],[]] ' +
            ' to [,,] \n',
            function() {
                groups = sudoku.getRowGroups(board);

                expectedBoard = [
                    [0, 9, 0, 0, 0, 0, 0, 0, 6],
                    [0, 0, 0, 9, 6, 0, 4, 8, 5],
                    [0, 0, 0, 5, 8, 1, 0, 0, 0],
                    [0, 0, 4, 0, 0, 0, 0, 0, 0],
                    [5, 1, 7, 2, 0, 0, 9, 0, 0],
                    [6, 0, 2, 0, 0, 0, 3, 7, 0],
                    [1, 0, 0, 8, 0, 4, 0, 2, 0],
                    [7, 0, 6, 0, 0, 0, 8, 1, 0],
                    [3, 0, 0, 0, 9, 0, 0, 0, 0]
                ];

                expect(groups.length).to.equal(3);
                expect(sudoku.groupsTo2dAgain(groups)).to.eql(expectedBoard);
            });
    });

    describe('#extractColumn()\n', function() {
        it('should extract coulmn of 2d array\n', function() {

            parsedBoard = sudoku.parseBoard(board);
            column = sudoku.extractColumn(parsedBoard, 0);
            expectedBoard = [0, 0, 0, 0, 5, 6, 1, 7, 3];

            expect(column.length).to.equal(9);
            expect(column).to.eql(expectedBoard);
        });
    });

    describe('#generateTwoRandomValues()\n', function() {
        it('should return an array containing two unique random numbers between 0-2 \n', function() {

            twoRandomValues = sudoku.generateTwoRandomValues();
            expect(twoRandomValues.length).to.equal(2);
            expect(twoRandomValues[0]).to.not.eql(twoRandomValues[1]);
        });
    });

    describe('#parseBoardToString()\n', function() {
        it('should parse array board to string formmat of starter board\n', function() {

            parsedBoard = sudoku.parseBoard(board);
            parseBoardToString = sudoku.parseBoardToString(parsedBoard);
            expectedBoard = '090000006\n' +
                '000960485\n' +
                '000581000\n' +
                '004000000\n' +
                '517200900\n' +
                '602000370\n' +
                '100804020\n' +
                '706000810\n' +
                '300090000';

            expect(parseBoardToString.length).to.equal(expectedBoard.length);
            expect(parseBoardToString).to.eql(parseBoardToString);
        });
    });

    describe('#getRows()\n', function() {
        it('should return rows of the board in a 2DArray\n', function() {

            rows = sudoku.getRows(board);

            expectedBoard = [
                [0, 9, 0, 0, 0, 0, 0, 0, 6],
                [0, 0, 0, 9, 6, 0, 4, 8, 5],
                [0, 0, 0, 5, 8, 1, 0, 0, 0],
                [0, 0, 4, 0, 0, 0, 0, 0, 0],
                [5, 1, 7, 2, 0, 0, 9, 0, 0],
                [6, 0, 2, 0, 0, 0, 3, 7, 0],
                [1, 0, 0, 8, 0, 4, 0, 2, 0],
                [7, 0, 6, 0, 0, 0, 8, 1, 0],
                [3, 0, 0, 0, 9, 0, 0, 0, 0]
            ];

            expect(rows.length).to.equal(expectedBoard.length);
            expect(rows).to.eql(expectedBoard);
        });
    });

    describe('#getRowGroup()\n', function() {
        it('should return a row group in a 2DArray for example row1,row2,row3 are row group1\n', function() {

            rowGroup = sudoku.getRowGroup(board, 1);

            expectedBoard = [
                [0, 9, 0, 0, 0, 0, 0, 0, 6],
                [0, 0, 0, 9, 6, 0, 4, 8, 5],
                [0, 0, 0, 5, 8, 1, 0, 0, 0]
            ];

            expect(rowGroup.length).to.equal(expectedBoard.length);
            expect(rowGroup).to.eql(expectedBoard);
        });
    });

    describe('#getRowGroups()\n', function() {
        it('should return a 2Darray with every rowGroup being stored in a seperate array\n', function() {

            rowGroups = sudoku.getRowGroups(board);

            expectedBoard = [
                [
                    [0, 9, 0, 0, 0, 0, 0, 0, 6],
                    [0, 0, 0, 9, 6, 0, 4, 8, 5],
                    [0, 0, 0, 5, 8, 1, 0, 0, 0]
                ],
                [
                    [0, 0, 4, 0, 0, 0, 0, 0, 0],
                    [5, 1, 7, 2, 0, 0, 9, 0, 0],
                    [6, 0, 2, 0, 0, 0, 3, 7, 0]
                ],
                [
                    [1, 0, 0, 8, 0, 4, 0, 2, 0],
                    [7, 0, 6, 0, 0, 0, 8, 1, 0],
                    [3, 0, 0, 0, 9, 0, 0, 0, 0]
                ]
            ];

            expect(rowGroup.length).to.equal(3);
            expect(rowGroups).to.eql(expectedBoard);
        });
    });

    describe('#getRowOfTheGroup()\n', function() {
        it('should return an array which contain selected row from selected group\n', function() {

            rowOfTheGroup = sudoku.getRowOfTheGroup(board, 2, 1);

            expectedBoard = [0, 0, 4, 0, 0, 0, 0, 0, 0];

            expect(rowOfTheGroup.length).to.equal(expectedBoard.length);
            expect(rowOfTheGroup).to.eql(expectedBoard);
        });
    });

    describe('#swapRowGroups()\n', function() {
        it('should permute place of two row groups (for example row1,row2,row3 permuted with row7, row8, row9) \n\tand returns a string in format of sampleBoard\n', function() {

            swapedRowGroups = sudoku.swapRowGroups(board, 1, 3);

            expectedBoard = '100804020\n' +
                '706000810\n' +
                '300090000\n' +
                '004000000\n' +
                '517200900\n' +
                '602000370\n' +
                '090000006\n' +
                '000960485\n' +
                '000581000';

            expect(swapedRowGroups.length).to.equal(expectedBoard.length);
            expect(swapedRowGroups).to.eql(expectedBoard);
        });
    });

    describe('#swapRowsOfSameGroup()\n', function() {
        it('should permute places of rows in a given group (for example group 1 permute row1 and row3)\n', function() {

            swapedRowsOfSameGroup = sudoku.swapRowsOfSameGroup(board, 2, 3, 1);

            expectedBoard = '090000006\n' +
                '000960485\n' +
                '000581000\n' +
                '602000370\n' +
                '517200900\n' +
                '004000000\n' +
                '100804020\n' +
                '706000810\n' +
                '300090000';

            expect(swapedRowsOfSameGroup.length).to.equal(expectedBoard.length);
            expect(swapedRowsOfSameGroup).to.eql(expectedBoard);
        });
    });

    describe('#getColumns()\n', function() {
        it('should return columns of the board in a 2DArray\n', function() {
            columns = sudoku.getColumns(board);
            expectedBoard = [
                [0, 0, 0, 0, 5, 6, 1, 7, 3],
                [9, 0, 0, 0, 1, 0, 0, 0, 0],
                [0, 0, 0, 4, 7, 2, 0, 6, 0],
                [0, 9, 5, 0, 2, 0, 8, 0, 0],
                [0, 6, 8, 0, 0, 0, 0, 0, 9],
                [0, 0, 1, 0, 0, 0, 4, 0, 0],
                [0, 4, 0, 0, 9, 3, 0, 8, 0],
                [0, 8, 0, 0, 0, 7, 2, 1, 0],
                [6, 5, 0, 0, 0, 0, 0, 0, 0]
            ];

            expect(columns.length).to.equal(expectedBoard.length);
            expect(columns).to.eql(expectedBoard);
        });
    });

    describe('#getColumnGroup()\n', function() {
        it('should return a column group in a 2DArray for example col1,col2,col3 are column group1\n', function() {

            columnGroup = sudoku.getColumnGroup(board, 2);

            expectedBoard = [
                [0, 9, 5, 0, 2, 0, 8, 0, 0],
                [0, 6, 8, 0, 0, 0, 0, 0, 9],
                [0, 0, 1, 0, 0, 0, 4, 0, 0]
            ];

            expect(columnGroup.length).to.equal(3);
            expect(columnGroup).to.eql(expectedBoard);
        });
    });

    describe('#getColumnGroups()\n', function() {
        it('should return a 2Darray with every columnGroup being stored in a seperate array\n', function() {
            columnGroups = sudoku.getColumnGroups(board);

            expectedBoard = [
                [
                    [0, 0, 0, 0, 5, 6, 1, 7, 3],
                    [9, 0, 0, 0, 1, 0, 0, 0, 0],
                    [0, 0, 0, 4, 7, 2, 0, 6, 0]
                ],
                [
                    [0, 9, 5, 0, 2, 0, 8, 0, 0],
                    [0, 6, 8, 0, 0, 0, 0, 0, 9],
                    [0, 0, 1, 0, 0, 0, 4, 0, 0]
                ],
                [
                    [0, 4, 0, 0, 9, 3, 0, 8, 0],
                    [0, 8, 0, 0, 0, 7, 2, 1, 0],
                    [6, 5, 0, 0, 0, 0, 0, 0, 0]
                ]
            ];

            expect(columnGroups.length).to.equal(3);
            expect(columnGroups).to.eql(expectedBoard);
        });
    });

    describe('#getColumnOfTheGroup()\n', function() {
        it('should return an array which contain selected column from selected group\n', function() {

            columnOfTheGroup = sudoku.getColumnOfTheGroup(board, 2, 1);

            expectedBoard = [0, 9, 5, 0, 2, 0, 8, 0, 0];

            expect(columnOfTheGroup.length).to.equal(columnOfTheGroup.length);
            expect(columnOfTheGroup).to.eql(expectedBoard);
        });
    });

    describe('#swapColumnGroups()\n', function() {
        it('should permute place of two column groups (for example col1,col2,col3 permuted with col7, col8, col9) \n\tand returns a string in format of sampleBoard\n', function() {

            swapedColumnGroups = sudoku.swapColumnGroups(board, 1, 3);

            expectedBoard = '006000090\n' +
                '485960000\n' +
                '000581000\n' +
                '000000004\n' +
                '900200517\n' +
                '370000602\n' +
                '020804100\n' +
                '810000706\n' +
                '000090300';

            expect(swapedColumnGroups.length).to.equal(expectedBoard.length);
            expect(swapedColumnGroups).to.eql(expectedBoard);
        });
    });


    describe('#swapColumnsOfSameGroup()\n', function() {
        it('should permute places of columns in a given group (for example group 1 permute col2 and col1)\n', function() {

            swapedColumnOfSameGroup = sudoku.swapColumnsOfSameGroup(board, 1, 2, 1);

            expectedBoard = '900000006\n' +
                '000960485\n' +
                '000581000\n' +
                '004000000\n' +
                '157200900\n' +
                '062000370\n' +
                '010804020\n' +
                '076000810\n' +
                '030090000';

            expect(swapedColumnOfSameGroup.length).to.equal(expectedBoard.length);
            expect(swapedColumnOfSameGroup).to.eql(expectedBoard);
        });
    });

    describe('#generateNewBoard()\n', function() {
        it('should generate a 3*3 sudoku puzzle and each time the board should be different\n', function() {
            var fristBoard = sudoku.generateNewBoard();
            var secondBoard = sudoku.generateNewBoard();
            expect(fristBoard.length).to.equal(secondBoard.length);
            expect(fristBoard).to.not.eql(secondBoard);
        });
    });

    describe('#saveEmptyPositions()\n', function() {
        it('should return an 2Darray with position of zeros in the array(parsed)board\n', function() {
            parsedBoard = sudoku.parseBoard(board);
            emptyPositions = sudoku.saveEmptyPositions(parsedBoard);

            var expectedPositions = [
                [0, 0],
                [0, 2],
                [0, 3],
                [0, 4],
                [0, 5],
                [0, 6],
                [0, 7],
                [1, 0],
                [1, 1],
                [1, 2],
                [1, 5],
                [2, 0],
                [2, 1],
                [2, 2],
                [2, 6],
                [2, 7],
                [2, 8],
                [3, 0],
                [3, 1],
                [3, 3],
                [3, 4],
                [3, 5],
                [3, 6],
                [3, 7],
                [3, 8],
                [4, 4],
                [4, 5],
                [4, 7],
                [4, 8],
                [5, 1],
                [5, 3],
                [5, 4],
                [5, 5],
                [5, 8],
                [6, 1],
                [6, 2],
                [6, 4],
                [6, 6],
                [6, 8],
                [7, 1],
                [7, 3],
                [7, 4],
                [7, 5],
                [7, 8],
                [8, 1],
                [8, 2],
                [8, 3],
                [8, 5],
                [8, 6],
                [8, 7],
                [8, 8]
            ];

            expect(emptyPositions.length).to.equal(51);
            expect(emptyPositions).to.eql(expectedPositions);
        });
    });

    describe('#checkRow()\n', function() {
        it('should check that each value in the row does not equal the input\n', function() {
            parsedBoard = sudoku.parseBoard(board);

            expect(sudoku.checkRow(parsedBoard, 0, 2)).to.be.ok;
            expect(sudoku.checkRow(parsedBoard, 0, 6)).to.not.be.ok;
        });
    });

    describe('#checkColumn()\n', function() {
        it('should check that each value in a column does not equal the input\n', function() {
            parsedBoard = sudoku.parseBoard(board);
            expect(sudoku.checkColumn(parsedBoard, 0, 9)).to.be.ok;
            expect(sudoku.checkColumn(parsedBoard, 0, 7)).to.not.be.ok;
        });
    });

    describe('#checkSquare()\n', function() {
        it('should check that each value in a 3x3 square does not match the input\n', function() {
            parsedBoard = sudoku.parseBoard(board);
            expect(sudoku.checkSquare(parsedBoard, 2, 2, 1)).to.be.ok;
            expect(sudoku.checkSquare(parsedBoard, 7, 7, 9)).to.be.ok;
            expect(sudoku.checkSquare(parsedBoard, 2, 2, 9)).to.not.be.ok;
            expect(sudoku.checkSquare(parsedBoard, 7, 7, 1)).to.not.be.ok;
        });
    });

    describe('#checkValue()\n', function() {
        it('should check whether a value is valid for a particular position\n', function() {
            parsedBoard = sudoku.parseBoard(board);
            expect(sudoku.checkValue(parsedBoard, 0, 0, 2)).to.be.ok;
            expect(sudoku.checkValue(parsedBoard, 3, 7, 3)).to.be.ok;
            expect(sudoku.checkValue(parsedBoard, 0, 0, 9)).to.not.be.ok;
            expect(sudoku.checkValue(parsedBoard, 3, 7, 1)).to.not.be.ok;
        });
    });

    describe('#solvePuzzle()\n', function() {
        it('should find a solution to the puzzle array and emptyPositions passed in\n', function() {
            parsedBoard = sudoku.parseBoard(board);
            expectedSolution = [
                [8, 9, 5, 7, 4, 2, 1, 3, 6],
                [2, 7, 1, 9, 6, 3, 4, 8, 5],
                [4, 6, 3, 5, 8, 1, 7, 9, 2],
                [9, 3, 4, 6, 1, 7, 2, 5, 8],
                [5, 1, 7, 2, 3, 8, 9, 6, 4],
                [6, 8, 2, 4, 5, 9, 3, 7, 1],
                [1, 5, 9, 8, 7, 4, 6, 2, 3],
                [7, 4, 6, 3, 2, 5, 8, 1, 9],
                [3, 2, 8, 1, 9, 6, 5, 4, 7]
            ];

            var solution = sudoku.solvePuzzle(parsedBoard, emptyPositions);
            expect(solution).to.eql(expectedSolution);
        });
    });

    describe('#solveSudoku()\n', function() {
        it('should find a solution to the puzzle string passed in\n', function() {
            expectedSolution = '895742136\n' +
                '271963485\n' +
                '463581792\n' +
                '934617258\n' +
                '517238964\n' +
                '682459371\n' +
                '159874623\n' +
                '746325819\n' +
                '328196547';
            var solution = sudoku.solveSudoku(board);
            expect(solution).to.eql(expectedSolution);
        });
    });

});
