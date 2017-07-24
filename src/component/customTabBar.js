/**
 * Created by ls-mac on 2017/7/23.
 */
import React , {Component} from 'react'
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native'
import * as constant from './../common/theme/constant'
import Swiper from 'react-native-swiper'

export default class CustomTabBar extends Component
{
    render(){

        const {select_citys,tabs} = this.props;
        const swiper = tabs.map((tab, i)=>{
            return (
                <TouchableOpacity key={i} style={styles.item}>
                    <Text>{tab}</Text>
                </TouchableOpacity>
            )
        })
        return (
            <View style={styles.tabBar}>
                <Swiper height={200}
                        loop={true}
                        index={0}
                        autoplay={true}
                        width={100}
                >
                    {swiper}
                </Swiper>


            </View>
        )
    }
}


const styles = StyleSheet.create({
    tabBar:{
        height:constant.navigationNoStatusHeight_height,
        marginLeft:60,
        marginRight:60,
        backgroundColor:'orange'
    },
    item:{
        height:constant.navigationNoStatusHeight_height,
        width:(constant.screen_width - 120 ) / 3,
        alignItems:'center',
        justifyContent:'center'
    }

})