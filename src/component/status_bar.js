/**
 * Created by ls-mac on 2017/7/9.
 */
import React, { Component } from 'react';
import {
    Platform,
    StatusBar
} from 'react-native';
//android的状态栏
export default class CustomStatusBar extends Component {

    static defaultProps = {
        hidden:false,
        barStyle:"default",
        translucent:false
    }
    render() {
        const {hidden,barStyle,translucent} = this.props;

        return(
            Platform.OS = 'android'?<StatusBar
                    hidden={hidden}
                    barStyle={barStyle}
                    translucent={translucent}
                />:null
        )

    }
}