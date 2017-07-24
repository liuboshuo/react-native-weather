/**
 * Created by ls-mac on 2017/7/9.
 */
import React, { Component } from 'react';
import WeatherForecast from './weather_forecast'
import common_style from './../common/theme/common_style'
import SlideMenu from 'react-native-side-menu'
import Slide_Page from './slide_page'
import All_City_Page from './all_city_page'
import citys from './../../api/all_citys.json'
import nowweather from './../../api/nowweather.json'
import detailweather from './../../api/weatherDetail.json'
import detailweather1 from './../../api/weatherDetailTwo.json'

export default class Main_Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen:false,
            select_citys:[],
            updateState:false
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
            component:All_City_Page,
            params:{
                all_citys:citys.result,
                selectCity:null,
                onSelectCity:this.onSelectCityBlock.bind(this)
            }
        })
    }
    onSelectCityBlock(selectCity){
        //检查是否存在
        let isExits = false;
        for (let index=0;index<this.state.select_citys.length;index++){
            const temp = this.state.select_citys[index];
            const city = temp.city;
            if (city.areaid == selectCity.areaid){
                isExits = true;
                break;
            }
        }
        if (!isExits){
            //获取数据
            const nowWeather = nowweather.result;
            const everyHourWeather = detailweather.result;
            const fiftheenWeather = detailweather1.result;

            this.state.select_citys.push({
                city:selectCity,
                nowWeather:nowWeather,  //现在天气
                everyHourWeather:everyHourWeather, //每小时天气
                fiftheenWeather:fiftheenWeather,   //15天天气
            })
            this.setState({updateState:!this.state.updateState})
        }

    }
    deleteCity(delete_city){
        let delete_city_index = -1;
        this.state.select_citys.map((citys,index)=>{
            if (citys.city.areaid == delete_city.city.areaid){
                delete_city_index = index
                return;
            }
        })
        if (delete_city_index > -1){
            this.state.select_citys.splice(delete_city_index,1);
            this.setState({updateState:!this.state.updateState})
        }
    }

    render() {
        return (
            <SlideMenu style={[common_style.container_view,{backgroundColor:""}]}
                       isOpen={this.state.isOpen}
                       menu={<Slide_Page
                           deleteCity={this.deleteCity.bind(this)}
                           select_citys={this.state.select_citys}
                           cellClick={this.cellClick.bind(this)}
                           addCityClick={this.addCityClick.bind(this)}
                       />}
                       onChange={(isOpen)=>this.onItemChange(isOpen)}
            >

                {/*主页*/}
                <WeatherForecast onOpen={this.onOpen.bind(this)}
                                 select_citys={this.state.select_citys}
                                 onDataLoad={()=>{console.log("onDataLoad")}}/>

            </SlideMenu>
        )
    }
}