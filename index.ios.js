/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Linking
} from 'react-native';

import shittyQS from 'shitty-qs';

import config from './config.js';

class Belpaese extends Component {
  constructor(props) {
    super(props);

    this.state = {
      access_token: 'hoge',
    };
  }

  componentDidMount() {
    this.instagramOauth(config.client_id, config.redirect_uri, (err, access_token) => {
      if (err) console.log(err);

      this.setState({
        access_token: access_token,
      });
    });
  }

  instagramOauth(client_id, redirect_uri, callback) {
    Linking.addEventListener('url', _handleOpenURL);

    function _handleOpenURL(event) {
      // console.log(event.url);

      var [, query_string] = event.url.match(/\#(.*)/);
      var query = shittyQS(query_string);
      callback(null, query.access_token);

      Linking.removeEventListener('url', _handleOpenURL);
    }

    Linking.openURL([
      'https://api.instagram.com/oauth/authorize/',
      '?client_id=' + client_id,
      '&redirect_uri=' + redirect_uri,
      '&response_type=token',
    ].join(''));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Instagram OAuth
        </Text>
        <Text style={styles.instructions}>
          {this.state.access_token}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Belpaese', () => Belpaese);
