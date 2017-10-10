import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/Ionicons';
import * as categoryCreators from '../actions/category';
import Category from '../views/Category';

class CategoryContainer extends React.Component{
    static navigationOptions = ({ navigation }) => ({
        title:'分类',
        tabBarIcon:({ tintColor }) =>
            <Icon name="md-pricetags" size={25} color={tintColor}/>,
        headerRight:
            navigation.state.params !== undefined && navigation.state.params.isFirst
                ? null
                : <Icon.Button
                    name="md-checkmark"
                    backgroundColor="transparent"
                    underlayColor="transparent"
                    activeOpacity={0.8}
                    onPress={() => {
                        navigation.state.params.handleCheck();
                    }}
                />
    });


    render(){
        return<Category{...this.props}/>
    }
}

const mapStateToProps = (state) => {
  const { category } = state;
  return {
    category
  };
};

const mapDispatchToProps = (dispatch) => {
  const categoryActions = bindActionCreators(categoryCreators, dispatch);
  return {
    categoryActions
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryContainer);