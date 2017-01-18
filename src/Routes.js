import React from 'react'
import { Router, IndexRoute, Link, Route } from 'react-router'

import App from './components/App'
import About from './components/About'
import Welcome from './components/Welcome'
import Login from './components/Login'
import Signup from './components/Signup'

const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Welcome}/>
        <Route path="/about" component={About}/>
        <Route path="/welcome" component={Welcome}/>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup}/>
    </Route>
)

export default routes