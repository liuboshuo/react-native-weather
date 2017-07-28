/**
 * Created by liushuo on 17/7/21.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    TextInput,
    Animated
} from 'react-native';
import common_style from './../common/theme/common_style'
import NavigationBar from './../common/component/navigationBar'
import * as contanst from './../common/theme/constant'
import Button from "../common/component/button";

export default class City_Page_NavigationBar extends Component{

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            startInput:false,
            bgImageHeight:new Animated.Value(1),
            searchViewAnimatedTop:new Animated.Value(1),
            searchViewAnimatedLeft:new Animated.Value(1),
            searchViewAnimatedWidth:new Animated.Value(1),
        };
    }
    leftAction(){
        if (this.props.pop) {
            this.props.pop();
        }
    }
    onFocus(){
        const views = [this.state.bgImageHeight,this.state.searchViewAnimatedLeft,this.state.searchViewAnimatedTop,this.state.searchViewAnimatedWidth];
        Animated.parallel(views.map(data=>{
            return Animated.timing(data,{
                toValue:0,
                duration:100
            })
        })).start(()=>{
            //动画结束
            this.setState({
                startInput:true
            })
        })
    }
    onChangeText(){

    }
    cancelSearchAction(){
        this.input.blur();
        this.input.value = "";
        const views = [this.state.bgImageHeight,this.state.searchViewAnimatedLeft,this.state.searchViewAnimatedTop,this.state.searchViewAnimatedWidth];
        Animated.parallel(views.map(data=>{
            return Animated.timing(data,{
                toValue:1,
                duration:100
            })
        })).start(()=>{
            this.setState({
                startInput:false
            })
        })
    }

    render(){
        return (
            <Animated.Image style={[styles.topNavigation,{
                height:this.state.bgImageHeight.interpolate({
                    inputRange:[0,1],
                    outputRange:[contanst.navigation_height,contanst.navigation_height+contanst.navigationNoStatusHeight_height]
                })
            }]} source={{uri:'day'}}>
                <NavigationBar
                    title={"添加城市"}
                    leftImage={{uri:"icon_back"}}
                    leftAction={this.leftAction.bind(this)}
                    style={styles.navigationBar}/>

                <Animated.View style={[styles.topSearchStyle,common_style.padding15, {
                    left: this.state.searchViewAnimatedLeft.interpolate({
                        inputRange: [0, 1],
                        outputRange: [30, 0],
                    }),
                    top: this.state.searchViewAnimatedTop.interpolate({
                        inputRange: [0, 1],
                        outputRange: [contanst.statusBar, contanst.navigation_height],
                    }),
                    width:this.state.searchViewAnimatedWidth.interpolate({
                        inputRange: [0, 1],
                        outputRange: [contanst.screen_width - 30, contanst.screen_width],
                    })
                }]}>
                    <View style={[styles.textView]}>
                        <TextInput
                            ref={ref=>this.input = ref}
                            placeholder={"搜索国内城市"}
                            style={styles.textInput}
                            onFocus={this.onFocus.bind(this)}
                            onChangeText={this.onChangeText.bind(this)}
                        />
                    </View>
                    {this.state.startInput ?
                        <Button text="取消" textStyle={styles.cancelTextStyle}
                                style={styles.cancelButtonStyle} onPress={this.cancelSearchAction.bind(this)}
                        ></Button>
                        :null
                    }
                </Animated.View>
            </Animated.Image>
        )
    }
}

const styles = StyleSheet.create({
    navigationBar:{

    },
    topNavigation:{
        width:contanst.screen_width,
    },
    topSearchStyle:{
        position:'absolute',
        flexDirection:'row',
        justifyContent:'space-between',
        height:30,
        marginTop:contanst.navigationNoStatusHeight_height / 2- 30 / 2,
    },
    textView:{
        flex:1,
        backgroundColor:"#fff",
        borderRadius:5,
    },
    textInput:{
        flex:1,
        fontSize:contanst.subtTitleSize,
        color:contanst.subtTitleColor,
        paddingLeft:6,
        paddingRight:3,
    },
    cancelButtonStyle:{
        justifyContent:'center',
        width:40,
        height:30,
        marginLeft:6,
        alignItems:'center',
    },
    cancelTextStyle:{
        color:"#fff",
        fontSize:contanst.titleSize,
        backgroundColor:'rgba(0,0,0,0)'
    }
});