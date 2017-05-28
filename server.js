(function(){
    const WebSocketServer = require('websocket').server;
    const server = require('http').createServer();
    server.listen(3333);

    const wsServer = new WebSocketServer({
        httpServer: server
    });

    wsServer.on('request', request => {
        let connection = request.accept(null, request.origin);
        console.log('Websocket connection established');

        setInterval(() => {
            let randomNumber = getRandomNumber();
            connection.send(randomNumber);
            console.log('[WS] ' + randomNumber);
        }, 1000);
    });
})();

/*************************************************/

(function(){
    const server = require('http').createServer();
    server.listen(4444);

    const io = require('socket.io')(server);

    setInterval(() => {
        let randomNumber = getRandomNumber();
        io.emit('message', randomNumber);
        console.log('[IO] ' + randomNumber);
    }, 1000)

    io.on('connection', socket => {
        console.log('socket.io connection established');
    });
})();


function getRandomNumber() {
    return Math.floor((Math.random() * 100000000) + 1);
}