import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from 'antd-mobile'
import { connect } from 'react-redux'
import { register } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
import zljForm from '../../component/zlj-form/zlj-form'

@connect(
    state=>state.user,
    { register }
)
@zljForm
class Register extends React.Component{

    constructor(props) {
        super(props)
        this.handleRegister = this.handleRegister.bind(this)
    }
    componentDidMount() {
        this.props.handleChange('type', 'genius')
    }
    handleRegister() {
        this.props.register(this.props.state)
        //console.log(this.state)
    }
    render() {
        const RadioItem = Radio.RadioItem
        return (
            <div>
                {this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        {this.props.msg?<h2 className='error-msg'>{this.props.msg}</h2>:null}
                        <InputItem onChange={v=>this.props.handleChange('user', v)}>用户名</InputItem>
                        <WhiteSpace />
                        <InputItem type="password" onChange={v=>this.props.handleChange('pwd', v)}>密码</InputItem>
                        <WhiteSpace />
                        <InputItem type="password" onChange={v=>this.props.handleChange('repeatPwd', v)}>确认密码</InputItem>
                        <WhiteSpace />
                        <RadioItem 
                            checked={this.props.state.type === 'genius'}
                            onChange={v=>this.props.handleChange('type', 'genius')}>
                            牛人
                        </RadioItem>
                        <RadioItem 
                            checked={this.props.state.type === 'boss'}
                            onChange={v=>this.props.handleChange('type', 'boss')}>
                            BOSS
                        </RadioItem>
                    </List>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.handleRegister}>注册</Button>
                </WingBlank>
            </div>
        )
    }
} 
export default Register
