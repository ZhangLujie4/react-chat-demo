import React from 'react'
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg, readMsg } from '../../redux/chat.redux'
import { getChatId } from '../../util'
import QueueAnim from 'rc-queue-anim'

@connect(
    state=>state,
    { getMsgList, sendMsg, recvMsg, readMsg }
)
class Chat extends React.Component{
    constructor(props) {
        super(props)
        this.state={
            text: '',
            msg: [],
            showEmoji: false
        }
    }
    sendMessage() {
        const from = this.props.user._id
        const to = this.props.match.params.user
        const content = this.state.text
        this.props.sendMsg({from, to, content})
        this.setState({text: ''})
    }
    fixCarousel() {
        setTimeout(function(){
            window.dispatchEvent(new Event('resize'))
        },0)
    }
    componentDidMount() {
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList()
            this.props.recvMsg()
        }
        this.fixCarousel()
    }
    componentWillUnmount() {
        const to = this.props.match.params.user
        this.props.readMsg(to)
    }
    render() {
        const emoji = '😄 😃 😀 😊 😉 😍 😘 😚 😳 😌 😁 😜 😝 😒 😏 😓 😔 😞 😖 😥 😰 😨 😣 😢 😭 😂 😲 😱 😠 😡 😪 😷 👿 👽 💛 💙 💜 💗 💚 ❤️ 💔 💓 💘 ✨ 🌟 💢 ❕ ❔ 💤 💨 💦 🎶 🎵 🔥 💩 👍 👎 🤝 👍 👌 ☝🏽 ✋ ✌️ 🤙🏿 💋 👥 👀 🧠 👩‍'
                        .split(' ').filter(v=>v).map(v=>({
                            text:v
                        }))

        const user = this.props.match.params.user
        const Item = List.Item
        const users = this.props.chat.users
        if (!users[user]) {
            return null
        }
        const chatid = getChatId(user, this.props.user._id)
        const chatmsg = this.props.chat.chatmsg.filter(v=>v.chatid===chatid)
        return (
            <div id={'chat-page'}>
                <NavBar 
                mode='dark'
                icon={<Icon type='left'/>}
                onLeftClick={()=>{
                    this.props.history.goBack()
                }}
                >
                    {users[user].name}
                </NavBar>
                <QueueAnim type='left' delay={100} >
                {chatmsg.map((v,index)=>{
                    const avatar = require(`../img/${users[v.from].avatar}.png`)
                    return v.from === user?(
                        <List key={index}>
                            <Item
                                thumb={avatar}
                            >{v.content}</Item>
                        </List>
                    ):(
                        <List key={index}>
                            <Item
                                className='chat-me'
                                extra={<img src={avatar} alt=""/>}
                            >{v.content}</Item>
                        </List>
                    )
                })}
                </QueueAnim>
                <div className="stick-footer">
                    <List>
                        <InputItem
                        placeholder='请输入'
                        value={this.state.text}
                        onChange={v=>{
                            this.setState({text: v})
                        }}
                        extra={
                            <div>
                                <span 
                                style={{ marginRight: 15 }}
                                onClick={()=>{this.setState({
                                    showEmoji: !this.state.showEmoji
                                })
                                this.fixCarousel()}}>😄</span>
                                <span onClick={()=>this.sendMessage()}>发送</span>
                            </div>
                        }
                        ></InputItem>
                    </List>
                    {this.state.showEmoji?<Grid 
                        data={emoji}
                        columnNum={9}
                        carouselMaxRow={4}
                        isCarousel={true}
                        onClick={el=>{
                            this.setState({
                                text: this.state.text+el.text
                            })
                        }} />:null}
                </div>
            </div>
        )
    }

}

export default Chat