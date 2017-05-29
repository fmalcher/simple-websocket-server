(function(){
    const WebSocketServer = require('websocket').server;
    const server = require('http').createServer();
    
    let port = 3333;
    server.listen(port, () => {
        console.log('WebSocket server running on port', port);
    });

    const wsServer = new WebSocketServer({
        httpServer: server
    });

    wsServer.on('request', request => {
        let connection = request.accept(null, request.origin);
        console.log('WebSocket connection established');

        let interval = setInterval(() => {
            let randomNumber = getRandomNumber();
            connection.send(randomNumber);
            console.log('[WS] ' + randomNumber);
        }, 1000);

        connection.on('close', () => {
            clearInterval(interval);
            console.log('WebSocket connection closed');
        });
    });
})();

/*************************************************/

(function(){
    const server = require('http').createServer();
    
    let port = 4444;
    server.listen(port, () => {
        console.log('socket.io server running on port', port, '\n\n');
    });

    const io = require('socket.io')(server);

    io.on('connection', socket => {
        console.log('socket.io connection established');

        let interval = setInterval(() => {
            let randomNumber = getRandomNumber();
            socket.emit('message', randomNumber);
            console.log('[IO] ' + randomNumber);
        }, 1000);

        socket.on('disconnect', () => {
            clearInterval(interval);
            console.log('socket.io connection closed');
        });
    });


})();


function getRandomNumber() {
    return Math.floor((Math.random() * 100000000) + 1);
}