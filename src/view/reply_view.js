import React, { Component } from 'react';
import {
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    StyleSheet,
    FlatList,
    AsyncStorage,

} from 'react-native';
import SmartView from "../model/SmartView";
let {height, width} = Dimensions.get('window');
let main_width = width-20;
let main_height = height - 170;
export default class reply_view extends Component  {

    state = {
        isLogin     : false,
        tabShow     : "消息"
    };

    componentWillMount() {

    }
    render() {

        return (
            <SmartView  barStyle="default" borderColor="#ffffff">
                <View style={{backgroundColor:"#ffffff",flexDirection:"row", padding:10}}>
                    <TouchableOpacity>
                        <Image   source={source=require('../image/left_black3x.png')}
                                 style={{width:11,height:19,marginLeft:10}} />
                    </TouchableOpacity>

                    <Text style={{color:global.mainFontColor,textAlign:"center",fontSize:16,fontWeight:"800",flex:1}}>评论</Text>
                </View>
                {/*评论列表*/}
                <View>

                </View>
            </SmartView>
        )
    }
}

const styles = StyleSheet.create({

});