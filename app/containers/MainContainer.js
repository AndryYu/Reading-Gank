import React from 'react';
import { connect } from 'react-redux';
import {
    Image
} from 'react-native';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Main from '../views/MainPage/MainPage';
import * as readCreators from '../actions/read';

class MainContainer extends React.Component{
    static navigationOptions = {
        title:'首页',
        tabBarIcon: ({ tintColor }) =>
            //<Icon name="md-home" size={25} color={tintColor} />
            <Image source={require('../img/tabIcon/ic_home_tab_gank.png')} style={[{tintColor: tintColor}]}/>,
    };

    render(){
        return <Main {...this.props}/>;
    }
}

const mapStateToProps = (state) => {
  const { read } = state;
  return {
      read
  };
};

const mapDispatchToProps = (dispatch) => {
  const readActions = bindActionCreators(readCreators, dispatch);
  return {
    readActions
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);