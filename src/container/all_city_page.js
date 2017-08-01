/**
 * Created by ls-mac on 2017/7/9.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    FlatList,
    Animated,
} from 'react-native';
import common_style from './../common/theme/common_style'
import NavigationBar from './../common/component/navigationBar'
import citys from './../../api/all_citys.json'
import * as contanst from './../common/theme/constant'
import City_Page_NavigationBar from './../component/city_page_navigationBar'
import Button from "../common/component/button";
import Main_Page from './main_page'
export default class All_City_Page extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            citys : [],
            animatedValue:new Animated.Value(0),
            isSearch:false,
            searchCitys:[]
        };
    }
    componentDidMount() {
        let {selectCity,all_citys} =this.props;
        const allcitys = all_citys;
        const targetCityNames = [];
        const targetDatas = [];
        allcitys.map(city=>{
            if ((!selectCity && targetCityNames.indexOf(city.province) == -1) || (selectCity && selectCity.province == city.province) ){
                //很重要virtualizedList missing key for item
                city['key']=city.areaid
                targetDatas.push(city)
                selectCity ? null : targetCityNames.push(city.province)
            }
        })
        this.setState({
            citys:targetDatas
        });
    }
    pop(){
        const {navigator} = this.props;
        navigator.pop()
    }
    cityDetal(select_city){
        const {navigator,all_citys,selectCity,onSelectCity} = this.props;
        if (selectCity){
            //选择城市完成
            onSelectCity(select_city)
            //跳转到指定路由的页面
            navigator.popToTop()
        }else {
            navigator.push({
                component:All_City_Page,
                params:{
                    all_citys:all_citys,
                    selectCity:select_city,
                    onSelectCity:onSelectCity
                }
            })
        }
    }
    searchCityDetail(select_city){

        const {navigator,onSelectCity} = this.props;
            //选择城市完成
            onSelectCity(select_city)
            //跳转到指定路由的页面
        navigator.popToTop()

    }
    renderItem(data){
        const {selectCity} = this.props;
        return(<Button key={data.item.areaid} text={selectCity ? data.item.area : data.item.province} textStyle={styles.cityText} style={styles.cityBtn} onPress={this.cityDetal.bind(this,data.item)}/>)
    }
    header(){
        const {selectCity} = this.props;
        return (
            <View style={styles.headerView}>
                <Text style={styles.headerText}>{selectCity ? selectCity.province : "国内城市"}</Text>
            </View>
        )
    }
    cancelSearch(){
        Animated.timing(this.state.animatedValue,{
            toValue:0,
            duration:100
        }).start(()=>{
            this.setState({isSearch:false,searchCitys:[]})
        });
    }
    startSearch(){
        Animated.timing(this.state.animatedValue,{
            toValue:1,
            duration:100
        }).start();
        this.setState({isSearch:true})
    }
    onChangeText(text){
        const {all_citys} = this.props;
        const searchData = [];
        all_citys.map(temp=>{
            if (temp.area.indexOf(text) != -1){
                searchData.push(temp);
            }
        })
        this.setState({
            searchCitys:searchData
        })
    }
    renderSearchItem(city){
        return (
            <TouchableOpacity style={styles.searchCellContent} onPress={this.searchCityDetail.bind(this,city.item)}>
                <Text style={[common_style.subTitleTextStyle,styles.subTitleTextStyle]}>{city.item.area}</Text>
            </TouchableOpacity>
        )
    }
    separator(){
        return (<View style={styles.separator}></View>)
    }
    render() {
        const {selectCity} = this.props;
        return (
            <View style={[common_style.container_view,styles.container]}>

                {selectCity?
                    <Image style={styles.topNavigation} source={{uri:'day'}}>
                        <NavigationBar
                            title={"添加城市"}
                            leftImage={{uri:"icon_back"}}
                            leftAction={this.pop.bind(this)}
                            style={styles.navigationBar}/>
                    </Image>
                   :
                    <City_Page_NavigationBar pop={this.pop.bind(this)}
                                             cancelSearch={this.cancelSearch.bind(this)}
                                             startSearch={this.startSearch.bind(this) }
                                             onChangeText={this.onChangeText.bind(this)}/>
                }
                <Animated.View style={[styles.content_style,{
                    height:this.state.animatedValue.interpolate({
                        inputRange:[0,1],
                        outputRange:[contanst.screen_height - contanst.navigation_height - contanst.navigationNoStatusHeight_height,contanst.screen_height - contanst.navigation_height]
                    }),
                    top:this.state.animatedValue.interpolate({
                        inputRange:[0,1],
                        outputRange:[0, -1 * contanst.navigation_height]
                    }),
                }]}>
                    {this.state.isSearch
                        ?
                        <View style={styles.content_view_style}>

                            <FlatList
                                      style={{flex:1}}
                                      data={this.state.searchCitys}
                                      renderItem={this.renderSearchItem.bind(this)}
                                      ItemSeparatorComponent={this.separator.bind(this)}
                            />

                        </View>
                        :
                        <ScrollView ref="container" style={styles.content_view_style}>

                            <FlatList ref={"flat"}
                                      style={[styles.flatList,]}
                                      data={this.state.citys}
                                      ListHeaderComponent={this.header.bind(this)}
                                      renderItem={this.renderItem.bind(this)}
                                      numColumns={4}
                                      columnWrapperStyle={{}}
                            />
                        </ScrollView>
                    }

                </Animated.View>

            </View>
        );
    }
}

const margin = 15;

const styles = StyleSheet.create({
    container: {
        backgroundColor:"#fff"
    },
    topNavigation:{
        width:contanst.screen_width,
        height:contanst.navigation_height
    },
    content_style:{
        width:contanst.screen_width,
    },
    content_view_style:{
        flex:1,
        backgroundColor:"#eee"
    },
    flatList:{
        flex:1,
        paddingLeft:margin,
        paddingRight:9,
        marginTop:margin,
    },
    headerView:{
        height:30,
    },
    headerText:{
        fontSize:17,
        color:"#666"
    },
    cityText:{
        fontSize:16,
        color:"#666"
    },
    cityBtn:{
        width:(contanst.screen_width - margin - 9 - 4 * 6) / 4,
        height:40,
        backgroundColor:"#fff",
        flexDirection:'row',
        justifyContent:"center",
        alignItems:'center',
        marginRight:6,
        marginBottom:10,
    },
    searchCellContent:{
        backgroundColor:"#fff",
        flexDirection:"row",
        alignItems:"center",
        height:30,
    },
    subTitleTextStyle:{
        color:'rgb(130,130,130)',
        fontSize:16,
        paddingLeft:15,
        paddingRight:10,
    },
    separator:{
        height:1,
        backgroundColor:'#eee',
    }

});