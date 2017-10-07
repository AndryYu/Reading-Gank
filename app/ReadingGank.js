import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { Provider } from 'react-redux';
import Index from './views/index';
import rootSaga from './sagas/index'



const App = () =>(
   <Provider>
       <Index/>
   </Provider>
);



