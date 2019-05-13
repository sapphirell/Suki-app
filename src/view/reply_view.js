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
    navigate,
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
                <View style={{}}>
                    <View style={{backgroundColor:"#fff",marginTop:10,marginBottom:10,
                        paddingLeft: 20,paddingRight: 20,paddingTop:10,paddingBottom:10}}>
                        <View style={{flexDirection:"row",}}>
                            <Image   source={source=require('../image/noavatar.gif')}
                                     style={{width:45,height:45,borderRadius:22.5,   }} />
                            <View style={{flexDirection:"row",justifyContent:"space-between", flex:1, padding:10,paddingTop:15}}>
                                <Text style={{color:global.mainFontColor, fontSize:15}}>用户名</Text>
                                <Text style={{color:"#999999",fontSize:12,}}>一分钟前</Text>
                            </View>
                        </View>

                        <View style={{width:width-100,paddingTop:10}}>
                            <Text  numberOfLines={3} style={{width:width-40,fontSize:15, color:global.mainFontColor,lineHeight:19}}>
                                好久不见好久不见好久不见好久不见 好久不见好久不见好久不见好久不见好久不 好久不见好久不见好久不见好久不见好久不好久不见好久不见好久不见好久不见好久不见好久不见好久不见好久不见好久不见好久不见好久不见好久不见好久不见好久不见好久不见好久不见
                            </Text>
                        </View>
                        <View style={{width:width-45,padding:10, marginTop: 10,backgroundColor:"#F5F5F5",
                            borderRadius:5
                        }}>
                            <Text  numberOfLines={3} style={{fontSize:15, color:"#999999",lineHeight:19}}>
                                评论我的主题：蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤蛤
                            </Text>
                        </View>

                    </View>
                </View>
            </SmartView>
        )
    }
}

const styles = StyleSheet.create({

});