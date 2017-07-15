/**
 * Created by ls-mac on 2017/7/9.
 */

import React, { Component } from 'react';
import {
    Navigator
} from 'react-native-deprecated-custom-components'
import Main_Page from './container/main_page'
//application
export default class Application extends Component {
    render() {
        return (
            // 废弃了  react-native-deprecated-custom-components
            <Navigator
                initialRoute={{ component: Main_Page }}
                configureScene={(route, routeStack) => {
                    return Navigator.SceneConfigs.PushFromRight;
                }}
                renderScene={(route, navigator) => {
                    let Component = route.component;
                    return <Component {...route.params} navigator={navigator} />
                    //  上面的route.params 是为了方便后续界面间传递参数用的
                }}
            />
        );
    }
}