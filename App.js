import React from 'react';
import Loading from './app/loading'
import {
  Platform,
} from 'react-native';

import {Router,Scene} from 'react-native-router-flux'
import Chat from './app/Chat';


export default class App extends React.Component {
  render() {
    return (
     <Router>
       <Scene key='root'>
         <Scene key='Loading' hideNavBar={true} component={Loading} />
         <Scene key='chat' hideNavBar={true} component={Chat} />
       </Scene>
     </Router>
    )
  }
}


