import { StackNavigator, TabNavigator } from 'react-navigation';
import Splash from '../views/Splash';
import CategoryContainer from '../containers/CategoryContainer';
import MainContainer from '../containers/MainContainer';
import WebViewPage from '../views/WebViewPage';
import GankData from '../views/GankData/GankData';
import GankDay from '../views/GankDay/GankDay';

const TabContainer = TabNavigator({
    Main:{screen:MainContainer},
    Category:{screen:CategoryContainer},
    GankData:{screen:GankData},
    GankDay:{screen:GankDay}
},{
    lazy:true,
    tabBarPosition:'bottom',
    tabBarOptions:{
        activeTintColor:'#3e9ce9',
        inactiveTintColor:'#999999',
        showIcon:true,
        style:{
            backgroundColor:'#fff'
        },
        indicatorStyle:{
            opacity:0
        },
        tabStyle:{
            padding:0
        }
    }
});

const App = StackNavigator({
    Splash:{ screen: Splash},
    Category:{
        screen:CategoryContainer,
        navigationOptions:{
            headerLeft:null
        }
    },
    Home:{
        screen:TabContainer,
        navigationOptions:{
            headerLeft:null
        }
    },
    Web:{
        screen:WebViewPage
    }
},{
    headerMode:'screen',
    navigationOptions:{
        headerStyle:{
            backgroundColor:'#3e9ce9'
        },
        headerTitleStyle:{
            color:'#fff',
            fontSize:20
        },
        headerTintColor:'#fff'
    }
});
export  default  App;

