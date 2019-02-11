import React, { Component } from 'react';
import {
    View,
    Text,
    Dimensions,
    Platform

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
                    backgroundColor:"#ffffff",
                    borderTopColor:this.props.borderColor ? this.props.borderColor :global.mainColor,
                    borderTopWidth:this.state.paddingTop,
                    paddingBottom:this.state.paddingBottom
                }}
            >
                {this.props.children}
            </View>
        );
    }
}
