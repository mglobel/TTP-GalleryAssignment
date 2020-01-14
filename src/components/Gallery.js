import React, { Component } from 'react';
import {
  Text, View, Button, FlatList, Image, StyleSheet
} from 'react-native';

import GalleryTray from './GalleryTray'

export default class Gallery extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      isLoadingError: false,
      images: {}
    }
  }

  async getImages() {
    return fetch('https://www.timetopet.com/api/interview/images', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        isLoadingError: !("images" in responseJson),
        images: responseJson.images
      }, function(){
      })
    })
    .catch((error) =>{
      console.log('error!')
      this.setState({isLoadingError: true})
      console.error(error);
    })
  }

  componentDidMount() {
    this.getImages()
  }

  render() {
    if (!this.state.isLoading && this.state.images) {
      return (
        <View>
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

          <View style={{flex: 1, paddingTop:20}}>
            <FlatList
              data={this.state.images.map(image => {return {key: image}})}
              renderItem={( {item}) =>
                <Image source={{uri: item.key}} style={styles.image} />
              }
              numColumns={3}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      );
    } else if (this.state.isLoadingError) {
      return (
        <View>
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
          <Text style={{textAlign: 'center', marginTop: 50}}>There was an error loading the gallery, please reload.</Text>
        </View>
      )
    } else {
      return (
        <View>
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
          <Text style={{flex: 1, alignItems: 'center'}}>Gallery is loading...</Text>
        </View>
      );
    }
  }
}


const styles = StyleSheet.create({
  image: {
    width: 125,
    height: 125,
    margin: 5
  }
})
