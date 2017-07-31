import React, { Component } from 'react';
import {
    View,
    Platform,
    StyleSheet,
    ScrollView,
    Image,
    Text,
    FlatList,
    TouchableOpacity
} from 'react-native'

import common_style from './../common/theme/common_style'
import Button from './../common/component/button'
import * as constant from './../common/theme/constant'
import NavigationBar from "../common/component/navigationBar";
import Now_Weather_View from "../component/now_weather_view";
import Common_Middle_Cell from "../component/common_cell";
import {getTimeFromDate,getImageName} from './../common/util/date_util'
import datas from './../../api/exponential_byAreaId.json'
import {BlurView} from 'react-native-blur'
const exponentialCellViewColumn = 3;

export default class City_Weather_Hour_page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetail:false,
            showExponential:{}
        }
    }
    leftAction(){
        const {navigator} = this.props;
        navigator.pop()
    }
    popupExponential(model){
        this.setState({showDetail:true,showExponential:model.item})
    }
    hiddenDetailView(){
        this.setState({showDetail:false})
    }
    renderColumnItem(model){
        const length = datas.result.data.length;
        let exponentialCellViewBorder= null;
        let row = length / exponentialCellViewColumn;
        const color = common_style.separatorWhite.borderBottomColor
        const width = common_style.separatorWhite.borderBottomWidth
        console.log(length,row);
        if ((model.index+1)  > row * exponentialCellViewColumn - exponentialCellViewColumn  ){
            exponentialCellViewBorder = {borderRightColor:color,borderRightWidth:width}
        }else if ((model.index+1) % exponentialCellViewColumn == 0){
            exponentialCellViewBorder = {borderBottomColor:color,borderBottomWidth:width}
        }else {
            exponentialCellViewBorder = {borderBottomColor:color,borderBottomWidth:width,borderRightColor:color,borderRightWidth:width}
        }
        return (
            <TouchableOpacity onPress={this.popupExponential.bind(this,model)} style={[styles.exponentialCellView,exponentialCellViewBorder]}>


                <Image source={{uri:model.item.icon}} style={styles.exponentialIcon}/>
                <Text style={styles.exponentialText}>{model.item.i4}</Text>


            </TouchableOpacity>
        )

    }
    renderItem(model){
        const {everyHourWeather} = this.props;
        console.log(getTimeFromDate(everyHourWeather.startTime,model.index));
        return (
            <View style={styles.cellView}>
                <Text style={styles.text}>{getTimeFromDate(everyHourWeather.startTime,model.index)}</Text>
                <Image source={{uri:model.item.icon}} style={styles.icon}/>
                <Text style={styles.text}>{model.item.w}</Text>
                <Text style={styles.text}>{model.item.tmp + "°"}</Text>
            </View>
        )
    }
    render() {
        const {city,nowWeather,everyHourWeather} = this.props;
        if (!this.state.showDetail){
            return(
                <Image source={{uri:getImageName(nowWeather.data.bg)}} style={[common_style.container_view,styles.container]}>
                    <NavigationBar
                        title={city.area}
                        leftImage={{uri:"icon_back"}}
                        leftAction={this.leftAction.bind(this)}/>
                    <ScrollView ref={ref=>this.scrollView = ref} style={styles.scrollView}>

                        <View style={{marginTop:15}}>
                            <Now_Weather_View
                                nowWeather={nowWeather}/>
                        </View>

                        <View style={common_style.separatorWhite} />
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
                                content={nowWeather.data.airp  + "hPa"}
                            ></Common_Middle_Cell>

                        </View>

                        <View style={common_style.separatorWhite}/>

                        <View style={styles.middleView}>
                            <Common_Middle_Cell
                                icon={'humidity'}
                                title={'湿度       '}
                                content={nowWeather.data.rh + "%"}
                            ></Common_Middle_Cell>

                            <Common_Middle_Cell
                                icon={'live_sun'}
                                title={"日出"+this.props.fiftheenWeather.series[0].sunrise}
                                content={"日落"+this.props.fiftheenWeather.series[0].sunset}
                            ></Common_Middle_Cell>


                        </View>
                        <View style={common_style.separatorWhite} />

                        <View style={styles.hor}>
                            <Text style={styles.title}>未来24小时天气预报</Text>
                            <View style={common_style.separatorWhite} />
                            <View style={styles.outer}>
                                <FlatList style={styles.faltList}
                                          showsHorizontalScrollIndicator={false}
                                          data={everyHourWeather.series}
                                          renderItem={this.renderItem.bind(this)}
                                          horizontal={true}
                                />
                            </View>
                        </View>
                        <View style={[styles.hor]}>
                            <Text style={styles.title}>生活指数</Text>
                            <View style={common_style.separatorWhite} />
                            <View style={[styles.outer,{marginBottom:0}]}>
                                <FlatList style={styles.faltList}
                                          showsHorizontalScrollIndicator={false}
                                          data={datas.result.data}
                                          renderItem={this.renderColumnItem.bind(this)}
                                          numColumns={exponentialCellViewColumn}
                                />
                            </View>
                        </View>
                        <View style={styles.scrollViewPadding}/>
                    </ScrollView>
                </Image>
            )
        }else {
            return (
                <TouchableOpacity activeOpacity={1} style={styles.detail} onPress={this.hiddenDetailView.bind(this)}>
                    <Image source={{uri:getImageName(nowWeather.data.bg)}} style={[common_style.container_view,styles.container]}></Image>
                    <BlurView
                        style={styles.detail}
                        blurType="dark"
                        blurAmount={10}
                    />
                    <View style={[styles.container,styles.detail,styles.content_view]}>

                        <Text style={styles.detail4}>
                            {this.state.showExponential.i2}
                        </Text>
                        <View style={styles.detailSepator}/>
                        <Text style={styles.detail5}>
                            {this.state.showExponential.i5}
                        </Text>
                        <Button
                            style={styles.watchedAction}
                            text={"确定"}
                            textStyle={styles.titleStyle}
                            onPress={this.hiddenDetailView.bind(this)}
                        />
                    </View>
                </TouchableOpacity>
            )
        }
    }
}

const marginTop= 10,exponentialDetailViewW = 260;
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    scrollView:{
        flex:1,
    },
    middleView:{
        flexDirection:"row",
        alignItems:'center',
    },
    icon_left_menu:{
        width:25,
        height:25
    },
    topNavigationBarStyle:{
        position:'absolute',
        marginTop:Platform.OS == 'ios' ? 20 : 0,
        zIndex:1001,  //点击事件
    },
    hor:{
        marginTop:15,
        backgroundColor:"rgba(0,0,0,0.1)"
    },
    title:{
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:10,
        color:constant.thirdTitleColor,
        fontSize:constant.titleSize
    },
    outer:{
        marginBottom:15,
    },
    faltList:{
        flex:1,
    },
    cellView:{
        width:45,
        alignItems:'center',
    },
    icon:{
        marginTop:marginTop,
        width:30,
        height:30,
    },
    text:{
        marginTop:marginTop,
        fontSize:constant.subtTitleSize,
        color:common_style.subTitle255Style.color
    },
    exponentialCellView:{
        width:constant.screen_width / exponentialCellViewColumn,
        height:60,
        justifyContent:"center",
        alignItems:"center",
    },
    exponentialIcon:{
        width:30,
        height:30,
    },
    exponentialText:{
        fontSize:15,
        color:constant.subtTitleColor,
        marginTop:1
    },
    detail:{
        position:"absolute",
        top:0,
        left:0,
        right:0,
        bottom:0,
    },
    content_view:{
        alignItems:'center',
    },

    detailSepator:{
        backgroundColor:"#fff",
        width:exponentialDetailViewW,
        height:1,
    },
    watchedAction:{
        borderRadius:6,
        borderWidth:0.6,
        borderColor:"#fff",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        width:100,
        height:40,
    },
    titleStyle:{
        fontSize:17,
        color:"#fff",
    },
    detail4:{
        marginTop:constant.screen_height / 2 - 70,
        fontSize:17,
        color:"#fff",
        marginBottom:15,
        width:exponentialDetailViewW,
        textAlign:'center',
    },
    detail5:{
        width:exponentialDetailViewW,
        fontSize:16,
        color:"#fff",
        marginTop:15,
        marginBottom:40
    },
    scrollViewPadding:{
        height:30,
    }
})