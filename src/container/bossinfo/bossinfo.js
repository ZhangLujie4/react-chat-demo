import React from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import { connect } from 'react-redux';
import { update } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

@connect(
    state=>state.user,
    { update }
)
class BossInfo extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            avatar: '',
            company: '',
            money: '',
            desc: ''
        }
    }
    onChange(key, value) {
        this.setState({
            [key]: value
        })
    }
    render() {
        const path = this.props.location.pathname
        const redirect = this.props.redirectTo
        return (
            <div>
                {redirect&&redirect!==path?<Redirect to={redirect}/>:null}
                <NavBar mode="dark">Boss完善信息页面</NavBar>
                <AvatarSelector selectAvatar={(imgname)=>{
                    this.setState({
                        avatar: imgname
                    })
                }}></AvatarSelector>
                <InputItem onChange={(v)=>this.onChange('title', v)}>
                    招聘职位
                </InputItem>
                <InputItem onChange={(v)=>this.onChange('company', v)}>
                    公司名称
                </InputItem>
                <InputItem onChange={(v)=>this.onChange('money', v)}>
                    职业薪资
                </InputItem>
                <TextareaItem title='职业要求' onChange={(v)=>this.onChange('desc', v)} autoHeight rows={3}>
                </TextareaItem>
                <Button type="primary"
                    onClick={()=>{
                        this.props.update(this.state)
                    }}>保存</Button>
            </div>
        )
    }
}

export default BossInfo