import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import DummyTable from './tabs/dummyTable';
import DummyChart from './tabs/dummyChart';
import DummyList from './tabs/dummyList';
import testTab from './tabs/testTab'
import registerServiceWorker from './registerServiceWorker';

import Router from 'react-router/lib/Router';
import { browserHistory, IndexRoute} from 'react-router';
import Route from 'react-router/lib/Route';

let hasRedirected = false;

function checkDefaultTab(){
    if (!hasRedirected && this.props) {
        debugger;
        if (this.props.location.pathname === '/') {
            hasRedirected = true;
            browserHistory.push('/dummyList');
        }
    }
}





ReactDOM.render(
    <Router history={ browserHistory }>
        <Route path='/' component={ App } onEnter={checkDefaultTab}>
            <IndexRoute component={ DummyList}/>
            <Route path='dummyTable' component={ testTab}/>
            <Route path='dummyChart' component={ testTab }/>
            <Route path='dummyList' component={ testTab }/>
        </Route>

    </Router>, document.getElementById('root'));
registerServiceWorker();
