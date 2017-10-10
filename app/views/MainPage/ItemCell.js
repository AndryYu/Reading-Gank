import React from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    StyleSheet
} from 'react-native';
import TimeAgo from 'react-native-timeago';
import { formateStringWithHtml } from "../../utils/FormatUtil";

const ItemCell = ({ article, onPressHandler}) =>(
    <TouchableOpacity onPress={() => onPressHandler(article)}>
        <View style={styles.containerItem}>
            <Image style={styles.itemImg} source={{uri:article.contentImg}}/>
            <View style={styles.itemRightContent}>
                <Text style={styles.title}>
                    {formateStringWithHtml(article.title)}
                </Text>
                <View style={styles.itemRightBottom}>
                    <Text style={styles.userName}>
                        {article.userName}
                    </Text>
                    <TimeAgo style={styles.timeAgo} time={article.date}/>
                </View>
            </View>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    containerItem:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fcfcfc',
        padding:10,
        borderBottomColor:'#ddd',
        borderBottomWidth:1
    },
    title:{
        fontSize:18,
        textAlign:'left',
        color:'black'
    },
    itemImg:{
        width:88,
        height:66,
        marginRight:10
    },
    itemRightContent:{
        flex:1,
        flexDirection:'column'
    },
    itemRightBottom:{
        flex:1,
        flexDirection:'row',
        alignItems:'center'
    },
    userName:{
        flex:1,
        fontSize:14,
        color:'#87cefa',
        marginTop:5,
        marginRight:5
    }
});

export default ItemCell;