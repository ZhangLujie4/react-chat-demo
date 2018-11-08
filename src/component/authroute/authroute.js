import React from 'react'
import Axios from 'axios'
import { withRouter } from 'react-router-dom'
import { loadData } from '../../redux/user.redux'
import { connect } from 'react-redux';

@withRouter
@connect(
    null,
    { loadData } 
)
class AuthRoute extends React.Component{
    componentDidMount() {
        const notPushList = ['/login', '/register']
        const pathname = this.props.location.pathname
        if (notPushList.indexOf(pathname) > -1) {
            return null
        }
        //获取用户信息
        //是否登录
        //现在的url地址 login是不需要跳转的
        Axios.get('/user/info').then(res=>{
            if (res.status === 200) {
                if (res.data.code === 0) {
                    //有登录信息
                    this.props.loadData(res.data.data)
                } else {
                    //这里要用到withrouter
                    this.props.history.push('/login')
                }
            }
        })
        //用户的type判断
        //用户是否完善信息
    } 
    render() {
        return null
    }
}
export default AuthRoute