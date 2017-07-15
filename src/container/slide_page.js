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

export default class Slide_Page extends Component{

    //添加
    moreCityPush(){

        if (this.props.addCityClick){
            this.props.addCityClick();
        }
    }

    render(){
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
                                <Button text={"编辑"} textStyle={[styles.editTextStyle]} style={[styles.editButtonStyle,common_style.padding10,common_style.paddingTB]}/>
                            </View>
                        </View>

                        {/* cell view*/}
                        <View style={styles.cellView}>
                            <Text>城市选择</Text>
                        </View>

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
const height = 40;
const styles = StyleSheet.create({
    container:{
        backgroundColor:"rgba(0,0,5,0.89)"
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
        height:30,
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
        marginRight:6
    },
    editButtonStyle:{
        borderRadius:5,
        borderWidth:0.6,
        borderColor:"rgba(200,200,200,1)",
        backgroundColor:"rgba(50,50,50,0.3)",
    },
    editTextStyle:{
        color:contanst.subtTitleColor,
        fontSize:contanst.subtTitleSize
    },
    cellView:{
        height:height,
        marginBottom:contanst.marginBW,
        backgroundColor:"rgba(95,95,120,.1)"
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
    },
    addButtonStyle:{
        width:120,
        height:30,
        flexDirection:'row',
        justifyContent:"center",
        alignItems:'center',
    }


})