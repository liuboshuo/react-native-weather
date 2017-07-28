import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';
import common_style from './../common/theme/common_style'
import Button from './../common/component/button'
import * as constant from './../common/theme/constant'
import Weather_FlatList from './../component/weather_flat_view'
export default class City_Weather_Page extends Component {

    render() {
        const {city,nowWeather,everyHourWeather,fiftheenWeather,key} = this.props;
        return (
            <View key={key}>
                <Image  style={styles.container} source={{uri:nowWeather.data.bg}}>

                    {/* 温度信息 */}
                    <View style={styles.topView}>
                        <Image style={styles.iconStyle} source={{uri:nowWeather.data.icon}}/>
                        <Text style={styles.textStyle}>{nowWeather.data.w}</Text>

                        <View style={styles.tmpViewStyle}>
                            <Text style={styles.tmpStyle}>{nowWeather.data.tmp_min} {"~"} {nowWeather.data.tmp_max}</Text>
                            <Text style={styles.tmpUnit}>°C</Text>
                        </View>
                    </View>


                    {/* 当前温度, 气压  */}
                    <View style={styles.middleView}>
                        <View style={styles.colllectView}>
                            <Image source={{uri:'current_temp'}} style={styles.smallIcon}/>
                            <View>
                                <Text style={common_style.subTitle255Style}>当前温度</Text>
                                <Text style={common_style.subTitle255Style}>{nowWeather.data.tmp}{"°C"}</Text>
                            </View>
                        </View>



                        <View style={styles.colllectView}>
                            <Image source={{uri:'wind'}} style={styles.smallIcon}/>
                            <View>
                                <Text style={common_style.subTitle255Style}>{nowWeather.data.wd}</Text>
                                <Text style={common_style.subTitle255Style}>{nowWeather.data.wdg}{'级'}</Text>
                            </View>
                        </View>
                        <View style={styles.colllectView}>
                            <Image source={{uri:'air_pressure'}} style={styles.smallIcon}/>
                            <View>
                                <Text style={common_style.subTitle255Style}>气压</Text>
                                <Text style={common_style.subTitle255Style}>{nowWeather.data.st}</Text>
                            </View>
                        </View>
                    </View>

                    {/*15天预报*/}

                    <View style={styles.bottom}>

                        <View style={styles.fifTitle}>
                            <Text style={common_style.title255Style}>15天天气预报</Text>
                            <View style={styles.rightView}>
                                <Button text="今天详情" textStyle={common_style.subTitle255Style} style={styles.btnStyle}/>
                                <Button text="明天详情" textStyle={common_style.subTitle255Style} style={styles.btnStyle}/>
                            </View>
                        </View>

                    </View>


                    {/**/}
                    <Weather_FlatList fiftheenWeather={fiftheenWeather} />

                </Image>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container:{
        width:constant.screen_width,
        height:constant.screen_height,
        paddingTop:constant.navigation_height,
    },
    topView:{
        alignItems:'center',
        marginTop:30,
    },
    tmpViewStyle:{
        flexDirection:"row",
        alignItems:'center',
        marginTop:30
    },
    tmpStyle:{
        color:"#fff",
        fontSize:30,
    },
    tmpUnit:{
        color:"#fff",
        fontSize:20,
        alignSelf:"flex-end",
        paddingBottom:2
    },
    iconStyle:{
        width:90,
        height:90,
    },
    textStyle:{
        color:"#fff",
        fontSize:18,
    },
    middleView:{
        flexDirection:"row",
        alignItems:'center'
    },
    colllectView:{
        width:constant.screen_width / 3,
        height:constant.screen_width / 3 - 20,
        marginRight:3,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    smallIcon:{
        width:20,
        height:20,
        marginRight:2
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
        paddingLeft:15
    },
    rightView:{
        flexDirection:'row',
        alignItems:'center'
    },
    btnStyle:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginRight:10,
        backgroundColor:'rgba(250,250,250,0.1)',
        padding:6,
    }
})