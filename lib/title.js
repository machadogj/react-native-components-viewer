import React, { Component, PropTypes } from 'react';
import { Text } from 'react-native';

export default class Title extends Component {

  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return (
      <Text
        style={ styles.title }
        { ...this.props }
      />
    );
  }
}

const styles = {
  title: {
    color: 'white',
    fontSize: 24,
    padding: 15,
    // marginTop: 10,
    alignSelf: 'stretch',
    backgroundColor: 'black'
  }
}