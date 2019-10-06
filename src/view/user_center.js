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
export default class home_page extends Component  {

    state = {
        isLogin     : false,
    };

    componentWillMount() {

    }
    render() {

        return (
            <SmartView borderColor="#fff" barStyle="default">
                <View style={{backgroundColor:"#fff",marginBottom:10}}>
                    <View style={{flexDirection:"row"}}>
                        <TouchableOpacity style={{margin:10}}>
                            {this.state.isLogin ?
                                <Image   source={source=require('../image/noavatar.gif')}
                                         style={{width: 80, height:80,borderRadius:40}} />
                                :
                                <Image   source={source=require('../image/noavatar.gif')}
                                         style={{width: 80, height:80,borderRadius:40}} />

                            }

                        </TouchableOpacity>

                        <View style={{width:width-100, paddingRight:20,paddingTop : 10}}>
                            <Text style={{textAlign:"right", fontSize:14,fontWeight:"900",color:global.mainFontColor,marginTop:15}}>
                                {
                                    this.state.isLogin ?
                                        "用户名" :
                                        "未登录"
                                }
                            </Text>
                            <Text style={{textAlign:"right",fontSize:13,color:"#646464",marginTop:15}}>这个人很懒什么都没留下</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"space-between",paddingLeft:40,paddingRight:40}}>
                        <View style={styles.userInfoView}>
                            <Text style={styles.userInfoContentText}>{
                                this.state.isLogin ? 8 : 0
                            }</Text>
                            <Text style={styles.userInfoContentTitle}>帖子</Text>
                        </View>
                        <View style={styles.userInfoView}>
                            <Text style={styles.userInfoContentText}>{
                                this.state.isLogin ? 8 : 0
                            }</Text>
                            <Text style={styles.userInfoContentTitle}>帖子</Text>
                        </View>
                        <View style={styles.userInfoView}>
                            <Text style={styles.userInfoContentText}>{
                                this.state.isLogin ? 8 : 0
                            }</Text>
                            <Text style={styles.userInfoContentTitle}>帖子</Text>
                        </View>
                    </View>
                </View>
                {/* 按钮列表 */}

                {
                    this.state.isLogin ?
                        <View>
                            <TouchableOpacity style={styles.touchableItem}>
                                <Image   source={source=require('../image/shoucang.png')}
                                         style={styles.touchableImage} />
                                <Text style={styles.touchableText}>我的收藏</Text>
                                <Image   source={source=require('../image/left.png')} style={{width: 17, height : 17}} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.touchableItem}>
                                <Image   source={source=require('../image/lishi.png')}
                                         style={styles.touchableImage} />
                                <Text style={styles.touchableText}>浏览历史</Text>
                                <Image   source={source=require('../image/left.png')} style={{width: 17, height : 17}} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.touchableItem}>
                                <Image   source={source=require('../image/haoyou.png')}
                                         style={styles.touchableImage} />
                                <Text style={styles.touchableText}>通讯录</Text>
                                <Image   source={source=require('../image/left.png')} style={{width: 17, height : 17}} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.touchableItem}>
                                <Image   source={source=require('../image/shoucang.png')}
                                         style={styles.touchableImage} />
                                <Text style={styles.touchableText}>退出登录</Text>
                                <Image   source={source=require('../image/left.png')} style={{width: 17, height : 17}} />
                            </TouchableOpacity>
                        </View>
                        :
                        <View>
                            <TouchableOpacity style={styles.touchableItem}>
                                <Image   source={source=require('../image/shoucang.png')}
                                         style={styles.touchableImage} />
                                <Text style={styles.touchableText}>登录</Text>
                                <Image   source={source=require('../image/left.png')} style={{width: 17, height : 17}} />
                            </TouchableOpacity>
                        </View>
                }


            </SmartView>
        )
    }
}

const styles = StyleSheet.create({
    userInfoView : {},
    userInfoContentTitle : {
        textAlign:"center",
        color:"#999999",
        fontSize:13,
        padding:10,
        fontWeight:"900"
    },
    userInfoContentText : {
        textAlign:"center",
        color:"#7B6164",
        fontWeight:"600"
    },
    touchableItem : {
        flexDirection:"row",
        padding:15,
        paddingLeft:25,
        backgroundColor:"#fff",
        borderBottomWidth :1,
        borderColor:"#F6F6F6"
    },
    touchableImage : {
        width   : 17,
        height  : 17
    },
    touchableText : {
        padding:2,
        marginLeft:10,
        color:"#7B6164",
        fontWeight:"800",
        width:width-80
    }
});