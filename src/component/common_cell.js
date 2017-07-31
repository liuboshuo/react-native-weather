
import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native'
import common_style from './../common/theme/common_style'
import * as constant from './../common/theme/constant'
export default class Common_Middle_Cell extends Component {


    render() {
        const {icon,title,content} = this.props;
        return(
            <View style={styles.colllectView}>
                <Image source={{uri:icon}} style={styles.smallIcon}/>
                <View>
                    <Text style={common_style.subTitle255Style}>{title}</Text>
                    <Text style={common_style.subTitle255Style}>{content}</Text>
                </View>
            </View>
        )

    }
}
const styles = StyleSheet.create({
    colllectView:{
        width:constant.screen_width / 3,
        height:30,
        marginTop:10,
        marginBottom:10,
        marginRight:0,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderRightWidth:0.6,
        borderRightColor:"rgba(255,255,255,0.1)"
    },
    smallIcon:{
        width:20,
        height:20,
        marginRight:2
    },
})