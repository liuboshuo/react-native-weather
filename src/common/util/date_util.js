/**
 * Created by ls-mac on 2017/7/9.
 */

export function getImageName(imageName) {

   const num = new Date().getHours()
    if (num >= 6 && num <= 18){
        return imageName;
    }else {
        return imageName  + "_night";
    }

}
export function convertDayFromDate(str,i) {

    const year = str.substring(0,4);
    const month = str.substring(4,6);
    const day = parseInt(str.substring(6,8)) + i ;

    let date = new Date(year+"/" + month + "/"+day);
    return {
        date:month + "/" +convertTwoStr(day),
        week:week(date.getDay())
    };
}


export function getTimeFromDate(str ,i) {

    const year = str.substring(0,4);
    const month = str.substring(4,6);
    const day = parseInt(str.substring(6,8));
    let hour = parseInt(str.substring(8,10));
    hour+=i;
    let date = new Date(year,month,day,hour,0,0)

    return date.getHours() + "点";

}

function convertTwoStr(number) {

    if (number < 10){
        return "0" + number;
    }
    return number;

}

function week(number) {

   if (number == 0){
       return "周日";
   }else if (number == 1){
       return "周一";
   }else if (number == 2){
       return "周二";
   }else if (number == 3){
       return "周三";
   }else if (number == 4){
       return "周四";
   }else if (number == 5){
       return "周五";
   }else if (number == 6){
       return "周六";
   }
}