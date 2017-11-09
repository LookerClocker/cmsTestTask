import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import DummyTable from './tabs/dummyTable';
import DummyChart from './tabs/dummyChart';
import DummyList from './tabs/dummyList';
import registerServiceWorker from './registerServiceWorker';

import Router from 'react-router/lib/Router';
import { browserHistory, IndexRoute} from 'react-router';
import Route from 'react-router/lib/Route';

let hasRedirected = false;

function checkDefaultTab(){
    if (!hasRedirected) {
        hasRedirected = true;
        browserHistory.push('/dummyList');
    }
}

ReactDOM.render(
    <Router history={ browserHistory }>
        <Route path='/' component={ App }>
            <IndexRoute component={ DummyList}/>
            <Route path='dummyTable' component={ DummyTable}/>
            <Route path='dummyChart' component={ DummyChart }/>
            <Route path='dummyList' component={ DummyList }/>
        </Route>

    </Router>, document.getElementById('root'));
registerServiceWorker();
