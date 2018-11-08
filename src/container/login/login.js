import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import { connect } from 'react-redux'
import { login } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom' 
import zljForm from '../../component/zlj-form/zlj-form'

// @WrapperHello
// class Hello extends React.Component{
//     render() {
//         return <h2>hello imooc I love React&Redux</h2>
//     }
// }

// function WrapperHello(Comp) {
//     class WrapComp extends Comp{
//         componentDidMount() {
//             console.log('高阶组件加载完成')
//         }
//         render() {
//             return <Comp></Comp>
//         }
//     }
//     // class WrapComp extends React.Component{
//     //     render() {
//     //         return (<div>
//     //             <p>这是HOC高阶组件特有的元素</p>
//     //             <Comp {...this.props}></Comp>
//     //         </div>)
//     //     }
//     // }
//     return WrapComp
// }

@connect(
    state=>state.user,
    { login }
)
@zljForm
class Login extends React.Component{
    constructor(props) {
        super(props)
        this.register = this.register.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }
    register() {
        console.log(this.props)
        this.props.history.push('/register')
    }
    handleLogin() {
        this.props.login(this.props.state)
    }
    render() {
        return (
            <div>
                {this.props.redirectTo&&this.props.redirectTo!=='/login'?<Redirect to={this.props.redirectTo}/>:null}
                <Logo></Logo>
                {/* <h2>登录页面</h2> */}
                <WingBlank>
                    <List>
                        {this.props.msg?<h2 className='error-msg'>{this.props.msg}</h2>:null}
                        <InputItem onChange={v=>this.props.handleChange('user', v)}>用户名</InputItem>
                        <WhiteSpace />
                        <InputItem type='password' onChange={v=>this.props.handleChange('pwd', v)}>密码</InputItem>
                    </List>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.handleLogin}>登录</Button>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        )
    }
} 
export default Login

