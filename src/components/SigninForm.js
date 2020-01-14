import React, { Component } from 'react';
import {
  Text, TextInput, View, Button, Keyboard, Image, StyleSheet
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';


export default class SigninForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this._submitForm = this._submitForm.bind(this);
  }

  _submitForm() {
    return fetch('https://www.timetopet.com/api/interview/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
    .then((response) => ({status: response.status, json: response.json()}))
    .then((response) => {
      if (response.status === 200) {
        this.props.onSignin()
      } else if (response.status === 401) {
        alert('Invalid email or password.')
      }
    })
    .catch((error) => {
      alert('Something went wrong. Please try again.')
      console.error(error);
    })
  }

  render() {
    return (
      <View style={styles.form}>
        <Image source={require('../../public/images/acmeLogo.png')} style={styles.logo}/>
        <TextInput
          style={styles.input}
          placeholder="Enter email address (e.g. hello@world.com"
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
          onBlur={Keyboard.dismiss}
          autoFocus={true}
          autoCompleteType="email"
          textContentType="emailAddress"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          onBlur={Keyboard.dismiss}
          secureTextEntry={true}
          autoCompleteType="password"
          textContentType="password"

        />
        <Button
          title="Sign In"
          disabled={!this.state.email || !this.state.password}
          onPress={this._submitForm}
          style={styles.button}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  form: {
    flex: 1,
    margin: 50
  },
  logo: {
    width: 235,
    height: 105,
    margin: 10,
    alignSelf: 'center',
    marginTop: 100
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10
  },
  button: {
    marginTop: 50
  }
})
