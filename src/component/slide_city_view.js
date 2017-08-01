/**
 * Created by ls-mac on 2017/7/22.
 */
import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native'
import * as contanst from './../common/theme/constant'
import common_style from './../common/theme/common_style'
import Swipeout from 'react-native-swipeout'
export default class Silde_City_View extends Component {

    deleteSelect(select_city){
        const {deleteCity} = this.props;
        if (deleteCity){
            deleteCity(select_city);
        }
    }

    setDefault(){
        const {setDefaultCity,index} = this.props;
        setDefaultCity(index);
    }
    onClick()
    {
        console.log("click")
        this.props.onClick()
    }

    render() {
        const {select_city,key,defaultProp,length} = this.props;
        const {city,nowWeather} = select_city;
        if (length > 1){
            const deleteBtn = {
                text:'删除',
                backgroundColor:'red',
                type:'primary', onPress:()=>{this.deleteSelect(select_city)}
            };
            const btns = defaultProp ? [deleteBtn] :
                [{
                    text:'置顶',
                    backgroundColor:'rgb(40,50,59)',
                    onPress:()=>{this.setDefault(select_city)}
                },deleteBtn];

            return(
                    <Swipeout key={key}
                              autoClose={true}
                              style={styles.swipeoutView}
                              right={btns}  >
                        <TouchableOpacity activeOpacity={1} onPress={()=>this.onClick()} style={styles.cellView} >
                            <Text style={styles.areaStyle}>{city.area}</Text>

                            <View style={styles.rightView}>
                                <Image style={styles.temIcon} source={{"uri":nowWeather.data.icon}}/>
                                <Text style={styles.tempStyle}>{nowWeather.data.tmp_max} {"°C~"} {nowWeather.data.tmp_min +"°C"} </Text>
                            </View>
                        </TouchableOpacity>
                    </Swipeout>
            )
        }else {
            return(
                <TouchableOpacity activeOpacity={1} style={styles.cellView} onPress={()=>this.onClick()}>
                    <Text style={styles.areaStyle}>{city.area}</Text>

                    <View style={styles.rightView}>
                        <Image style={styles.temIcon} source={{"uri":nowWeather.data.icon}}/>
                        <Text style={styles.tempStyle}>{nowWeather.data.tmp_max} {"°C~"} {nowWeather.data.tmp_min +"°C"} </Text>
                    </View>
                </TouchableOpacity>
            )
        }

    }
}

const height = 45;
const styles = StyleSheet.create({
    swipeoutView:{
        backgroundColor:"rgb(45,50,55)",
        marginBottom:contanst.marginBW,
    },
    cellView:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        height:height,
        backgroundColor:"rgb(45,50,55)",
        paddingLeft:10,
        paddingRight:10
    },
    rightView:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
    },
    areaStyle:{
        color:contanst.subtTitleColor,
        fontSize:contanst.titleSize
    },
    temIcon:{
        width:25,
        height:25,
        marginRight:15,
    },
    tempStyle:{
        color:contanst.subtTitleColor,
        fontSize:contanst.titleSize
    }
})