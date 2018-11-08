const express = require('express')
//const utils = require('utility') //加密
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const crypto = require('crypto')

const _filter = {'pwd': 0, '__v': 0};

Router.get('/info', function(req, res) {
    const { userid } = req.cookies
    if (!userid) {
        return res.json({code:1})
    }
    //如果没有cookie
    User.findOne({_id: userid}, _filter, function(err, doc) {
        if (err) {
            return res.json({code:1, msg:'后端出错了'})
        }
        if (doc) {
            return res.json({code: 0, data: doc})
        }

    })
})

Router.get('/getmsglist', function(req, res) {
    const userid = req.cookies.userid;
    let users = {}
    User.find({}, function(e, userdoc) {
        userdoc.forEach(v=>{
            users[v._id] = {name: v.user, avatar: v.avatar}
        })
    })
    //{'$or':[{from: userid, to: userid}]},
    // Chat.remove({}, function(e, d) {})
    Chat.find({'$or': [{from: userid},{to: userid}]}, function(err, doc){
        if (!err) {
            return res.json({code:0, msgs: doc, users: users})
        }
    })

})

Router.post('/readmsg',function(req, res) {
    const userid = req.cookies.userid
    const {from} = req.body
    Chat.update(
        {from, to:userid}, 
        {'$set':{read:true}}, 
        {'multi':true},
        function(err, doc) {
        if (!err) {
            return res.json({code:0,num:doc.nModified})
        }
        return res.json({code:1,msg:'修改失败'})
    })
})

Router.get('/list', function(req, res) {
    const {type} = req.query
    // User.remove({}, function(e, d){})
    User.find({type}, function(err, doc) {
        if (!err) {
            res.json({code:0, data:doc})
        } else {
            console.log(err)
        }
    })
})

Router.get('/listAll', function(req,res) {
    User.find({}, function(err, doc) {
        if (!err) {
            res.json(doc)
        }
    })
})

Router.post('/login', function(req, res) {
    const { user, pwd } = req.body
    let encodePwd = md5Pwd(pwd)
    User.findOne({user: user, pwd: encodePwd}, _filter, function(err, doc) {
        if (!doc) {
            return res.json({code: 1, msg: '用户名或密码错误'})
        }
        res.cookie('userid', doc._id)
        return res.json({code: 0, data: doc})
    })
})

Router.post('/update', function(req, res) {
    const userid = req.cookies.userid
    if (!userid) {
        return res.json({code:1})
    }
    const body = req.body
    User.findByIdAndUpdate(userid, body, function(err, doc) {
        const data = Object.assign({},{
            user: doc.user,
            type: doc.type
        },body)
        return res.json({code:0,data})
    })
})

Router.post('/register', function(req, res) {
    console.log(req.body)
    const { user, pwd, type } = req.body
    User.findOne({user: user}, function(err, doc) {
        if (doc) {
            return res.json({code: 1, msg: '用户名重复'})
        }

        let encodePwd = md5Pwd(pwd)
        const userModel = new User({user, type, pwd: encodePwd})
        userModel.save(function(e,d) {
            if (e) {
                return res.json({code: 1, msg: '后端出错了'})
            }
            const {user, type, _id} = d
            res.cookie('userid', _id)
            return res.json({code: 0, data: {user, type, _id}})
        })
    })
})


function md5Pwd(pwd) {
    const md5 = crypto.createHash('md5')
    const salt = 'zlj_secret_$%WQE&#$%#WE12~~'
    //调用digest方法后createHash被清空必须重新创造
    return md5.update(pwd + salt).digest('hex')
}

module.exports = Router