var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var sudoku = require('./sudoku');
var solutionTable;
var puzzleTable;

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/public/index.html');
});




io.on('connection', function(client) {
    var generated;
    client.on('puzzClicked', function(data) {
     generated = sudoku.generateNewBoard();
     puzzleTable = sudoku.createTable(sudoku.parseBoard(generated));
		  io.emit('puzzleUpdate', puzzleTable);
    });

    client.on('solClicked', function(data) {
      solutionTable = sudoku.createTable(sudoku.parseBoard(sudoku.solveSudoku(generated)));
      io.emit('solUpdate', solutionTable);

    });

});

//start our web server and socket.io server listening
server.listen(3000, function(){
  console.log('listening on *:3000');
});
