/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
// import '../model/root' ;
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    YellowBox,
    Button,
    ImageBackground,
    AsyncStorage,//持久化存储
    Alert, Dimensions,
    Image
} from 'react-native';

import Notice from '../model/Notice'
import SmartView from "../model/SmartView";
let {height, width} = Dimensions.get('window');
const X_WIDTH = 375;
const X_HEIGHT = 812;
type Props = {};
export default class login extends Component  {

    state = {
        email:'',
        password:'',
        show_notice :false,
        notice_fn : false,
        paddingTop:20
    };

    componentDidMount() {
        if(Platform.OS === 'ios')
        {
            if ( (height === X_HEIGHT && width === X_WIDTH) || (height === X_WIDTH && width === X_HEIGHT) )
            {
                //对iphone X 适配
                this.setState({paddingTop:44, paddingBottom:20})
            }
            else
            {
                this.setState({paddingTop:20, paddingBottom:0})
            }
        }
    }
    userLogin = (push,callBack=()=>{}) => {
        // navigate('user_center',{
        //     id:123
        // })

        // // 检查是否填写
        if(!this.state.email || !this.state.password)
        {
            this.setState({show_notice:"尚未填写账号或密码",notice_fn: () => callBack()});
            return false;
        }

        var loginUrl = global.webServer + 'do-login';
        var formData = 'email='+this.state.email+'&password='+this.state.password+'&form=app';
        // formData = 'email=1745247379@qq.com&password=56921ff6&form=app';
        var formData = 'email=1745247379@qq.com&password=asdasdasd&form=app';
        // formData = 'email=imy@fantuanpu.com&password=asdasdasd&form=app';
        // console.log(loginUrl);
        // console.log(formData);
        fetch(loginUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData
        })  .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                if (responseJson.ret == 200)
                {
                    AsyncStorage.setItem('user_token', responseJson.data.token).then(
                        () => {
                            this.setState({show_notice:"登录成功",notice_fn: () => {
                                    callBack()
                                    push("home_page");
                                }});
                            // alert("登录成功~🎉",() => {
                            //     // callBack()
                            //     // goBack()
                            //     // navigate('user_center')
                            // })

                            // navigate.back();

                        }
                    );
                }
                else
                {
                    alert(responseJson.msg)
                }
            })
            .catch((error) => {
                console.error(error);
            });

    };
    testFunc = () => {
        alert(233)
    };
    render() {
        const { state , navigate, goBack ,push } = this.props.navigation;
        return (
            <ImageBackground
                style={styles.container}
                source={require('../image/bg-p.png')} resizeMode='cover'>
                { this.state.show_notice && <Notice message={this.state.show_notice} fn={this.state.notice_fn} />}
                <TouchableOpacity style={{marginTop:this.state.paddingTop,width: 18, height: 18,}} onPress={()=>goBack()}>
                    <Image source={source=require('../image/false.png')} style={{width: 18, height: 18,borderRadius:5, marginLeft:10}} />
                </TouchableOpacity>
                <View style={{width:width,alignItems:"center"}}>
                    <Image source={source=require('../image/logo.png')} style={{width: 140, height: 55,borderRadius:5,marginTop:50}} />

                </View>
                <View style={{marginTop:30}}>
                    <TextInput
                        style={styles.TextInputTop}
                        autoCapitalize = "none"
                        autoCorrect={false}
                        onChangeText={(text) => this.setState({email:text})}
                        placeholder="请输入邮箱账户"
                    />
                    <TextInput
                        password={true}
                        secureTextEntry={true}
                        style={styles.TextInputBottom}
                        autoCapitalize = "none"
                        autoCorrect={false}
                        onChangeText={ (text) => this.setState({password:text}) }
                        placeholder="请输入密码"
                    />
                    <TextInput
                        password={true}
                        secureTextEntry={true}
                        style={styles.TextInputBottom}
                        autoCapitalize = "none"
                        autoCorrect={false}
                        onChangeText={ (text) => this.setState({repassword:text}) }
                        placeholder="重复输入一次密码"
                    />
                    <View style={{flexDirection:"row"}}>
                        <TextInput
                            style={styles.ShortTextInputBottom}
                            autoCapitalize = "none"
                            autoCorrect={false}
                            onChangeText={(text) => this.setState({code:text})}
                            placeholder="验证码"
                        />
                        <TouchableOpacity style={{position:"relative",top:28 , left:14}}>
                            <Text style={{color:"#FFF",fontSize:15,fontWeight:"700"}}>发送验证</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{width:width,alignItems:"center"}}>
                    <TouchableOpacity style={{width:30,height:30,position:"relative",top:20}} onPress={
                        () => this.userLogin(push,()=>{this.setState({"show_notice":false})})

                    } >
                        <Image source={source=require('../image/next.png')} style={{width:30,height:30}} />
                    </TouchableOpacity>

                </View>

            </ImageBackground>


        );
    }
}

const styles = StyleSheet.create({
    loginButton : {

    },
    loginBox : {
        width:200,
        height:100,

        // shadowOffset: {width: 0, height: 3},
        // shadowColor: '#6d6d6d',
        // shadowOpacity: 1,
        // shadowRadius: 5
    },
    TextInputTop :{
        height: 35,
        width: width-70,
        padding:9,
        marginLeft:35,
        // marginBottom:10,
        // borderWidth: 1,
        // borderTopLeftRadius:3,
        // borderTopRightRadius:3,
        backgroundColor:"#ffffff78",
        borderRadius:5,
        // borderColor:"#fff",
        // borderBottomColor: "#ff7586"
        // shadowOffset: {width: 0, height: 0},shadowColor: '#5db2ff',shadowOpacity: 1, shadowRadius: 5
    },
    TextInputBottom :{
        height: 35,
        width: width-70,
        padding:9,
        marginLeft:35,
        borderRadius:5,
        marginTop:20,
        // borderColor: '#fff',
        // borderWidth: 1,
        // borderTopWidth :0,borderBottomLeftRadius:3,borderBottomRightRadius:3,
        backgroundColor:"#ffffff78",
        // shadowOffset: {width: 0, height: 0},shadowColor: '#5db2ff',shadowOpacity: 1, shadowRadius: 5
    },
    ShortTextInputBottom : {
        height: 35,
        width: width-150,
        padding:9,
        marginLeft:35,
        borderRadius:5,
        marginTop:20,
        backgroundColor:"#ffffff78",
    },
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#ff88a8',
        // backgroundImage:'http://localhost:8000/app/top.png',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
