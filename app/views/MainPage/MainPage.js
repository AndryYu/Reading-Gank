import React, { PropTypes } from 'react';
import {
    DeviceEventEmitter,
    InteractionManager,
    ListView,
    StyleSheet,
    View
} from 'react-native';
import ScrollableTabView , { DefaultTabBar } from 'react-native-scrollable-tab-view';
import store from 'react-native-simple-store';

import LoadingView from '../../components/LoadingView';
import ToastUtil from '../../utils/ToastUtil';
import {getArticleList, getTypeName} from "../../utils/ItemsUtil";
import ItemCell from './ItemCell';
import Footer from './Footer';
import EmptyView from './EmptyView';
import ItemListView from './ItemListView';

require('moment/locale/zh-cn');

const propTypes = {
    readActions: PropTypes.object,
    read: PropTypes.object.isRequired
};

const pages = [];
let loadMoreTime = 0;
let currentLoadMoreTypeId;

class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged:(row1, row2) => row1 !== row2
            }),
            typeIds:[],
            typeList:{}
        };
    }

    componentDidMount(){
        const { readActions } = this.props;
        DeviceEventEmitter.addListener('changeCategory', (typeIds) => {
            typeIds.forEach((typeId) => {
                readActions.requestArticleList(false, true, typeId);
                pages.push(1);
            });
            this.setState({
                typeIds
            });
        });
        InteractionManager.runAfterInteractions(() => {
            store.get('typeIds')
                .then((typeIds) => {
                    if(!typeIds){
                        return;
                    }
                    typeIds.forEach((typeId) => {
                        readActions.requestArticleList(false, true, typeId);
                        pages.push(1);
                    });
                    store.get('typeList')
                        .then(typeList =>
                        this.setState({
                            typeIds,
                            typeList
                        }));
                });

        })
    }

    componentWillReceiveProps(nextProps){
        const { read } = this.props;
        if(
            read.isLoadMore && !nextProps.read.isLoadMore && !nextProps.read.isRefreshing
        ){
            if(nextProps.read.noMore){
                ToastUtil.showShort('没有更多数据了');
                const index = this.state.typeIds.indexOf(currentLoadMoreTypeId);
                if(index >= 0){
                    pages[index] -= 1;
                }
            }
        }
    }

    //渲染主页内容
    renderContent = (dataSource, typeId) => {
        const { read } = this.props;
        if(read.loading){
            return <LoadingView/>
        }
        const isEmpty =
            read.articleList[typeId] === undefined || read.articleList[typeId].length === 0;
        if(isEmpty){
            return (
              <EmptyView read={read} typeId={typeId} onRefresh={this.onRefresh}/>
            );
        }
        return (
            <ItemListView
                dataSource={dataSource}
                typeId={typeId}
                isRefreshing={read.isRefreshing}
                onEndReached = {this.onEndReached}
                onRefresh={this.onRefresh}
                renderFooter={this.renderFooter}
                renderItem = {this.renderItem}
            />
        )
    };

    //刷新操作
    onRefresh = (typeId) => {
      const { readActions } = this.props;
      readActions.requestArticleList(true, false, typeId);
      const index = this.state.typeIds.indexOf(typeId);
      if(index>=0){
          pages[index] = 1;
      }
    };

    //到达底部
    onEndReached = (typeId) => {
      currentLoadMoreTypeId = typeId;
      const time = Date.parse(new Date()) / 1000;
      const index = this.state.typeIds.indexOf(typeId);
      if(index < 0){
          return;
      }
      if(time - loadMoreTime > 1){
          pages[index] += 1;
          const { readActions } = this.props;
          readActions.requestArticleList(false, false, typeId, true, pages[index]);
          loadMoreTime = Date.parse(new Date()) /1000;
      }
    };

    //渲染底部
    renderFooter = () => {
      const { read } = this.props;
      return read.isLoadMore ? <Footer/> : <View/>
    };

    //渲染每个Item
    renderItem = article =>
        <ItemCell article={article} onPressHandler={this.onPress}/>;

     // 点击处理
    onPress = (article) => {
        const { navigate } = this.props.navigation;
        navigate('Web', { article });
    };

    render(){
        const { read } = this.props;
        const content = this.state.typeIds.map((typeId) => {
            if(this.state.typeList === null){
                return null;
            }
            const name = getTypeName(this.state.typeList, typeId);
            const typeView = (
                <View key={typeId} tabLabel={name} style={styles.base}>
                    {this.renderContent(
                        this.state.dataSource.cloneWithRows(
                            getArticleList(read.articleList[typeId])
                        ),
                        typeId
                    )}
                </View>
            );
            return typeView;
        });
        return (
          <View style={styles.container}>
              <ScrollableTabView
                renderTabBar={() =>
                <DefaultTabBar tabStyle={styles.tab} textStyle={styles.tabText} />}
                tabBarBackgroundColor="#fcfcfc"
                tabBarUnderlineStyle={styles.tabBarUnderline}
                tabBarActiveTextColor="#3e9ce9"
                tabBarInactiveTextColor="#aaaaaa"
              >
                  {content}
              </ScrollableTabView>
          </View>
        );
    }

    componentWillUnmount(){
        DeviceEventEmitter.removeAllListeners('changeCategory');
    }
}

const styles = StyleSheet.create({
    base: {
        flex: 1
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff'
    },
    drawerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    drawerTitleContent: {
        height: 120,
        justifyContent: 'flex-end',
        padding: 20,
        backgroundColor: '#3e9ce9'
    },
    drawerIcon: {
        width: 30,
        height: 30,
        marginLeft: 5
    },
    drawerTitle: {
        fontSize: 20,
        textAlign: 'left',
        color: '#fcfcfc'
    },
    drawerText: {
        fontSize: 18,
        marginLeft: 15,
        textAlign: 'center',
        color: 'black'
    },
    timeAgo: {
        fontSize: 14,
        color: '#aaaaaa',
        marginTop: 5
    },
    refreshControlBase: {
        backgroundColor: 'transparent'
    },
    tab: {
        paddingBottom: 0
    },
    tabText: {
        fontSize: 16
    },
    tabBarUnderline: {
        backgroundColor: '#3e9ce9',
        height: 2
    }
});

Main.propTypes = propTypes;

export default Main;
