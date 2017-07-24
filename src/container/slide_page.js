/**
 * Created by ls-mac on 2017/7/9.
 */
import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView
} from 'react-native'
import * as contanst from './../common/theme/constant'
import common_style from './../common/theme/common_style'
import NeWorkImage from "./../common/component/netWorkImage";
import Button from './../common/component/button'
import Slide_City_View from './../component/slide_city_view'
export default class Slide_Page extends Component{

    //添加
    moreCityPush(){

        if (this.props.addCityClick){
            this.props.addCityClick();
        }
    }

    deleteCity(delete_city){

        const {deleteCity} = this.props;

        //删除
        if (deleteCity){
            deleteCity(delete_city)
        }


    }
    render(){
        const {select_citys} = this.props;
        const citys = select_citys.map(city=>{
            return (
                <Slide_City_View select_city={city} deleteCity={this.deleteCity.bind(this)} key={city.areaid}>
                </Slide_City_View>
            )
        })
        return(
            <View style={[common_style.container_view,styles.container,]}>

                {/* *自定义导航 */}
                <View style={styles.nav}>
                    <NeWorkImage
                        uri={"majia_leftmenu_title"}
                        style={styles.navTitleStyle}
                    />
                </View>

                {/*  */}
                <ScrollView>
                    <View>

                        {/*section*/}
                        <View style={[styles.sectionViewStyle,common_style.margin10]}>
                            <View style={styles.leftViewStyle}>
                                <NeWorkImage
                                    uri={"city"}
                                    style={styles.sectionIconStyle}
                                />
                                <Text style={common_style.titleTextStyle}>我关注的城市</Text>
                            </View>
                            <View style={styles.rightViewStyle}>
                                <Button text={"编辑"} textStyle={[styles.editTextStyle]}
                                        style={[styles.editButtonStyle,common_style.padding10,common_style.paddingTB]}/>
                            </View>
                        </View>

                        {/* cell view*/}
                        {citys}

                        <View style={styles.sectionBottom}>
                            <Button text={"添加城市"}
                                    icon={{uri:"icon_add_city"}}
                                    textStyle={[styles.editTextStyle]}
                                    iconStyle={styles.addiconStyle}
                                    style={[styles.addButtonStyle,styles.editButtonStyle,common_style.padding10,common_style.paddingTB]}
                                    onPress={this.moreCityPush.bind(this)}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const height = 45;
const styles = StyleSheet.create({
    container:{
        backgroundColor:"rgb(39,44,51)"
    },


    nav:{
        height:contanst.navigation_height,
        justifyContent:"center",
        alignItems:"center",
    },
    navTitleStyle:{
        width:100,
        height:40,
        resizeMode:"contain"
    },
    sectionViewStyle:{
        flexDirection:'row',
        alignItems:"center",
        justifyContent:"space-between",
        height:40,
    },
    leftViewStyle:{
        flexDirection:'row',
        alignItems:"center",
        justifyContent:"space-between",
        height:30
    },
    rightViewStyle:{

    },
    sectionIconStyle:{
        width:20,
        height:20,
        marginRight:5
    },
    editButtonStyle:{
        borderRadius:5,
        borderWidth:1,
        borderColor:"rgba(68,73,80,1)",
        backgroundColor:"rgb(45,50,55)",
    },
    editTextStyle:{
        color:contanst.subtTitleColor,
        fontSize:contanst.subtTitleSize
    },
    addiconStyle:{
        width:20,
        height:20,
        marginRight:6
    },
    sectionBottom:{
        flexDirection:'row',
        justifyContent:"center",
        alignItems:'center',
        height:height,
        backgroundColor:"rgb(45,50,55)"
    },
    addButtonStyle:{
        width:120,
        height:35,
        flexDirection:'row',
        justifyContent:"center",
        alignItems:'center',
    }


})