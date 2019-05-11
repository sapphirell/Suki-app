import React from 'react';
import { Text, View ,AsyncStorage ,Platform ,Image} from 'react-native';
import {
    createBottomTabNavigator,
    createAppContainer ,
    createStackNavigator,
    StackViewTransitionConfigs
} from 'react-navigation';

global.iphoneXPaddingTop = 44;
global.iphoneCommonPaddingTop = 5;
//程序主色调
global.mainColor = "#EF8A96";
//通用文字色调（土色）
global.mainFontColor = "#7B6164";
//程序域名
global.webServer = "http://local.suki-suki.me:8000/"; //本地测试
// global.webServer = "https://sukisuki.org/";
//引入组件
import  home_page from "./src/view/home_page"
import  user_center from "./src/view/user_center"
import  user_message from "./src/view/user_message"
import  _reply_view from "./src/view/reply_view"
import  _thread_view from "./src/view/thread_view"
import  _login_view from "./src/view/login"
import  _register_view from "./src/view/register"

const MessageStack = createStackNavigator({
    UserMessage : user_message ,
},{
    //screen模式才可以隐藏导航header,none为全局隐藏
    headerMode: 'none'
});

const HomePageStack = createStackNavigator({
    home_page : home_page ,

},{
    //screen模式才可以隐藏导航header,none为全局隐藏
    headerMode: 'none'
});


const TabNavigator = createBottomTabNavigator({
    // tab: {screen : Tab},
    // thread_view: { screen: _thread_view },
    // _login_view : _login_view,
    _register_view : _register_view,
    "首页": HomePageStack,
    "消息": MessageStack,
    "我的": { screen: user_center },
},{

    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const { routeName } = navigation.state;
            // var tabIconSrc = `me.png`;
            if (routeName === '首页') {
                return  <View style={{width:25,height:25}}>
                            {
                                focused
                                ? <Image source={source=require('./src/image/home_pre.png')}
                                         style={{width   : 25,
                                                height  : 25,
                                         }} />
                                : <Image source={source=require('./src/image/home.png')}
                                         style={{
                                               width   : 25,
                                               height  : 25,
                                         }} />
                            }
                </View>
            }
            else if(routeName === '消息')
            {
                return  <View style={{width:25,height:25}}>
                    {
                        focused
                            ? <Image   source={source=require('./src/image/mess_pre.png')}
                                       style={{width   : 25,
                                           height  : 25,
                                       }} />
                            : <Image   source={source=require('./src/image/mess.png')}
                                       style={{
                                           width   : 25,
                                           height  : 25,
                                       }} />
                    }
                </View>
            }
            else if(routeName === '我的')
            {
                return  <View style={{width:25,height:28}}>
                    {
                        focused
                            ? <Image   source={source=require('./src/image/me_pre.png')}
                                       style={{width   : 28,
                                           height  : 28,
                                       }} />
                            : <Image   source={source=require('./src/image/me.png')}
                                       style={{
                                           width   : 28,
                                           height  : 28,
                                       }} />
                    }
                </View>
            }
            else if(routeName === '_register_view')
            {
                return  <View style={{width:25,height:28}}>
                    {
                        focused
                            ? <Image   source={source=require('./src/image/me_pre.png')}
                                       style={{width   : 28,
                                           height  : 28,
                                       }} />
                            : <Image   source={source=require('./src/image/me.png')}
                                       style={{
                                           width   : 28,
                                           height  : 28,
                                       }} />
                    }
                </View>
            }
            else
            {
                return <View/>
            }

        },
    }),
    tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        style : {
            borderTopColor:"#ddd",
        }
    }

});
const AppNavigator = createStackNavigator(
    {
        TabNavigator,
        _thread_view: {
            screen : _thread_view ,
        },
        // reply_view : _reply_view
    },
    {
        //screen模式才可以隐藏导航header,none为全局隐藏
        headerMode: 'none'
    }
);
export default createAppContainer(AppNavigator);