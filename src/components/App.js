import React, {Component} from 'react'

import Nav from './Nav';

import {Provider} from 'react-redux';
import ConfigureStore from '../store/ConfigureStore';

const store = ConfigureStore();

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div>
                    <Nav />
                    <div className="container">
                        {this.props.children}
                    </div>
                </div>
            </Provider>
        )
    }
}

export default App;