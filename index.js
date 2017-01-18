import React from 'react'
import { render } from 'react-dom'

import { Router, IndexRoute, Link, Route } from 'react-router'
import { hashHistory, browserHistory } from 'react-router'

import {createStore} from 'redux'
import { Provider } from 'react-redux'

import routes from './src/Routes'

import rootReducer from './src/reducers/reducers.js'

let store = createStore(rootReducer)

render((
    <Provider store={store}>
        <Router children={routes} history={browserHistory}/>
    </Provider>
    ),document.getElementById('rootapp')
)