import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configure-store';
import Index from './containers/app';
import rootSaga from './sagas/index'

const store = configureStore();

// run root saga
store.runSaga(rootSaga);


const App = () =>(
   <Provider>
       <Index/>
   </Provider>
);

export default App;


