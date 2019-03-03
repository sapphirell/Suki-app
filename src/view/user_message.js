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
export default class user_message extends Component  {

    state = {
        isLogin     : false,
        tabShow     : "消息"
    };

    componentWillMount() {

    }
    render() {

        return (
            <SmartView  barStyle="default">
                <View style={{backgroundColor:global.mainColor, padding:10,flexDirection: "row",
                    shadowOffset: {width: 2, height: 5},
                    shadowOpacity: 0.5,
                    shadowRadius: 3,
                    shadowColor: "#ff00004f",
                    elevation: 2,
                    paddingBottom:10,
                    paddingTop:10
                }}>
                    <View style={{flexDirection:"row",justifyContent:"space-between",width:width-220,marginLeft:110,marginRight:110}}>
                        <TouchableOpacity style={ this.state.tabShow === "消息" ? styles.homePageTabBtnSelect : styles.homePageTabBtn}
                                          onPress={()=>this.setState({tabShow:"消息"})}>
                            <Text style={styles.homePageTabText}>消息</Text>
                        </TouchableOpacity>
                        {/*<TouchableOpacity style={this.state.tabShow === "订阅" ? styles.homePageTabBtnSelect : styles.homePageTabBtn}*/}
                                          {/*onPress={()=>this.setState({tabShow:"订阅"})}*/}
                        {/*>*/}
                            {/*<Text style={styles.homePageTabText}>订阅</Text>*/}
                        {/*</TouchableOpacity>*/}
                        <TouchableOpacity style={this.state.tabShow === "提醒" ? styles.homePageTabBtnSelect : styles.homePageTabBtn}
                                          onPress={()=>this.setState({tabShow:"提醒"})}
                        >
                            <Text style={styles.homePageTabText}>提醒</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{marginTop:10}}>
                    {/*三个按钮*/}
                    <TouchableOpacity style={styles.touchableItem}>
                        <View style={{
                            backgroundColor:"#F5A687",
                            width:30,
                            height:30,
                            borderRadius:30,
                            alignItems:"center",}}>
                            <Image   source={source=require('../image/pinglun.png')}
                                     style={styles.touchableImage} />
                        </View>

                        <Text style={styles.touchableText}>评论</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touchableItem}>
                        <View style={{
                            backgroundColor:"#F6D68A",
                            width:30,
                            height:30,
                            borderRadius:30,
                            alignItems:"center",}}>
                            <Image   source={source=require('../image/atme.png')}
                                     style={styles.touchableImage} />
                        </View>

                        <Text style={styles.touchableText}>@我</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touchableItem}>
                        <View style={{
                            backgroundColor:"#FAA8B2",
                            width:30,
                            height:30,
                            borderRadius:30,
                            alignItems:"center",}}>
                            <Image   source={source=require('../image/heartw.png')}
                                     style={styles.touchableImage} />
                        </View>

                        <Text style={styles.touchableText}>点赞</Text>
                    </TouchableOpacity>
                </View>

                <View style={{marginTop:10,height:height-350}}>
                    {/*即时聊天*/}
                    <TouchableOpacity style={styles.touchableItem}>
                        <Image   source={source=require('../image/noavatar.gif')}
                                 style={{width:30,height:30,borderRadius:15,   }} />

                        <View>

                        </View>
                    </TouchableOpacity>
                </View>

            </SmartView>
        )
    }
}

const styles = StyleSheet.create({
    homePageTabText : {
        // color:"#ffffffa1",
        color:"#ffffff",
        fontWeight:"900",
        // margin:10,
        fontSize:16,
        borderBottomWidth:3,
        borderBottomColor:"#ffffff",
        paddingBottom:5
    },
    homePageTabTextSelected :{
        color:"#ffffff",
        fontWeight:"900",
        margin:10,
        fontSize:16,

    },
    homePageTabBtnSelect : {
        borderBottomWidth:3,
        borderBottomColor:"#ffffff",
        marginLeft:15,
        marginRight:15,
    },
    homePageTabBtn : {
        marginLeft:15,
        marginRight:15,
    },
    touchableItem : {
        flexDirection:"row",
        padding:10,
        paddingLeft:25,
        backgroundColor:"#fff",
        borderBottomWidth :1,
        borderColor:"#F6F6F6"
    },
    touchableImage : {
        width   : 15,
        height  : 15,
        marginTop:7.5
    },
    touchableText : {
        padding:7.5,
        marginLeft:10,
        color:"#7B6164",
        fontWeight:"800",
        width:width-80
    },
    touchableImageBackground : {
        backgroundColor:"#F5A687",
        width:30,
        height:30,
        borderRadius:30,
        alignItems:"center",

    }
});