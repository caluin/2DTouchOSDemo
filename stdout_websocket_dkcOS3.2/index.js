const express = require('express');
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;


app.use(express.static('html'));

const spawn = require('child_process').spawn;
const myProcess = spawn('./2DTouchGestureGestureOnlyRev2/TouchCoordinatesGesture.exe');
var readline = require('readline');

var rl = readline.createInterface({input: myProcess.stdout});



app.get('/', (req, res) => {
   res.sendFile(__dirname + '/html/index.html');
});





myProcess.stdout.setEncoding('utf-8');

rl.on('line', function (data) {

console.log(data)
	io.emit('std_data', data);
});



function replaceAll(string, search, replace) {
  return string.split(search).join(replace);
}




http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
