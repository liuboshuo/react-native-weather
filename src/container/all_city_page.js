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

export default class All_City_Page extends Component {

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
        const {navigator} = this.props;
        navigator.pop()
    }

    render() {
        return (
            <View style={[common_style.container_view]}>
                <NavigationBar leftImage={{uri:"icon_back"}}
                               leftAction={this.leftAction.bind(this)}
                               style={styles.navigationBar}/>
                <View ref="container" style={styles.content_style}>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: common_style.container_view,
    content_style:{
        flex:1,
        backgroundColor:"white"
    },
    navigationBar:{
        backgroundColor:"rgba(0,0,5,0.89)"
    }
});