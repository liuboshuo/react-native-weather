import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    Animated
} from 'react-native';
import common_style from './../common/theme/common_style'
import Button from './../common/component/button'
import * as constant from './../common/theme/constant'
import Weather_FlatList from './../component/weather_flat_view'
import {getImageName} from './../common/util/date_util'
import Common_Middle_Cell from "../component/common_cell"
import Now_Weather_View from "../component/now_weather_view"

export default class City_Weather_Page extends Component {

    constructor(props){
        super(props);
        this.state = {
            opacity:new Animated.Value(0)
        }
        this.lastMovePoint = null
        this.contentOffsetY = 0;
    }
    onTouchMove(event){
        if (this.lastMovePoint){
            const moveDistance =  - event.nativeEvent.pageY  + this.lastMovePoint.pageY;
            this.contentOffsetY += moveDistance;
            const toValue = this.contentOffsetY /  this.onScrollViewHeight;
            // console.log(this.contentOffsetY,toValue)
            Animated.timing(this.state.opacity,{
                toValue:toValue,
                duration:10
            }).start()
        }
        this.lastMovePoint = event.nativeEvent;
    }
    onAnimationEnd(event){
        const contentOffet = event.nativeEvent.contentOffset;
        this.contentOffsetY = contentOffet.y;
        const value = contentOffet.y / this.onScrollViewHeight;
        Animated.timing(this.state.opacity,{
            toValue:value,
            duration:1100
        }).start()
    }
    onTouchStart(event){
        this.lastMovePoint = event.nativeEvent;
    }
    onLayout(event){
        this.onScrollViewHeight = event.nativeEvent.layout.height;
    }
    goWeather(){
        const {pushWeatherToday,everyHourWeather,nowWeather,city,fiftheenWeather} = this.props;
        pushWeatherToday(everyHourWeather,nowWeather,fiftheenWeather,city)
    }
    render() {
        const {city,nowWeather,everyHourWeather,fiftheenWeather,key} = this.props;

        return (
                <Image  style={styles.container} key={key} source={{uri:getImageName(nowWeather.data.bg)}}>

                    <Animated.View style={[{backgroundColor:'black',position:'absolute',width:constant.screen_width,height:constant.screen_height},
                        {
                            opacity:this.state.opacity.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 0.5]
                        })
                    }]}>

                    </Animated.View>

                    <ScrollView ref = {"scrollView"}
                                style={styles.content_view}
                                key={key}
                                onLayout={this.onLayout.bind(this)}
                                onTouchMove={(event)=>this.onTouchMove(event)}
                                onMomentumScrollEnd={(event)=>this.onAnimationEnd(event)}
                                onTouchStart={(event)=>this.onTouchStart(event)}
                    >

                        {/* 温度信息 */}

                        <View style={{marginTop:15}}>
                            <Now_Weather_View nowWeather={nowWeather}/>
                        </View>



                        {/* 当前温度, 气压  */}
                        <View style={styles.middleView}>

                            <Common_Middle_Cell
                                icon={'current_temp'}
                                title={'当前温度'}
                                content={nowWeather.data.tmp + "°C"}
                            ></Common_Middle_Cell>


                            <Common_Middle_Cell
                                icon={'wind'}
                                title={nowWeather.data.wd}
                                content={nowWeather.data.wdg + "级"}
                            ></Common_Middle_Cell>

                            <Common_Middle_Cell
                                icon={'air_pressure'}
                                title={"气压"}
                                content={nowWeather.data.airp + "hPa"}
                            ></Common_Middle_Cell>

                        </View>

                        {/*15天预报*/}

                        <View style={styles.bottom}>

                            <View style={styles.fifTitle}>
                                <Text style={common_style.title255Style}>15天天气预报</Text>
                                <View style={styles.rightView}>
                                    <Button text="今天详情"
                                            style={styles.btnStyle}
                                            textStyle={common_style.subTitle255Style}
                                            onPress={this.goWeather.bind(this)}/>
                                    {/*<Button text="明天详情" textStyle={common_style.subTitle255Style} style={styles.btnStyle}/>*/}
                                </View>
                            </View>

                        </View>


                        {/**/}
                        <Weather_FlatList fiftheenWeather={fiftheenWeather} />


                        <View style={styles.scrollViewPadding} />
                    </ScrollView>
                </Image>
        )
    }
}

const styles = StyleSheet.create({
    content_view:{
        paddingBottom:30,
    },
    container:{
        width:constant.screen_width,
        height:constant.screen_height,
        paddingTop:constant.navigation_height,
    },
    middleView:{
        flexDirection:"row",
        alignItems:'center'
    },
    fifTitle:{
        borderTopWidth:1,
        borderTopColor:"rgba(250,250,250,0.1)",
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:"rgba(250,250,250,0.1)",
        justifyContent:'space-between',
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:common_style.padding15.paddingLeft
    },
    rightView:{
        flexDirection:'row',
        alignItems:'center'
    },
    btnStyle:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginRight:common_style.padding10.paddingLeft,
        backgroundColor:'rgba(250,250,250,0.1)',
        padding:6,
    },
    scrollViewPadding:{
        height:30,
    }
})