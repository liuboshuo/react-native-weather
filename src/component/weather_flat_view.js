import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Text,
    Image
} from 'react-native';
import common_style from './../common/theme/common_style'
import {convertDayFromDate} from './../common/util/date_util'
import * as constant from './../common/theme/constant'
class Weather_FlatList extends Component {

    constructor(props){
        super(props);
        const {fiftheenWeather} = this.props;
        this.startTime = fiftheenWeather.startTime;
    }
    renderItem(item){
        const date = convertDayFromDate(this.startTime,item.index);
        return (
            <View style={styles.contentView}>
                <Text style={[common_style.subTitle255Style,styles.textWidth]}>{date.date}{"   "}{date.week}</Text>
                <View style={[styles.middleView,styles.textWidth]}>
                    <Image style={styles.icon} source={{uri:item.item.icon}}></Image>
                    <Text style={common_style.subTitle255Style}>{item.item.w_am}</Text>
                </View>
                <Text style={[common_style.subTitle255Style,styles.textWidth,{textAlign:'right'}]}>{item.item.tmp_min}{'~'}{item.item.tmp_max}{"°C"}</Text>
            </View>
        )
    }
    render() {
        const {fiftheenWeather} = this.props;
        const items = fiftheenWeather.series;
        return(
            <View style={styles.container}>
                <FlatList style={styles.flatList}
                          data={items}
                          renderItem={this.renderItem.bind(this)}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    flatList:{
        flex:1
    },
    contentView:{
        height:40,
        flexDirection:"row",
        paddingLeft:common_style.padding15.paddingLeft,
        paddingRight:common_style.padding15.paddingRight,
        justifyContent:"flex-start",
        alignItems:'center'
    },
    icon:{
        marginRight:common_style.padding10.paddingLeft - 5,
        width:30,
        height:30,
    },
    middleView:{
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:common_style.padding15.paddingLeft
    },
    textWidth:{
        width:(constant.screen_width - common_style.padding15.paddingLeft - common_style.padding15.paddingRight) / 3
    }

})
export default Weather_FlatList;