/**
 * Created by ls-mac on 2017/7/9.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Platform,
    Text
} from 'react-native';
import BackgroundView from './../component/bg_view'
import common_style from './../common/theme/common_style'
import NavigationBar from './../common/component/navigationBar'
import Button from './../common/component/button'
import * as constant from './../common/theme/constant'
import ScrollableTabView ,{ScrollableTabBar} from 'react-native-scrollable-tab-view'
import CustomTabBar from './../component/customTabBar'
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
        const {select_citys} = this.props;
        return (
            <BackgroundView>
                {/*自定义导航*/}


                <View style={styles.statusBar}>
                </View>
                <Button icon={{uri:"icon_left_menu"}}
                        iconStyle={styles.icon_left_menu}
                        onPress={this.leftAction.bind(this)}
                        style={styles.left_btn}
                        activeOpacity={1}/>
                <ScrollableTabView
                    style={[common_style.container_view,styles.container]}
                    initialPage={0}
                    renderTabBar={() => <CustomTabBar select_citys={select_citys}/>}
                >
                    <View tabLabel="tab-1" style={styles.tabView}>
                        <Text>News</Text>
                    </View>
                    <View tabLabel="tab-2" style={styles.tabView}>
                        <Text>Friends</Text>
                    </View>
                    <View tabLabel="tba-3" style={styles.tabView}>
                        <Text>Messenger</Text>
                    </View>

                </ScrollableTabView>


                <View ref="container" >


                </View>
            </BackgroundView>
        );
    }
}

const styles = StyleSheet.create({
    container: common_style.container_view,
    content_style:{
        flex:1
    },
    statusBar:{
        height:Platform.OS == 'ios' ? 20 : 0
    },
    left_btn:{
        position:'absolute',
        marginTop:Platform.OS == 'ios' ? 20 : 0,
        zIndex:1000,  //点击事件
        width:40,
        height:40,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    icon_left_menu:{
        width:25,
        height:25
    },
    rightNavView:{
        flex:1,
        backgroundColor:'blue'
    },
    tabView:{
        flex:1,
    }
});