import React, { Component } from 'react';
import {
  Text, TextInput, View, Button, Keyboard
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import SigninForm from './SigninForm'
import Gallery from'./Gallery'

export default class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
      loginStatus: null
    };
  }

  async loginUser () {
    try {
      let loginStatus = await AsyncStorage.setItem("loggedIn", 'true')
      this.setState({isSignedIn: true})
    } catch (error) {
      console.error(error)
    }
    console.log('done')
  }

  async logoutUser () {
    try {
      this.setState({isSignedIn: false})
      await AsyncStorage.removeItem("loggedIn")
    } catch (error) {
      console.error(error)
    }
    console.log('done')
  }

  async getLoginStatus () {
    try {
      let loginStatus = await AsyncStorage.getItem("loggedIn")
      if (loginStatus === 'true') {
        this.setState({isSignedIn: true, loginStatus: loginStatus})
      } else {
        this.setState({isSignedIn: false})
      }
    } catch (error) {
      console.error(error)
    }
  }




  componentDidMount(){
    this.getLoginStatus()
  }


  render() {
    if (this.state.isSignedIn) {
      return <Gallery
          onSignout={() => this.logoutUser()}
          styles={{height: 500}}
        />;
    } else {
      return <SigninForm
        onSignin={() => this.loginUser()}
        style={{flex: 1, justifyContent: "center", alignItems: "center"}}
      />;
    }

  }
}
