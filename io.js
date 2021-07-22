
import { socketIO } from './bin/www'

socketIO

// defining an empty object to hold a list of 'chatters'
let chatters = {}


socketIO.on('connection', (socket) => {
  // This is where all of our server-side socket.io functionality will exist.  

    // When anyone 'enters the room (loads the page)', add them to the list and play a sound
    socketIO.on('register-user', () => {
      chatters[socket.id] = username;
      io.emit('update-chatter-list', Object.keys(chatters).map(id => chatters[id]));
      io.emit('user-enter')
    });
    // When anyone 'leaves the room (navigates away from the page)', remove them from the list and play a sound
    socket.on('disconnect', () => {
      delete chatters[socket.id];
      io.emit('user-exit')
      io.emit('update-chatter-list', Object.keys(chatters).map(id => chatters[id]));
    });
    // When anyone sends a message, send the message to all of the connected clients and play a sound

    // When anyone presses a key while typing a message, display a '(user) is typing...' message to all clients
    socket.broadcast.emit('typing', {username: data.username})
})

export {
  socketIO
}