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
        threads         : []
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
            console.log(responseJson)
            AsyncStorage.setItem("homePageData",JSON.stringify(responseJson.data));
            this.setState({
                forumList : responseJson.data.suki_forum,
                threads : responseJson.data.suki_threads
            })
        });
    };
    // async sukiThreadetNextPage = () => {
    //
    // };

    render() {

        return (
                <SmartView>
                    <View style={{backgroundColor:global.mainColor, padding:10,flexDirection: "row",justifyContent:"space-between",
                        shadowOffset: {width: 2, height: 5},
                        shadowOpacity: 0.5,
                        shadowRadius: 3,
                        shadowColor: "#ff00004f",
                        elevation: 2,}}>
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
                            <Text style={{width:60}}>搜索</Text>
                        </TouchableOpacity>
                    </View>
                    {/*banner*/}

                    {/*选择板块*/}
                    <View style={{height:100}}>
                        <FlatList
                            data={this.state.forumList}
                            keyExtractor = { (item) =>  item.name}
                            style={{padding:5,marginTop:10, height:10, flex:1,}}
                            // numColumns={5}
                            // showsHorizontalScrollIndicator= {false}//隐藏水平滚动条
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

                                        <TouchableOpacity style={{margin:10,height:30}} onPress={()=>{}}>
                                            <View style={{backgroundColor:"#fff",alignItems:"center",shadowOffset: {width: 0, height: 3},
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

                                            <Text numberOfLines={10} style={{fontSize:12,color:"#340d0e",fontWeight:"600",padding:5,marginTop:10,width:40}}>
                                                {item.name}
                                            </Text>

                                        </TouchableOpacity>
                                    )
                                }
                            }
                        />
                    </View>

                    {/*帖子列表*/}
                    <FlatList
                        data={this.state.threads}
                        keyExtractor = { (item) =>  "key" + item.tid}
                        style={{marginTop:10, height:50, flex:1,}}
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
                                    <View style={{margin:10}} >
                                        <TouchableOpacity onPress={()=>{}} style={{flexDirection:"row",width:main_width}}>
                                            <Image source={{uri: item.avatar}} style={{width: 30, height: 30,
                                                margin:5
                                            }} />
                                            <Text style={{margin:8}}>{item.author}</Text>
                                        </TouchableOpacity>
                                        <View style={{backgroundColor:"#fff",alignItems:"center",width:main_width
                                        }}>

                                            { item.preview != "" &&
                                                <Text numberOfLines={2} style={{fontSize:12,color:"#340d0e",fontWeight:"600",padding:5,marginTop:10,width:main_width}}>
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
                                                                <Image key={content} source={{uri: content}} style={{width: (main_width-30)/3, height: (main_width-30)/3,
                                                                    margin:5
                                                                }} />

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
        fontSize:15
    },
    homePageTabTextSelected :{
        color:"#ffffff",
        fontWeight:"900",
        margin:10,
        fontSize:15,
        borderBottomWidth:3,
        borderBottomColor:"#ffffff"
    }
});
