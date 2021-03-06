import { createStackNavigator, createAppContainer } from 'react-navigation';
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
let main_height = height - 170;
import SmartView from  "../model/SmartView"
export default class home_page extends Component  {
    state = {
        forumList       : [],
        sukiThreadPage  : 1,
        threads         : [],
        setting         : [],
        selectedForum   : [],
        nowPage         : 1,
        netWork         : 0,
        sukiThreadOnFresh : false,
        tabShow         : "推荐"
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
                selectedForum : setting.lolita_viewing_forum ? setting.lolita_viewing_forum : [],

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
    //上拉加载下一页
    getNextPage = async () => {
        let sukiThreadUrl = global.webServer + "suki-thread";
        let body = JSON.stringify({'view_forum':this.state.selectedForum,'need' : "json","page":this.state.nowPage+1});
        if (this.state.netWork === 0)
        {
            await this.setState({netWork:1});
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
                    threads     : this.state.threads.concat(responseJson.data.thread),
                    nowPage : this.state.nowPage +1,
                    netWork:0
                });
            }).catch(function (err) {
                console.log(err);
                this.setState({netWork:0})
            });
        }
        else
        {
            console.log("繁忙中");
        }
        
    };
    //下拉重载帖子
    sukiThreadReload = async () => {
        let sukiThreadUrl = global.webServer + "suki-thread";
        let body = JSON.stringify({'view_forum':this.state.selectedForum,'need' : "json","page":1});
        if (this.state.netWork === 0)
        {
            await this.setState({netWork:1});
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
                    nowPage : 1,
                    netWork : 0
                });
            }).catch(function (err) {
                console.log(err);
                this.setState({netWork:0})
            });
        }
        else
        {
            console.log("繁忙中");
        }
    };

    // async sukiThreadetNextPage = () => {
    //
    // };

    render() {
        console.log(this.props.navigation)
        const { state , navigate, goBack ,props ,push} = this.props.navigation;
        return (
                <SmartView
                    // barStyle="light-content"
                    navigation={this.props.navigation}
                >
                    <View style={{backgroundColor:global.mainColor, padding:10,flexDirection: "row",justifyContent:"space-between",
                        shadowOffset: {width: 2, height: 5},
                        shadowOpacity: 0.5,
                        shadowRadius: 3,
                        shadowColor: "#ff00004f",
                        elevation: 2,
                        paddingBottom:10,
                        paddingTop:10
                    }}>
                        <Image   source={source=require('../image/logo.png')}
                                 style={{width: 60, height:25}} />
                        <View style={{flexDirection:"row"}}>
                            <TouchableOpacity style={ this.state.tabShow === "推荐" ? styles.homePageTabBtnSelect : styles.homePageTabBtn}
                                              onPress={()=>this.setState({tabShow:"推荐"})}>
                                <Text style={styles.homePageTabText}>推荐</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={this.state.tabShow === "关注" ? styles.homePageTabBtnSelect : styles.homePageTabBtn}
                                              onPress={()=>this.setState({tabShow:"关注"})}
                            >
                                <Text style={styles.homePageTabText}>关注</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity>
                            <Image source={source = require('../image/search.png')}
                                   style={{width: 20, height:20,marginRight:10,marginLeft:30}}
                            />
                        </TouchableOpacity>
                    </View>
                    {/*banner*/}

                    {this.state.tabShow === "推荐" &&
                    <View style={{zIndex:1,height:height-170}}>
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
                            style={{flex:1,backgroundColor:"#fafafa",height:height,}}
                            // numColumns={5}
                            // showsHorizontalScrollIndicator= {false}//隐藏水平滚动条
                            showsVerticalScrollIndicator= {false}//隐藏竖直滚动条
                            onEndReached = {this.getNextPage}
                            onEndReachedThreshold = {0.2}
                            extraData={this.state}
                            onRefresh={this.sukiThreadReload}
                            refreshing={this.state.sukiThreadOnFresh}
                            contentContainerStyle={{justifyContent:"space-between", paddingBottom:0}}
                            // horizontal={true} //水平布局
                            renderItem= {
                                ({item}) => {
                                    return (
                                        <View style={{padding:10,marginBottom:5,backgroundColor:"#ffffff"}} >
                                            <TouchableOpacity onPress={()=>{
                                                this.props.navigation.push('_thread_view',{
                                                    tid: item.tid,
                                                })
                                            }} style={{flexDirection:"row",width:main_width}}>
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
                                                <TouchableOpacity onPress={()=>{
                                                    this.props.navigation.push('_thread_view',{
                                                        tid: item.tid,
                                                    })
                                                }}>
                                                    <Text numberOfLines={2} style={{color:"#7B6164",fontWeight:"600",padding:5,marginTop:10,width:main_width,fontSize:12}}>
                                                        {item.preview}
                                                    </Text>
                                                </TouchableOpacity>

                                                }

                                                <View style={{width:main_width,flexDirection:"row"}}>
                                                    {
                                                        item.subject_images  &&
                                                        item.subject_images.map(
                                                            (content,key) => {
                                                                return (
                                                                    <Image key={item.tid+content+key} source={{uri: content}} style={{width: (main_width-30)/3, height: (main_width-30)/3,margin:5}} />
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
                    </View>
                    }
                    {this.state.tabShow === "推荐" &&
                        <View style={{zIndex:1,height:height-170}}>
                            <Text>关注</Text>
                        </View>
                    }
                </SmartView>

        );
    }
}

const styles = StyleSheet.create({
    homePageTabText : {
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
