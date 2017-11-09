import React, {Component} from 'react';
import './App.css';
import {Link} from 'react-router'
import tabs from './tabs.json';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: [],
            childrenWithProps: '',

            /**
             * In this case we don`t need it `cause "fetch" method doesn`t work.
             * Otherwise in "render" method we will obtain into and output data from sortedTabs array
             * **/
            // sortedTabs: []
        };

        this.sendData = this.sendData.bind(this);
    }

    componentDidMount(){

        /**
         * "fetch" method doesn`t work properly for me when fetching data from local .json file.
         * Here just example how i will handling data in case when "fetch" works
         * **/
        // fetch('./tabs', {
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // })
        //     .then(response => {
        //         if(response.status === 200) {
        //             return response.json();
        //         }
        //     })
        //     .then(response => {
        //         response.sort((prev, next) => {
        //             if (prev.order > next.order) {return 1;}
        //             if (prev.order < next.order) {return -1;}
        //         });
        //
        //         this.setState({
        //             sortedTabs: response
        //         });
        //
        //      this.sendData(response[0]);
        //
        //     })
        //     .catch(error => {
        //         throw (error)
        //     });


        this.sendData(tabs[0])

    }

    /**
     * pass necessary props to specific child element
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
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">CMS</h1>
                </header>
                <div className="App-intro">

                    <table>
                        <thead>
                        <tr>
                            /**
                            * Uncomment it in case when data will be fetch using "fetch" method.
                            * **/
                            {/*{this.state.sortedTabs.map((tab) => */}
                                {/*<Link to={tab.id} onClick={() => this.sendData(tab)}>*/}
                                    {/*<td key={tab.id}>{tab.title}</td>*/}
                                {/*</Link>)}*/}

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
