import React from 'react'
import ReactDom from 'react-dom'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducer'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './config'
import Login from './container/login/login'
import Register from './container/register/register'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import AuthRoute from './component/authroute/authroute'
import Dashboard from './component/dashboard/dashboard'
import './index.css'
import Chat from './component/chat/chat'

const store = createStore( reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
))

// boss genius me msg 4个页面
ReactDom.render(
    (
        <Provider store = {store}>
            <BrowserRouter>
                <div>
                    <AuthRoute></AuthRoute>
                    <Switch>
                        <Route path='/geniusinfo' component={GeniusInfo}/>
                        <Route path='/bossinfo' component={BossInfo}/>
                        <Route path='/login' component={Login} />
                        <Route path='/register' component={Register} />
                        <Route path='/chat/:user' component={Chat} />
                        <Route component={Dashboard}/>
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>
    ),
    document.getElementById('root')
)