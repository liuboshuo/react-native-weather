/**
 * Created by ls-mac on 2017/7/9.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Platform,
    Text,
    ScrollView
} from 'react-native';
import BackgroundView from './../component/bg_view'
import common_style from './../common/theme/common_style'
import NavigationBar from './../common/component/navigationBar'
import Button from './../common/component/button'
import * as constant from './../common/theme/constant'
import CustomTabBar from './../component/customTabBar'
import City_Weather_Page from "./city_weather_page";

export default class WeatherForecast extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            page:0
        };
    }

    componentWillMount() {

    }
    componentDidMount() {

    }

    leftAction(){
        this.props.onOpen()
    }
    onChangePage(page){
        this.scrollView.scrollResponderScrollTo({x:page*constant.screen_width,y:0,animated:true})
    }
    onAnimationEnd(e){
        const page = Math.floor(e.nativeEvent.contentOffset.x / constant.screen_width)
        if (page != this.state.page){
            this.setState({page:page})
        }

    }
    render() {
        const {select_citys} = this.props;
        const tabs= [];
        const views = select_citys.map((item,index)=>{
            tabs.push(item.city.area);
            return (
                <City_Weather_Page key={ (index+1)*100}
                                   city={item.city}
                                   nowWeather={item.nowWeather}
                                   everyHourWeather={item.everyHourWeather}
                                   fiftheenWeather={item.fiftheenWeather}
                                   pushWeatherToday={this.props.pushWeatherToday}
                />
            )
        })
        return (
            <BackgroundView>
                {/*自定义导航*/}
                <Button icon={{uri:"icon_left_menu"}}
                        iconStyle={styles.icon_left_menu}
                        onPress={this.leftAction.bind(this)}
                        style={styles.left_btn}
                        activeOpacity={1}/>

                {/* 导航 */}
                <CustomTabBar style={styles.topNavigationBarStyle} tabs={tabs} selectIndex={this.state.page} onChangePage={(page)=>this.onChangePage(page)}/>

                <ScrollView ref={ref=>this.scrollView = ref} style={styles.container}
                            horizontal={true}
                            pagingEnabled={true}
                            onMomentumScrollEnd={(event)=>this.onAnimationEnd(event)}
                            bounces={false}
                            showsHorizontalScrollIndicator={false}
                >

                    {views}

                </ScrollView>

            </BackgroundView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    content_style:{
        flex:1,
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
    topNavigationBarStyle:{
        position:'absolute',
        marginTop:Platform.OS == 'ios' ? 20 : 0,
        // backgroundColor:"red",
        zIndex:1001,  //点击事件
    }
});