/**
 * Created by ls-mac on 2017/7/23.
 */
import React , {Component} from 'react'
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    ScrollView,
    Animated,
    Image
} from 'react-native'
import * as constant from './../common/theme/constant'
import Swiper from 'react-native-swiper'

const leftW = 60;
const rightW = 60;
const tabBarW = constant.screen_width - leftW - rightW;
const btnW = tabBarW / 3
export default class CustomTabBar extends Component
{
    constructor(props){
        super(props);



        this.animatedLeft = 0
        this.lastPoint = null;
        this.state = {
            viewX : new Animated.Value(0),
        }
        const {tabs} = this.props;
        tabs.map((text,index)=>{
            this.state["textSize"+index] = new Animated.Value(0)
        })
        this.responder = {
            onStartShouldSetResponder:(evt,gestureState)=>{return true},
            onMoveShouldSetResponder:(evt,gestureState)=>{return true},
            onStartShouldSetPanResponderCapture:(evt,gestureState)=>{return true},
            onStartShouldSetPanResponder:(evt,gestureState)=>{return true},
            onMoveShouldSetPanResponderCapture:(evt,gestureState)=>{return true},
            onMoveShouldSetPanResponder:(evt,gestureState)=>{
                return true
            },
            onResponderGrant:(evt, gestureState)=> {
                console.log(evt.nativeEvent)
            },
            onResponderMove:(evt, gestureState)=>{
                // console.log(evt.nativeEvent)
                if (this.lastPoint){
                    const pageX = this.animatedLeft + (evt.nativeEvent.pageX - this.lastPoint.pageX);
                    console.log(pageX)
                    Animated.timing(this.state.viewX,{
                        toValue:pageX,
                        duration:evt.nativeEvent.timestamp - this.lastPoint.timestamp
                    }).start()
                    this.animatedLeft = pageX;



                    const centerX =  tabBarW / 2  - btnW / 2;

                    let moveX = 0 ,index = 0;
                    for (let i=0;i<tabs.length;i++){
                        let distance = (i*btnW + pageX - centerX)
                        if (distance < 0 ){
                            distance = -1 * distance;
                        }
                        if (i == 0){
                            moveX = distance;
                        }else {
                            if (moveX > distance ){
                                moveX = distance
                                index = i;
                            }
                        }
                        const animateds = [];
                        tabs.map((item,i)=>{
                            animateds.push(this.state["textSize"+i])
                        })
                        Animated.parallel(animateds.map(item=>{
                            return Animated.timing(item,{
                                toValue:centerX / (centerX - moveX),
                                duration:100
                            })
                        })).start();
                    }


                }
                this.lastPoint = evt.nativeEvent;
            },
            onResponderRelease:(evt, gestureState)=>{
                const {tabs} = this.props
                if (this.lastPoint){
                    let pageX = this.animatedLeft + (evt.nativeEvent.pageX - this.lastPoint.pageX);
                    const centerX =  tabBarW / 2;

                    let moveX = 0 ,index = 0;
                    for (let i=0;i<tabs.length;i++){
                        let distance = (i*btnW + pageX - centerX + btnW / 2)
                        if (distance < 0 ){
                            distance = -1 * distance;
                        }
                        if (i == 0){
                            moveX = distance;
                        }else {
                            if (moveX > distance ){
                                moveX = distance
                                index = i;
                            }
                        }
                    }
                    pageX = centerX  - btnW / 2 - index * btnW





                    console.log(pageX)
                    Animated.timing(this.state.viewX,{
                        toValue:pageX,
                        duration:evt.nativeEvent.timestamp - this.lastPoint.timestamp
                    }).start()
                    this.animatedLeft = pageX;
                }
                //修复
                this.lastPoint = null;
            },
        }

    }
    render(){
        const {select_citys,tabs} = this.props;
        let selectTextStyle = {}
        const swiper = tabs.map((tab, i)=>{
            return (
                <TouchableOpacity key={i} style={styles.item} activeOpacity={1} >
                    <Animated.Text style={[styles.textStyle,selectTextStyle,{
                        fontSize:this.state["textSize"+i].interpolate({
                            inputRange:[0,1],
                            outputRange:[12,17],
                        })
                    }]}>{tab}</Animated.Text>
                </TouchableOpacity>
            )
        })
        return (
            <View style={styles.customTab}>
                <Image source={{uri:"icon_navigation_bar_image"}} style={{resizeMode:'cover',zIndex:1,width:60,height:constant.navigationNoStatusHeight_height}}>

                </Image>
                <View style={styles.tabBar}>
                    <Animated.View style={[styles.swiper,{left:this.state.viewX}]}
                          {...this.responder}
                    >
                        {swiper}
                    </Animated.View>
                </View>
                <Image source={{uri:"icon_navigation_bar_image"}} style={{zIndex:2,width:60,height:constant.navigationNoStatusHeight_height}}>
                </Image>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    customTab:{
        backgroundColor:"red",
        flexDirection:'row'
    },
    tabBar:{
        width:constant.screen_width - 120,
        height:constant.navigationNoStatusHeight_height,
        backgroundColor:'orange',
    },
    swiper:{
        position:'absolute',
        width:constant.screen_width - 120,
        height:constant.navigationNoStatusHeight_height,
        top:0,
        flexDirection:"row",
        alignItems:'center',
        backgroundColor:'purple',
        zIndex:-1
    },
    item:{
        width:btnW,
        height:constant.navigationNoStatusHeight_height,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
    },
    textStyle:{
        color:"#fff",
        fontSize:17,
        backgroundColor: 'rgba(0,0,0,0)'
    }

})