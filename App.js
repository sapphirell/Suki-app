import React from 'react';
import { Text, View ,AsyncStorage} from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

global.iphoneXPaddingTop = 44;
global.iphoneCommonPaddingTop = 5;
//程序主色调
global.mainColor = "#EF8A96";
//程序域名
global.webServer = "http://local.suki-suki.me:8000/";
// global.webServer = "https://sukisuki.org/";
//引入组件
import  home_page from "./src/view/home_page"
import  user_center from "./src/view/user_center"
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

    UserCenter: { screen: user_center },
    Home: { screen: home_page },
});

export default createAppContainer(TabNavigator);