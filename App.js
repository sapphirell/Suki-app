import React from 'react';
import { Text, View ,AsyncStorage} from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

global.iphoneXPaddingTop = 44;
global.iphoneCommonPaddingTop = 5;
//程序主色调
global.mainColor = "#EF8A96";
//褐色通用色调
global.mainFontColor = "#7B6164";
//程序域名
global.webServer = "http://local.suki-suki.me:8000/";
// global.webServer = "https://sukisuki.org/";
//引入组件
import  home_page from "./src/view/home_page"
import  user_center from "./src/view/user_center"
import  user_message from "./src/view/user_message"
import  _reply_view from "./src/view/reply_view"
class HomeScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Home!</Text>
            </View>
        );
    }
}



const TabNavigator = createBottomTabNavigator({


    reply_view: { screen: _reply_view },
    UserMessage: { screen: user_message },
    UserCenter: { screen: user_center },
    Home: { screen: home_page },

});

export default createAppContainer(TabNavigator);