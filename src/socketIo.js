import socketIo from 'socket.io'

const io = socketIo()

io.on('connection', (socket) => {
  console.log('new socket connected')
  socket.emit('news', { hello: 'world' })
  socket.on('my other event', console.log)
})

export default io
