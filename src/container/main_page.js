/**
 * Created by ls-mac on 2017/7/9.
 */
import React, { Component } from 'react';
import WeatherForecast from './weather_forecast'
import common_style from './../common/theme/common_style'
import SlideMenu from 'react-native-side-menu'
import Slide_Page from './slide_page'
import All_City_Page from './all_city_page'

export default class Main_Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen:false,
        }
    }
    onItemChange(isOpen){
        this.setState({
            isOpen:isOpen
        })
    }
    cellClick(item){
        this.setState({
            isOpen:false,
        });
    }
    onOpen(){
        this.setState({
            isOpen:!this.state.isOpen
        })
    }
    addCityClick(){
        const {navigator} = this.props;
        navigator.push({
            component:All_City_Page
        })
    }
    render() {
        return (
            <SlideMenu style={[common_style.container_view,{backgroundColor:""}]}
                       isOpen={this.state.isOpen}
                       menu={<Slide_Page
                           cellClick={this.cellClick.bind(this)}
                           addCityClick={this.addCityClick.bind(this)}
                       />}
                       onChange={(isOpen)=>this.onItemChange(isOpen)}
            >

                {/*主页*/}
                <WeatherForecast onOpen={this.onOpen.bind(this)}/>

            </SlideMenu>
        )
    }
}