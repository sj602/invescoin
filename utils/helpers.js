import { Notifications, Permissions } from 'expo';

export const minus100AndFixed = number => {
  if(number > 100){ //for some reason, kimchiPremium percent(kpPercent) is displayed added 100 sometimes
    return (number-100).toFixed(2); //19.22
    console.log('100보다 크다')
  }else {
    return number.toFixed(2);
    console.log('100보다 작다')
  }
}

export const changeFixedDecimalPoints = number => {
  number = number.toString(); // ex: 19.223 -> '19.223'
  if(number.indexOf('.') !== -1 && number.split('.')[1].length > 2){ //'19.223' => ['19', '223'] -> '223'.length
    return Number(number).toFixed(2); //19.22
  }else {
    return Number(number);
  }
}

export const addComma3letters = data => {
  return data = data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export const getStartDate = () => {
  // default: get the first date of this year
  let date = new Date();
  date = date.toISOString();
  let year = date.slice(2,4);
  let month = '01';
  let day = '01';
  return year + month + day;
}

export const getEndDate = () => {
  // default: get today
  let date = new Date();
  date = date.toISOString();
  let year = date.slice(2,4);
  let month = date.slice(5,7);
  let day = date.slice(8,10);
  return year + month + day;
}

const NOTIFICATION_KEY = 'Invescoin:notifications'

export function clearLocalNotifications() {

}

function createNotification() {
  return {
    title: '시세 정보 알림',
    body: '가격 도달',
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification() {

}
