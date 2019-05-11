import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    navigate,
    FlatList,
    ActivityIndicator,
    ImageBackground,
    ScrollView,
    AsyncStorage,
    Image, YellowBox,
    Dimensions,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    Clipboard
} from 'react-native';


import WebImage from '../model/WebImage'
// import UploadImage from '../model/upload_image'
import SmartView from '../model/SmartView'
import Notice from '../model/Notice'


import {StatusBar} from 'react-native';
console.log('statusBarHeight: ', StatusBar.currentHeight);


let {height, width} = Dimensions.get('window');
//图文列表


let message ;
export default class thread_view extends Component {

    async componentWillMount() {
        await this.setState({pid:80176});
        let forumData = "tid=80173" ;
        this.getThreadData(forumData);
        if (this.props.navigation.state.params && this.props.navigation.state.params.pid)
        {
            await this.setState({pid:this.props.navigation.state.params.pid});
            let forumData = "pid=" + this.props.navigation.state.params.pid ;
            this.getThreadData(forumData);
        }
        else
        {

            await this.setState({tid:this.props.navigation.state.params.tid});
            let forumData = "tid=" + this.props.navigation.state.params.tid ;
            this.getThreadData(forumData);
        }



    }
    imageTextList = (data) => {
        if(data)
        {
            // data.dataArr= data.message.split(/(\[img.+?\[\/img\])/g);
            // console.log(data.message);
            regArr = data.message.split(/(\[img.+?\[\/img\])|(\[quote[\w\W]+?\[\/quote\])|(\[blockquote[\w\W]+?\[\/blockquote\])/);
            dataArr = [];
            regArr.map((data,key)=>{
                if(data !== undefined && data !== "" ) {
                    dataArr.push(data)
                }
            });
            data.dataArr = dataArr;
            // console.log(data.dataArr);
            data.regImg = new RegExp(/^\[img.+?\[\/img\]$/);
            data.regQuote = new RegExp(/^\[.*?quote.*?\][\w\W]*?\[\/.*?quote\]$/);


        }
        // return (<View><Text>?</Text></View>);

        return (
            <View style={{width:width-15}}>
                {
                    data ? data.dataArr.map(
                        (content) => {
                            // console.log(content)
                            return (
                                <View key={typeof(content)=== 'string' ? content : content.toString() }  >
                                    {
                                        data.regImg.test(content) === true ?
                                            <WebImage style={{zIndex:1}} uri = { content.replace(/\[img.*?\]/,'').replace(/\[\/img\]/,'')} />
                                            :
                                            (data.regQuote.test(content) === true ?
                                                    <Text style={{width:width-10,paddingRight:30,fontStyle:"italic",fontSize:11,color:"#606060"}}> 回复 @ {content.replace(/\[blockquote[\w\W]*?\]/,'').replace(/\[\/blockquote\]/,'').replace(/\[quote[\w\W]*?\]/,'').replace(/\[\/quote\]/,'')}</Text>
                                                    :
                                                    <Text  style={{width:width-10,paddingRight:30,color:global.mainFontColor}}>{content}</Text>
                                            )
                                    }
                                </View>
                            )
                        }
                        )
                        :
                        <Text>帖子正在加载ヾ(◍°∇°◍)ﾉﾞ</Text>
                }
            </View>

        );
    };
    getThreadData = async (forumData) => {
        let dataUrl = global.webServer + '/sukiapp_viewthread?page=' + this.state.page;
        let data = await fetch(dataUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: forumData
        }).then((response)=> {return response.json()});
        // alert(this.props.navigation.state.params.tid)
        console.log(data.data);
        if (data.ret !== 200)
            alert(data.msg);
        else
        {
            this.setState({
                thread_data : data.data.thread.thread_subject,
                post_data : data.data.thread.thread_post,
                forum_data : data.data.forum,
                fid : data.data.thread.thread_subject.fid,
                tid : data.data.thread.thread_subject.tid,
                subject : data.data.thread.thread_subject.subject,
                page : this.state.page +1
            })
        }
    };

    getMorePost = async () => {
        let page_url = global.webServer + 'app/post_next_page';
        let postData =  {
            'page' : this.state.page,
            'tid' : this.state.tid,
            'need' : 'json'
        };
        // console.log(postData)
        let posts = await fetch(page_url, {
            method: 'POST',
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData) //不是很懂为什么这里要这样了，而且只有这一个方法
        }).then((response)=> {return response.json()}).catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            // ADD THIS THROW error
            throw error;
        });;
        if(JSON.stringify(posts.data) != '[]')
        {
            this.setState({post_data:this.state.post_data.concat(posts.data),page:this.state.page+1});
        }
        console.log(posts);
    };
    add_my_like_thread = async () => {
        if (!this.state.tid)
        {
            this.setState({show_notice:"帖子尚未加载完成，请稍后~",notice_fn: () => {
                    this.setState({show_notice:false,notice_fn:false,show_more:false})
                }})
        }
        let UserToken = await AsyncStorage.getItem("user_token");
        let dataUrl = global.webServer + '/app/add_my_like';
        let forumData = 'like_id='+this.state.tid+'&form=app&token='+UserToken;
        let data = await fetch(dataUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: forumData
        }).then((response)=> {
            return response.json()

        });
        // alert(this.props.navigation.state.params.tid)
        console.log(data);
        if (data.ret !== 200)
            this.setState({show_notice: data.msg,notice_fn: () => {
                    this.setState({show_notice:false,notice_fn:false,show_more:false})
                }})
        else
        {
            this.setState({show_notice:"已经添加至\'我的喜欢\'",notice_fn: () => {
                    this.setState({show_notice:false,notice_fn:false,show_more:false})
                }})
        }

        return false;
    }
    update_upload_status = (status,url) => {
        if (url)
        {
            // alert(message)
            this.setState({upload_status:status,message:message+"[img]"+url+"[/img]"});
            message = message +"[img]"+url+"[/img]";
            this.refs["INPUT"].focus();
        }
        else
        {
            this.setState({upload_status:status});
        }

    };
    submitMessage = async () => {
        console.log(message);
        // return false;
        let token = await AsyncStorage.getItem('user_token');
        if (!this.state.fid) {
            alert('未获取到板块信息');
            return false;
        }
        if (!this.state.tid) {
            alert('未获取到帖子id');
            return false;
        }
        if (!this.state.subject)
        {
            alert ('未获取到帖子主题'); return false;
        }
        if ( message === '')
        {
            alert ('发帖数据为空'); return false;
        }
        if (!token)
        {
            alert ('未登录'); return false;
        }
        this.refs["INPUT"].blur();
        let formData =  'fid='+this.state.fid
            +'&tid='+this.state.tid
            +'&subject='+this.state.subject
            +'&message='+ message
            +"&token=" + token;

        let postUrl = global.webServer + "app/reply_thread" ;
        this.setState({'message':''});
        fetch(postUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData
        })
        // .then((response) => console.log(response))
            .then((response) => response.json())
            .then((responseJson)=>{
                console.log(responseJson)
                if (responseJson.ret === 200)
                {

                    alert("回帖成功!~");

                    this.getThreadData("tid=" + this.state.tid);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };
    componentDidMount() {

    };
    layoutSetState = (key,value,time=500) => {
        layfn = value
        // clearTimeout(layfn);
        // layfn = setTimeout (() => {
        //     console.log(value);
        //     this.setState({key:value})
        // }, time) ;

    };
    headView = () => {
        return (
            <View style={{backgroundColor:"#FFF", padding:20}}>
                {JSON.stringify(this.state.thread_data) == '{}' ?
                    <View style={{flexDirection:"row"}}>
                        <Image
                            source={source=require('../image/noavatar.gif')}
                            style={{width: 50, height: 50,borderRadius:25}}
                        />

                    </View>
                    :
                    <View style={{flexDirection:"row"}}>
                        <Image
                            source={{
                                uri:  this.state.thread_data.avatar,
                            }}
                            style={{width:40,height:40,borderRadius:20,marginRight:10}}
                        />
                        <View style={{}}>
                            <Text style={{color:global.mainFontColor}}>{this.state.thread_data.author}</Text>
                            <Text style={{ color:"#999999",fontSize:13,marginTop:5}}>1楼 | {this.state.thread_data.dateline}</Text>
                        </View>
                    </View>
                }
                {
                    <View style={{flexDirection:"row",width:width-90,flexWrap:"wrap",marginLeft:0 ,marginTop:10}} >
                        <Text style={{color:mainFontColor,fontSize:17,fontWeight:"700",marginTop:10,marginBottom:10}}>{this.state.thread_data.subject}</Text>
                        {
                            this.state.post_data && this.imageTextList(this.state.post_data[0])
                        }
                    </View>
                }
            </View>
        )
    }
    state = {
        is_login : false,
        tid:0,
        user_token : false,
        thread_data : {},
        post_data :[],
        forum_data : {},
        message : "",
        fid:0,
        subject:'',
        offsetForPlatform:50,
        keyboardVerticalOffset : 0,//键盘抬起高度基础值
        floatBarHeight :0 ,//浮动框高度
        floatBtn:0,//浮动按钮（上传图片）的高度偏移量
        textInputHeight : 30 ,// 输入框高度
        textInputFocus:false,
        upload_status : 'free',
        show_more : false, //是否显示更多菜单
        show_notice :false,
        notice_fn : false,
        page:1,
    };

    render() {
        const { state , navigate, goBack ,props , push } = this.props.navigation;
        // console.log(this.state.post_data);

        return (
            <SmartView style={styles.container} colorType="back" borderColor="#ffffff" bgColor="#fff">
                { this.state.show_notice && <Notice message={this.state.show_notice} fn={this.state.notice_fn} />}
                <View style={{backgroundColor:"#ffffff",flexDirection:"row", padding:10}}>
                    <TouchableOpacity onPress={()=>goBack()}>
                        <Image   source={source=require('../image/left_black3x.png')}
                                 style={{width:11,height:19,marginLeft:10}} />
                    </TouchableOpacity>

                    <Text style={{color:global.mainFontColor,textAlign:"center",fontSize:16,fontWeight:"800",flex:1}}>评论</Text>
                </View>
                <View style={{flex:1,backgroundColor:"#F5F5F5", }}>
                    {
                        this.state.post_data &&
                        <FlatList
                            data={this.state.post_data}
                            ListHeaderComponent={() => this.headView(1)}
                            style={{zIndex:1,paddingTop:5,marginTop:5 }}
                            keyExtractor = {  (item) => item.pid.toString() }
                            onEndReached={this.getMorePost}
                            onEndReachedThreshold={0.01}
                            extraData={this.state}
                            renderItem= {
                                ({item}) => {
                                    return (
                                        <View style={{marginBottom:5,backgroundColor:"#fff",paddingTop:15}} >
                                            {item.position !== 1 &&
                                            <View style={{width:width,paddingLeft:20}}>
                                                <View style={{flexDirection:"row",width:width}} >
                                                    <TouchableOpacity onPress={()=>{
                                                        push('user_view',{
                                                            view_uid: item.authorid,
                                                        })
                                                    }}>
                                                        <Image source={{uri: item.avatar}}
                                                               style={{width: 40, height: 40, borderRadius: 20,marginRight:5}}/>
                                                    </TouchableOpacity>

                                                    <View style={{marginLeft:5,width:width-50,}}>
                                                        <View style={{flexDirection:"row"}}>
                                                            <Text style={{textAlign:"left",width:width-100, color:global.mainFontColor}}>{item.author}</Text>
                                                            <TouchableOpacity>
                                                                <Image source={source=require('../image/more-z.png')}
                                                                       style={{width:20,height:6,marginLeft:7,right:10,top:2}} />
                                                            </TouchableOpacity>

                                                        </View>

                                                        <View style={{marginTop:5,flexDirection:"row",width:width}}>
                                                            <Text style={{ color:"#999999",fontSize:13,}}>{item.position}楼 | {this.state.thread_data.dateline}</Text>
                                                            <TouchableOpacity style={{flexDirection:"row",width:60}}
                                                                              onPress={()=>{
                                                                                  this.refs["INPUT"].focus();
                                                                                  // item.map();
                                                                                  if (item.message.length < 30)
                                                                                  {
                                                                                      var str = item.message.slice(0,-2).substr(0,item.message.length)
                                                                                  }
                                                                                  else
                                                                                  {
                                                                                      var str = item.message.slice(0,-2).substr(0,30) + "..."
                                                                                  }

                                                                                  this.setState({'message':"[quote]"+str+"[/quote]\r\n"})
                                                                              }}>
                                                                <Image source={source=require('../image/reply-b.png')}
                                                                       style={{width:12,height:12,marginLeft:7,position:"relative",top:2}} />
                                                                <Text style={{fontSize:12,color:"#b0b0b0",marginLeft:3,position:"relative",top:2}}>回复</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                </View>
                                                <View style={{marginTop:10,paddingRight:10,paddingBottom:15}}>
                                                    { this.imageTextList(item) }
                                                </View>
                                            </View>
                                            }
                                        </View>
                                    )
                                }
                            }
                        />
                    }
                </View>

                <KeyboardAvoidingView style={{
                    backgroundColor:"#fff",
                    borderColor:"#fff",
                    borderTopWidth:1,
                    borderBottomWidth:1,
                    width:width,
                    height:45 + this.state.floatBarHeight,
                    bottom:this.state.floatBarHeight,
                    // height:80,
                    flexDirection:"row",
                    shadowOffset: {width: 2, height: -5},
                    shadowOpacity: 0.5,
                    shadowRadius: 3,
                    shadowColor: "#cacaca",
                    elevation: 2,
                }}
                                      behavior="padding"
                                      keyboardVerticalOffset={ (Platform.OS === 'ios' ? 80 : -160) + this.state.keyboardVerticalOffset}
                                      // keyboardVerticalOffset={ this.state.keyboardVerticalOffset}
                >
                    <View style={{width:width}}>
                        <View style={{flexDirection:"row"}}>
                            <TextInput
                                multiline={true}
                                value={this.state.message}
                                ref={"INPUT"}
                                underlineColorAndroid="transparent"
                                onContentSizeChange={(event) => {
                                    var lines =   Math.round(Math.round(event.nativeEvent.contentSize.height) / 17) < 5 ?
                                        Math.round(Math.round(event.nativeEvent.contentSize.height) / 17) : 5
                                    this.setState({
                                        textInputHeight: (lines + 1) * 17,
                                        floatBarHeight : lines * 17,
                                        keyboardVerticalOffset : lines * 17,
                                        floatBtn : - lines * 17,
                                    })
                                    console.log(lines)
                                }}
                                // onChangeText={(text) => {message = text}}
                                onChangeText={(text) => {
                                    this.setState({message:text});
                                }}
                                onFocus ={()=>this.setState({textInputFocus:true})}
                                onBlur  ={()=>this.setState({textInputFocus:false})}
                                style={{paddingVertical: 0,backgroundColor:"#f5f5f5",height:this.state.textInputHeight,
                                    marginTop:7,borderRadius:3, fontSize:14, borderWidth:0, width:width-55,
                                    marginRight:10,paddingLeft:5, marginLeft:5,
                                }}/>
                            <TouchableOpacity style={{width:35,height:35,marginLeft:3}} onPress={this.submitMessage}>
                                <Text style={{fontSize:13, color:"#EF8A96",fontWeight:"800",marginTop:15}}>回复</Text>
                            </TouchableOpacity>
                        </View>
                        {
                            this.state.textInputFocus &&
                            <View style={{marginTop:5,marginLeft:5,position:"absolute",bottom:-80 + this.state.floatBtn}}>
                                <TouchableOpacity style={{width:35,height:35,marginLeft:3}} onPress={this.submitMessage}>
                                    <Image
                                        source={source=require('../image/upimg.png')}
                                        style={{width: 20, height: 20}}
                                    />
                                </TouchableOpacity>
                            </View>

                        }


                        {/*<UploadImage  style={{width:25,height:25,marginRight:5,paddingTop:5,alignItems:"center"}}  update_upload_status={this.update_upload_status} />*/}

                    </View>


                </KeyboardAvoidingView>
            </SmartView>
        )
    };
}

const styles = StyleSheet.create({
    container: {
        zIndex:99,
        paddingBottom:30
        // flex: 1,
        // justifyContent: 'center',
        // height:height,
        // paddingTop:40,
        // alignItems: 'center',
        // backgroundColor: '#78d3e9',
        // backgroundColor: '#fff',
    },
    smImage : {
        width: 14, height:14,
        marginLeft:5,
        marginRight:5
    },
    floatButton : {
        width: 20, height:20, marginTop:7.5,
    },
    floatBar : {
        backgroundColor:"#fff",
        borderColor:"#fff",
        borderTopWidth:1,
        borderBottomWidth:1,
        width:width,
        height:45 ,
        bottom:0,
        // left:(width-180)/2,
        // borderRadius:5,
        flexDirection:"row",
        shadowOffset: {width: 2, height: -3},
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowColor: "#cacaca",
        elevation: 2,
    }
});
