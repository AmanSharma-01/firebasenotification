/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import { 
  View,
  Text,
  Platform,
} from 'react-native';
import firebase from 'react-native-firebase';


const App = () => {

  useEffect(() => {
    createChannel();
    notificationListner();
  },[])

  // create channel
    const createChannel = () => {
      const channel = new firebase.notifications.Android.Channel(
        'channelId',
        'channelName',
        firebase.notifications.Android.Importance.Max,
      ).setDescription('Description')

      firebase.notifications().android.createChannel(channel);
    };


    // foreground notification

    const notificationListner = () => {
      firebase.notifications().onNotification((notification) => {
        if(Platform.OS === 'android') {
          const localNotification = new firebase.notifications.Notification({
            sound: 'default',
            show_in_foreground: true,
          })
            .setNotificationId(notification.notificationId)
            .setTitle(notification.title)
            .setSubtitle(notification.subtitle)
            .setBody(notification.body)
            .setData(notification.data)
            .android.setChannelId('channelId')
            .android.setPriority(firebase.notifications.Android.Priority.High)

            firebase.notifications().displayNotification(localNotification)
            .catch((err) => {
              console.log(err)
            })
        }
      })
    }

  return (
    <>
      <View>
        <Text>
          App
        </Text>
      </View>
    </>
  );
};

export default App;
