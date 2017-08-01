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

            },
            onResponderMove:(evt, gestureState)=>{
                const {tabs} = this.props;
                if (this.lastPoint){
                    const pageX = this.animatedLeft + (evt.nativeEvent.pageX - this.lastPoint.pageX);
                    const centerX =  tabBarW / 2;
                    const index = Math.floor((centerX - pageX) / btnW)
                    if (index != this.state.selectIndex && index>=0 && index <= tabs.length-1){
                        this.setState({selectIndex:index})
                    }
                    this.startMove(evt,pageX)
                }
                this.lastPoint = evt.nativeEvent;
            },
            onResponderRelease:(evt, gestureState)=>{
                const {tabs} = this.props;
                if (this.lastPoint){
                    let pageX = this.animatedLeft + (evt.nativeEvent.pageX - this.lastPoint.pageX);

                    const centerX =  tabBarW / 2;

                    const distanceArr = this.getMinDis(pageX)
                    let moveX = distanceArr[0] ,index = 0;
                    for (let i=1;i<distanceArr.length;i++){
                        let distance = distanceArr[i]
                        if (moveX > distance ){
                            moveX = distance
                            index = i;
                        }
                    }
                    pageX = centerX  - btnW / 2 - index * btnW
                    this.startMove(evt,pageX,()=>{
                        this.changeSelect(index)
                    })
                }
                //修复
                this.lastPoint = null;
            },
        }
    }
    getMinDis(pageX){
        const {tabs} = this.props
        const distanceArr = [];
        const centerX =  tabBarW / 2;
        tabs.map((item,index)=>{
            let distance = (index*btnW + pageX - centerX + btnW / 2)
            if (distance < 0 ){
                distance = -1 * distance;
            }
            distanceArr.push(distance)
        })
        return distanceArr;
    }
    startMove(evt,pageX, success=null){
        const moveTime = evt.nativeEvent.timestamp - this.lastPoint.timestamp;
        Animated.timing(this.state.viewX,{
            toValue:pageX,
            duration:moveTime > 100 ? 100 : moveTime
        }).start(success)
        this.animatedLeft = pageX;
    }
    componentDidMount(){
        const {selectIndex} = this.props;
        this.state["selectIndex"] = selectIndex;
        this.initialMove()
    }
    componentWillReceiveProps(props) {
        const {selectIndex} = props;
        if (this.state.selectIndex != selectIndex){
            this.state.selectIndex = selectIndex;
            this.initialMove()
        }
    }
    initialMove(finished=null){
        const {selectIndex} = this.state;
        Animated.timing(this.state.viewX,{
            toValue:(tabBarW / 2 - btnW / 2) - selectIndex*btnW,
            duration: 100
        }).start(finished)
        this.animatedLeft = tabBarW / 2 - btnW / 2;
    }
    changeSelect(index){

        this.setState({selectIndex:index})

        this.props.onChangePage(index)
    }

    render(){
        const {tabs} = this.props;
        const {selectIndex} = this.state;
        let selectTextStyle = {}
        const swiper = tabs.map((tab, i)=>{
            if (selectIndex == i){
                selectTextStyle = {fontSize:18, fontWeight:'bold',color:"rgba(255,255,255,1)"}
            }else {
                selectTextStyle = {fontSize:13,color:"rgba(255,255,255,0.5)"}
            }
            return (
                <TouchableOpacity key={i} style={styles.item} activeOpacity={1} onPress={()=>{
                    if (this.state.selectIndex !== i){
                        this.changeSelect(i)
                        this.state.selectIndex = i;
                        this.initialMove()
                    }


                }}>
                    <Text style={[styles.textStyle,selectTextStyle]}>{tab}</Text>
                </TouchableOpacity>
            )
        })

        let styleDot;
        let dots = tabs.map((tab, i)=>{
            styleDot = i == selectIndex ?{color:'#ffffff'}:{color:'rgba(255,255,255,0.1)'}
            return (
                <Text key={i+2*tabs.length} style={[styleDot,{fontSize:13}]}>
                    &bull;
                </Text>
            )
        })
        const style = this.props.style ? this.props.style : {}

        return (
                <View style={[styles.tabBar,style]}>
                    <Animated.View style={[styles.swiper,{left:this.state.viewX}]}
                          {...this.responder}
                    >
                        {swiper}
                    </Animated.View>
                    <View style={styles.dot}>
                        {dots}
                    </View>
                </View>
        )
    }
}


const styles = StyleSheet.create({
    tabBar:{
        marginLeft:60,
        marginRight:60,
        width:constant.screen_width - 120,
        height:constant.navigationNoStatusHeight_height,
        overflow:"scroll" //超出控件的view会隐藏
    },
    swiper:{
        position:'absolute',
        width:constant.screen_width - 120,
        height:constant.navigationNoStatusHeight_height,
        top:0,
        flexDirection:"row",
        alignItems:'center',
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
    },
    dot:{
        flexDirection:"row",
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        width:tabBarW,
        height:10,
        bottom:0,
    }

})