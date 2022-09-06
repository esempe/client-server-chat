import ws from 'ws'

const wss = new ws.Server({
        port: 5000
    }, () => {
        console.log('port 5000')
    }
)


wss.on('connection', function connection(ws) {
    ws.on('message', (message) => {
        message = JSON.parse(message)
        switch (message.event) {
            case 'message': {
                broadcastMessage(message)
                break;
            }
            case 'connection': {
                broadcastMessage(message)
                break;
            }
        }
    })
})

function broadcastMessage(message) {
    wss.clients.forEach(client =>{
        client.send(JSON.stringify(message))
    })
}


/*
const message = {
    event: 'message/connection',
    id: 123,
    data: '',
    username: 'some name',
    message
}

*/

