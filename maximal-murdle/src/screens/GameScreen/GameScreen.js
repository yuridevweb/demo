import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card} from 'react-native-paper';
import {DefaultTheme} from 'react-native-paper';
import Game from './GameComponents/Game';

function GameScreen() {
  return <Game />;
}

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: DefaultTheme.colors.background,
    alignItems: 'center',
    paddingTop: 10
  },
  card: {
    width: '90%'
  }
}); */

export default GameScreen;
