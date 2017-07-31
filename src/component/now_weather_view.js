import React from 'react'
import {
    View,
    Image,
    Text,
    StyleSheet
} from 'react-native'

export default class Now_Weather_View extends React.Component {


    render() {
        const {nowWeather} = this.props;
        return(
            <View style={styles.topView}>
                <Image style={styles.iconStyle} source={{uri:nowWeather.data.icon}}/>
                <Text style={styles.textStyle}>{nowWeather.data.w}</Text>

                <View style={styles.tmpViewStyle}>
                    <Text style={styles.tmpStyle}>{nowWeather.data.tmp_min} {"~"} {nowWeather.data.tmp_max}</Text>
                    <Text style={styles.tmpUnit}>°C</Text>
                </View>
            </View>
        )

    }
}
const styles = StyleSheet.create({
    topView:{
        alignItems:'center',
    },
    tmpViewStyle:{
        flexDirection:"row",
        alignItems:'center',
        marginTop:15,
        marginBottom:15,
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
})