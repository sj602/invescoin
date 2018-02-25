import { Notifications, Permissions } from 'expo';

export const addComma3letters = data => {
  return data = data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
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
