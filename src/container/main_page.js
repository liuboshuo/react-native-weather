/**
 * Created by ls-mac on 2017/7/9.
 */
import React, { Component } from 'react';
import WeatherForecast from './weather_forecast'
import common_style from './../common/theme/common_style'
import Slide_Page from './slide_page'
import All_City_Page from './all_city_page'
import citys from './../../api/all_citys.json'
import nowweather from './../../api/nowweather.json'
import detailweather from './../../api/weatherDetail.json'
import detailweather1 from './../../api/weatherDetailTwo.json'
import City_Weather_Hour_page from './city_weather_hour_page'
import Drawer from 'react-native-drawer'


export default class Main_Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen:false,
            select_citys:[],
            selectIndex:0,
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

            this.state.select_citys.unshift({
                city:selectCity,
                nowWeather:nowWeather,  //现在天气
                everyHourWeather:everyHourWeather, //每小时天气
                fiftheenWeather:fiftheenWeather,   //15天天气
            })
            this.setState({updateState:!this.state.updateState})
        }
    }
    setDefaultCity(index){
        const deleteData =this.state.select_citys.splice(index,1);
        this.state.select_citys.unshift(deleteData[0]);
        this.setState({updateState:!this.state.updateState})
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

    componentDidMount(){
        for (let i = 0;i<1;i++){
            const city = citys.result[Math.floor(Math.random() * 100)]
            const nowWeather = nowweather.result;
            const everyHourWeather = detailweather.result;
            const fiftheenWeather = detailweather1.result;
            this.state.select_citys.unshift({
                city:city,
                nowWeather:nowWeather,  //现在天气
                everyHourWeather:everyHourWeather, //每小时天气
                fiftheenWeather:fiftheenWeather,   //15天天气
            })
        }
        this.setState({updateState:!this.state.updateState})
    }
    pushWeatherToday(everyHourWeather,nowWeather,fiftheenWeather,city){
        const {navigator} = this.props;
        navigator.push({
            component:City_Weather_Hour_page,
            params:{
                everyHourWeather:everyHourWeather,
                nowWeather:nowWeather,
                fiftheenWeather:fiftheenWeather,
                city:city
            }
        })
        // console.log(everyHourWeather,nowWeather)
    }
    onClick(index){
        this.closeDrawer();
        if (index != this.state.selectIndex){
            this.setState({selectIndex:index})
        }
    }
    closeDrawer = () => {
        this._drawer.close()
    };
    openDrawer = () => {
        this._drawer.open()
    };
    onOpen(){
        if(this.state.isOpen){
            this.closeDrawer()
        }else {
            this.openDrawer()
        }
    }
    render() {
        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                type="static"
                content={
                    <Slide_Page
                    deleteCity={this.deleteCity.bind(this)}
                    select_citys={this.state.select_citys}
                    cellClick={this.cellClick.bind(this)}
                    addCityClick={this.addCityClick.bind(this)}
                    setDefaultCity={this.setDefaultCity.bind(this)}
                    closeDrawer={this.closeDrawer}
                    onClick={this.onClick.bind(this)}
                    />
                }
                acceptDoubleTap
                styles={{main: {shadowColor: '#000000', shadowOpacity: 0.3, shadowRadius: 15}}}
                onOpen={()=>{
                    this.setState({
                        isOpen:true
                    })}
                }
                onClose={()=>{
                    this.setState({
                        isOpen:false
                    })
                }}
                captureGestures={false}
                tweenDuration={100}
                panThreshold={0.08}
                disabled={false}
                openDrawerOffset={(viewport) => {
                    return 100
                }}
                closedDrawerOffset={() => 0}
                panOpenMask={0.2}
                negotiatePan
            >
                <WeatherForecast onOpen={this.onOpen.bind(this)}
                                 selectIndex={this.state.selectIndex}
                                 select_citys={this.state.select_citys}
                    // onDataLoad={()=>{console.log("onDataLoad")}}
                                 pushWeatherToday={this.pushWeatherToday.bind(this)}/>
            </Drawer>
        )
    }
}