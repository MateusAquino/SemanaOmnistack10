import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview'

function Profile({ navigation }){
    const github = navigation.getParam('github');
    return <WebView style={{ flex:1 }} source={{ uri: `https://github.com/${github}`}}/>;
}

export default Profile;