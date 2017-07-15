/**
 * Created by ls-mac on 2017/7/9.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Image
} from 'react-native';
import  * as constant from './../common/theme/constant'

//背景View
export default class BackgroundView extends Component {
    render() {
        const style = this.props.style ? this.props.style:  {};
        let viewStyle = [styles.container];
        if ( typeof viewStyle == 'Array' ) {
            viewStyle = viewStyle.concat(style);
        } else {
            viewStyle.push(style);
        }
        return (
            <Image style={viewStyle} source={{uri:'day'}}>
                {this.props.children}
            </Image>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width:constant.screen_width,
        height:constant.screen_height
    }
});
