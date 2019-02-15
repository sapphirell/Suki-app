/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
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
let {height, width} = Dimensions.get('window');
let main_width = width-20;
import SmartView from  "../model/SmartView"
export default class home_page extends Component  {
    state = {
        forumList       : [],
        sukiThreadPage  : 1,
        threads         : [],
        setting         : [],
        selectedForum   : [],
    };
 
    async componentDidMount() {
        //取缓存，如果没有的话就去取接口
        // let homePageData = await AsyncStorage.getItem("homePageData");
        this.getHomePageData();
    }
    getHomePageData = async () =>
    {
        let homePageUrl = global.webServer + 'suki_home_page';
        let body = {}
        // alert(FormData);
        console.log(homePageUrl);
        fetch(homePageUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',

            },
            credentials: 'include' //带cookie
            // body: body
        }).then((response) => response.json()).then((responseJson) =>
        {
            // this.setState({user_center_data : responseJson.data,is_login:true,user_token:UserToken});
            // alert(JSON.stringify(responseJson.data));
            // AsyncStorage.setItem('user_center_data'+UserToken,JSON.stringify(responseJson.data));
            let setting = JSON.parse(responseJson.data.setting)
            // setting.lolita_viewing_forum = JSON.parse(responseJson.data.setting.lolita_viewing_forum);
            setting.lolita_viewing_forum = JSON.parse(setting.lolita_viewing_forum);
            console.log(setting.lolita_viewing_forum)
        
            // console.log( typeof setting)
            // AsyncStorage.setItem("homePageData",JSON.stringify(responseJson.data));
            this.setState({
                forumList   : responseJson.data.suki_forum,
                threads     : responseJson.data.suki_threads,
                setting     : setting,
                selectedForum : setting.lolita_viewing_forum ? setting.lolita_viewing_forum : []
            });
        });
    };

    //设置浏览板块
    setMySetting = (fid) => {
        if (!fid)
        {
            alert("fid空");
            return false;
        }
        let setting = this.state.setting;
        let selectedForum = this.state.selectedForum;
        fid = parseInt(fid);
        let index = setting.lolita_viewing_forum.indexOf(fid);
        if (index === -1) // add
            selectedForum.push(fid);
        else if (index > -1) //remove
        {
            if (setting.lolita_viewing_forum.length > 1)
            {
                selectedForum.splice(index,1);
            }
            else
                alert("最少保留一个查看的分区")
        }
        //刷新板块帖子
        let sukiThreadUrl = global.webServer + "suki-thread";
        let body = JSON.stringify({'view_forum':selectedForum,'need' : "json"});
        console.log(body);
        fetch(sukiThreadUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', //带cookie
            body: body
        }).then((response) => {
            return response;
        }).then((response) => response.json()).then((responseJson) =>
        {
            console.log(responseJson);
            this.setState({
                threads     : responseJson.data.thread,
                selectedForum : selectedForum
            });
        }).catch(function (err) {
            console.log(err);
            
        });
    };
    // async sukiThreadetNextPage = () => {
    //
    // };

    render() {

        return (
                <SmartView >
                    <View style={{backgroundColor:global.mainColor, padding:10,flexDirection: "row",justifyContent:"space-between",
                        shadowOffset: {width: 2, height: 5},
                        shadowOpacity: 0.5,
                        shadowRadius: 3,
                        shadowColor: "#ff00004f",
                        elevation: 2,
                        paddingBottom:5
                    }}>
                        <Image   source={source=require('../image/logo.png')}
                                 style={{width: 60, height:25}} />
                        <View style={{flexDirection:"row"}}>
                            <TouchableOpacity>
                                <Text style={styles.homePageTabTextSelected}>推荐</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.homePageTabText}>关注</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity>
                            <Text style={{width:40}}>搜索</Text>
                        </TouchableOpacity>
                    </View>
                    {/*banner*/}

                    {/*帖子列表*/}
                    <FlatList
                        ListHeaderComponent={()=>{
                            return (
                                <View style={{height:120,backgroundColor:"#fafafa"}}>
                                    <FlatList
                                        data={this.state.forumList}
                                        keyExtractor = { (item) =>  item.name}
                                        style={{padding:5,marginTop:0, flex:1}}
                                        // numColumns={5}
                                        showsHorizontalScrollIndicator= {false}//隐藏水平滚动条
                                        showsVerticalScrollIndicator= {false}//隐藏竖直滚动条
                                        // onEndReached = {this.fetchMore}
                                        // onEndReachedThreshold = {0.1}
                                        extraData={this.state}
                                        // onRefresh={this.refreshingData}
                                        // refreshing={this.state.isRefresh}
                                        contentContainerStyle={{justifyContent:"space-between"}}
                                        horizontal={true} //水平布局
                                        renderItem= {
                                            ({item}) => {
                                                return (

                                                    <TouchableOpacity
                                                        style={this.state.selectedForum && this.state.selectedForum.indexOf(item.fid) > -1 ? styles.forumBtnSelected : styles.forumBtn}
                                                        onPress={()=>{this.setMySetting(item.fid)}}>
                                                        <View style={{backgroundColor:"#ffffff",alignItems:"center",shadowOffset: {width: 0, height: 3},
                                                            shadowOpacity: 0.5,
                                                            shadowRadius: 2,
                                                            shadowColor: "#0000004d",
                                                            elevation: 2,
                                                            borderRadius:5,
                                                            width:40,
                                                            height:40,
                                                        }}>
                                                            <Image source={{uri: item.appimage}} style={{width: 30, height: 30,
                                                                margin:5
                                                            }} />
                                                        </View>

                                                        <Text style={{fontSize:12,fontWeight:"600",padding:5,marginTop:10,width:50,textAlign:"center",color: "#7B6164"}}>
                                                            {item.name}
                                                        </Text>

                                                    </TouchableOpacity>
                                                )
                                            }
                                        }
                                    />
                                </View>
                            );
                        }}
                        data={this.state.threads}
                        keyExtractor = { (item) =>  "key" + item.tid}
                        style={{marginTop:10,flex:1,backgroundColor:"#fafafa"}}
                        // numColumns={5}
                        // showsHorizontalScrollIndicator= {false}//隐藏水平滚动条
                        showsVerticalScrollIndicator= {false}//隐藏竖直滚动条
                        // onEndReached = {this.fetchMore}
                        // onEndReachedThreshold = {0.1}
                        extraData={this.state}
                        // onRefresh={this.refreshingData}
                        // refreshing={this.state.isRefresh}
                        contentContainerStyle={{justifyContent:"space-between"}}
                        // horizontal={true} //水平布局
                        renderItem= {
                            ({item}) => {
                                return (
                                    <View style={{padding:10,marginBottom:5,backgroundColor:"#ffffff"}} >
                                        <TouchableOpacity onPress={()=>{}} style={{flexDirection:"row",width:main_width}}>
                                            <Image source={{uri: item.avatar}} style={{width: 40, height: 40,
                                                margin:5,borderRadius:20
                                            }} />
                                            <View style={{paddingLeft:5}}>
                                                <View style={{marginTop:5,marginLeft:5,flexDirection:"row",justifyContent:"space-between"}}>
                                                    <Text style={{width:main_width-130,color:"#7B6164",}}>{item.author}</Text>
                                                    <Text style={{fontSize:11,color:"#999999"}}>{item.sim_time}</Text>

                                                </View>
                                                <Text style={{marginTop:7,marginLeft:5, color:"#999999",fontSize:12,}}>{item.suki_fname} · 评论 {item.views} · 点赞 {item.star}</Text>
                                            </View>

                                        </TouchableOpacity>
                                        <View style={{backgroundColor:"#fff",alignItems:"center",width:main_width}}>
                                            { item.preview != "" &&
                                                <Text numberOfLines={2} style={{color:"#7B6164",fontWeight:"600",padding:5,marginTop:10,width:main_width,fontSize:12}}>
                                                    {item.preview}
                                                </Text>
                                            }

                                            <View style={{width:main_width,flexDirection:"row"}}>
                                                {
                                                    item.subject_images  &&
                                                    item.subject_images.map(
                                                        (content) => {
                                                            // console.log(content)
                                                            return (
                                                                <Image key={content} source={{uri: content}} style={{width: (main_width-30)/3, height: (main_width-30)/3,margin:5}} />
                                                            )
                                                        }
                                                    )
                                                }
                                            </View>



                                        </View>


                                    </View>
                                )
                            }
                        }
                    />
                </SmartView>

        );
    }
}

const styles = StyleSheet.create({
    homePageTabText : {
        color:"#ffffff",
        fontWeight:"900",
        margin:10,
        fontSize:16,
        borderBottomWidth:3,
        borderBottomColor:"#ffffff"
    },
    homePageTabTextSelected :{
        color:"#ffffff",
        fontWeight:"900",
        margin:10,
        fontSize:16,
        borderBottomWidth:3,
        borderBottomColor:"#ffffff"
    },
    forumBtn : {
        margin:10,height:80,alignItems:"center",
        paddingTop:5,
        borderWidth:2, borderRadius:5,borderColor: "#fafafa",
    },
    forumBtnSelected : {
        margin:10,height:80, borderWidth:2, borderRadius:5,
        paddingTop:5,borderColor: "#ffdcde", alignItems:"center", backgroundColor:"#fff2f1"
    }
});
