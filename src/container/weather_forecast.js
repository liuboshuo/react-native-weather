/**
 * Created by ls-mac on 2017/7/9.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import BackgroundView from './../component/bg_view'
import common_style from './../common/theme/common_style'
import NavigationBar from './../common/component/navigationBar'

export default class WeatherForecast extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    componentWillMount() {

    }
    componentDidMount() {

    }

    leftAction(){
        this.props.onOpen()
    }

    render() {
        return (
            <BackgroundView>
                {/*自定义导航*/}
                <NavigationBar leftImage={{uri:"icon_left_menu"}} leftAction={this.leftAction.bind(this)}/>

                {/* content */}
                <View ref="container" style={[common_style.container_view,styles.container]}>

                </View>
            </BackgroundView>
        );
    }
}

const styles = StyleSheet.create({
    container: common_style.container_view,
    content_style:{
        flex:1
    }
});