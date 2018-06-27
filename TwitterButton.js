import React, { Component } from "react"
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  NativeModules,
  TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"

const { RNTwitterSignIn } = NativeModules

const Constants = {
  //Dev Parse keys
  TWITTER_COMSUMER_KEY: "Zn9b5uIxPik8MaqI6sOgxcSXJ",
  TWITTER_CONSUMER_SECRET: "cmef6UEdHahzqSi4wOOdjIviuXNWLUuYE9mz0oay0dpFnKdYzW"
}

export default class TwitterButton extends Component {
  state = {
    isLoggedIn: false
  }

  _twitterSignIn = () => {
    RNTwitterSignIn.init(Constants.TWITTER_COMSUMER_KEY, Constants.TWITTER_CONSUMER_SECRET)
    RNTwitterSignIn.logIn()
      .then(loginData => {
        console.log(loginData)
        const { authToken, authTokenSecret } = loginData
        if (authToken && authTokenSecret) {
          this.setState({
            isLoggedIn: true
          })
        }
      })
      .catch(error => {
        console.log(error)
      }
    )
  }

  handleLogout = () => {
    console.log("logout")
    RNTwitterSignIn.logOut()
    this.setState({
      isLoggedIn: false
    })
  }

  render() {
    const { isLoggedIn } = this.state
    return (
      <View style={{ flex: 1 }}>
        {isLoggedIn
          ? <TouchableOpacity onPress={this.handleLogout}>
              <Text>Log out</Text>
            </TouchableOpacity>
          : <Icon.Button name="logo-twitter" size={32} color="white" style={styles.icon} onPress={this._twitterSignIn}>
              Login with Twitter
            </Icon.Button>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 200,
    height: 50
  }
})
