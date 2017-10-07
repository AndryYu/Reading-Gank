import { combineReducers } from 'redux';
import read from './read';
import category from './category';
import gankdata from './gankdata';
import gankday from './gankday';

const rootReducer = combineReducers({
    read,
    category,
    gankdata,
    gankday
});

export default rootReducer;