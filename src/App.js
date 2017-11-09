import React, {Component} from 'react';
import './App.css';
import {Link} from 'react-router'
import tabs from './tabs.json';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: tabs,
            childrenWithProps: ''
        };

        this.sendData = this.sendData.bind(this);
    }

    componentDidMount(){

        for(let i=0; i< this.state.tabs.length; i++){
            if (this.props.location.pathname === '/'+this.state.tabs[i].id) {
                this.sendData(this.state.tabs[i]);
               return;
            }
        }

        this.sendData(this.state.tabs[0]);
    }


    /**
     * passing necessary props to specific child element
     * **/
    sendData(tab) {
        this.setState({
            childrenWithProps: React.Children.map(this.props.children,
                (child) => React.cloneElement(child, {
                    tabInfo: tab
                })
            )
        });
    }

    render() {
        console.log(this.props);
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">CMS</h1>
                </header>
                <div className="App-intro">

                    <table>
                        <thead>
                        <tr>
                            {tabs.sort((prev, next) => {
                                if (prev.order > next.order) {return 1;}
                                if (prev.order < next.order) {return -1;}
                            }).map((tab) => <Link to={tab.id} onClick={() => this.sendData(tab)}>
                                <td key={tab.id}>{tab.title}</td>
                            </Link>)}
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.childrenWithProps}
                        </tbody>
                    </table>

                </div>
            </div>
        );
    }
}

export default App;
