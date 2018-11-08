const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./user')
const app = express()
const model = require('./model')
const Chat = model.getModel('chat')

//work with express
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', function(socket) {
    console.log('user login')
    socket.on('sendmsg', function(data) {

        const { from, to, content } = data
        const chatid = [from, to].sort().join('_')
        Chat.create({chatid, from, to, content}, function(err, doc) {
            io.emit('recvmsg', Object.assign({}, doc._doc))
        })
        // console.log(data)
        // io.emit('recvmsg', data)
    })
})
app.use(cookieParser()) //解析cookie
app.use(bodyParser.json()) //解析post过来的json参数
app.use('/user', userRouter)
server.listen(9093, function() {
    console.log("服务器在9093端口开启")
})