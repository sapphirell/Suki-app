import React, { Component } from 'react';
import {
    View,
    Text,
    Dimensions,
    Platform,
    StatusBar

} from 'react-native';

let {height, width} = Dimensions.get('window');

// iPhoneX
const X_WIDTH = 375;
const X_HEIGHT = 812;



export default class SmartView extends Component  {
    async componentDidMount() {
        if(Platform.OS === 'ios')
        {
            if ( (height === X_HEIGHT && width === X_WIDTH) || (height === X_WIDTH && width === X_HEIGHT) )
            {
                //对iphone X 适配
                this.setState({paddingTop:global.iphoneXPaddingTop, paddingBottom:20})
            }
            else
            {
                this.setState({paddingTop:global.iphoneCommonPaddingTop, paddingBottom:0})
            }
        }
    }
    state = {
        paddingTop : 0,
        paddingBottom: 0
    };
    render() {
        // console.log(this.props.children);
        return (
            <View
                style={{
                    width:width,
                    flex:1,
                    height:height,
                    backgroundColor:this.props.bgColor ? this.props.borderColor :"#fafafa",
                    borderTopColor:this.props.borderColor ? this.props.borderColor :global.mainColor,
                    borderTopWidth:this.state.paddingTop,
                    paddingBottom:this.state.paddingBottom,
                    paddingTop:-10
                }}
            >
                <StatusBar
                    animated={true} //指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden
                    hidden={false}  //是否隐藏状态栏。
                    backgroundColor={'black'} //状态栏的背景色
                    // translucent={true}//指定状态栏是否透明。设置为true时，应用会在状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。
                    barStyle={this.props.barStyle ? this.props.barStyle : 'light-content'} // enum('default', 'light-content', 'dark-content')
                >
                </StatusBar>
                {this.props.children}
            </View>
        );
    }
}
