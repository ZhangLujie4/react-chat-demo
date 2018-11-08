const mongoose = require('mongoose')
const DB_URL = "mongodb://127.0.0.1:27017/zlj-chat"
mongoose.connect(DB_URL)

const models = {
    user: {
        'user': {type: String, require: true},
        'pwd': {type: String, require: true},
        'type': {type: String, require: true},
        //头像
        'avatar': {type: String},
        //个人简介
        'desc': {type: String},
        //职位
        'title': {type: String},
        //如果是boss还有两个字段
        'company': {type: String},
        'money': {type: String}
    },
    chat: {
        'chatid': {type: String, require: true},
        'from': {type: String, require: true},
        'to': {type: String, require: true},
        'content': {type: String, require: true, default: ''},
        'create_time': {type: Number, default:Date.now},
        'read': {type: Boolean, default:false}
    }
}

for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel:function(name) {
        return mongoose.model(name)
    }
}