import React, {Component} from 'react';
import './App.css';
import {Link} from 'react-router'

class AppUsingFetch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            childrenWithProps: '',
            sortedTabs: []
        };

        this.sendData = this.sendData.bind(this);
    }

    componentDidMount(){

        fetch('./tabs', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if(response.status === 200) {
                    return response.json();
                }
            })
            .then(response => {
                response.sort((prev, next) => {
                    if (prev.order > next.order) {return 1;}
                    if (prev.order < next.order) {return -1;}
                });

                this.setState({
                    sortedTabs: response
                });

             this.sendData(response[0]);

            })
            .catch(error => {
                throw (error)
            });

    }

    /**
     * passing necessary props to specific child element
     **/
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
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">CMS</h1>
                </header>
                <div className="App-intro">

                    <table>
                        <thead>
                        <tr>
                            {this.state.sortedTabs.map((tab) =>
                            <Link to={tab.id} onClick={() => this.sendData(tab)}>
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

export default AppUsingFetch;
