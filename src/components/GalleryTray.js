import React, { Component } from 'react';
import {
  View, Button, Image, StyleSheet
} from 'react-native';

export default class GalleryTray extends Component {

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'space-between', flexDirection: 'row', margin: 5}}>
        <Image
          source={require('../../public/images/acmeLogo.png')}
          style={{width: 90, height: 50, alignContent: 'flex-start'}}
        />
        <Button
          title="Reload Gallery"
          onPress={() => {this.getImages()}}
          style={{height: 20}}
        />
        <Button
          title="Sign Out"
          onPress={() => {this.props.onSignout()}}
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({

})
