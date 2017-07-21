/**
 * Created by ls-mac on 2017/7/9.
 */
import React from 'react'
import {
    Dimensions,
    Platform,
} from 'react-native'

export const common_theme_color = "";

//屏幕宽
export const screen_width = Dimensions.get("window").width;

//屏幕高
export const screen_height = Dimensions.get("window").height;

//导航的高
export const navigation_height = Platform.OS == 'android' ? 51 : 64;

export const statusBar = Platform.OS == 'android' ? 0 : 20;

export const navigationNoStatusHeight_height = Platform.OS == 'android' ? 51 : 44;


//减去导航的实际的页面的高度
export const bg_view_height = screen_height - navigation_height;

// 利用 marginBottom 的分割线
export const marginBW= 0.6;

//大标题
export const titleSize = 15;
export const titleColor = "rgba(100,100,100,0.6)";

//自标题的大小
export const subtTitleSize = 14;
export const subtTitleColor = "rgba(255,255,255,1)";

//三级标题
export const thirdTitleSize = 13;
export const thirdTitleColor = "rgba(255,255,255,1)";
