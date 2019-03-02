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
import SmartView from "../model/SmartView";
let {height, width} = Dimensions.get('window');
let main_width = width-20;
let main_height = height - 170;
export default class home_page extends Component  {

    state = {
        isLogin     : false,
    };

    componentWillMount() {

    }
    render() {

        return (
            <SmartView borderColor="#fff" barStyle="default">
                <View style={{backgroundColor:"#fff"}}>
                    <View style={{flexDirection:"row"}}>
                        <TouchableOpacity style={{margin:10}}>
                            <Image   source={source=require('../image/noavatar.gif')}
                                     style={{width: 80, height:80,borderRadius:40}} />
                        </TouchableOpacity>

                        <View>
                            <Text>用户名</Text>
                            <Text>这个人很懒什么都没留下</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"space-between",paddingLeft:30,paddingRight:30}}>
                        <View style={styles.userInfoView}>
                            <Text style={styles.userInfoContentText}>8</Text>
                            <Text style={styles.userInfoContentTitle}>帖子</Text>
                        </View>
                        <View style={styles.userInfoView}>
                            <Text style={styles.userInfoContentText}>8</Text>
                            <Text style={styles.userInfoContentTitle}>帖子</Text>
                        </View>
                        <View style={styles.userInfoView}>
                            <Text style={styles.userInfoContentText}>8</Text>
                            <Text style={styles.userInfoContentTitle}>帖子</Text>
                        </View>
                    </View>
                </View>
            </SmartView>
        )
    }
}

const styles = StyleSheet.create({
    userInfoView : {},
    userInfoContentTitle : {},
    userInfoContentText : {}
});