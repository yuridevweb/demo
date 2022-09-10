import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { colors } from '../../../constants';

const gameStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: 'center',
  },
  title: {
    /* paddingTop: getStatusBarHeight(), */
    color: colors.grey,
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 7,
  },
  resetButton: {
    height: 40,
    width: 80,
    backgroundColor: colors.darkgrey,
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 5,
  },
  homeButton: {
    backgroundColor: '#bb0a1e',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeButtonTitle: {
    color: '#D7DADC',
    fontSize: 16,
    fontWeight: 'bold',
  },

  resetText: { color: colors.lightgrey, textAlign: 'center' },

  map: {
    alignSelf: 'stretch',
    marginVertical: 20,
  },
  row: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cell: {
    borderWidth: 3,
    borderColor: colors.grey,
    flex: 1,
    maxWidth: 70,
    aspectRatio: 1,
    margin: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    color: colors.lightgrey,
    fontWeight: 'bold',
    fontSize: 28,
  },
});

export default gameStyles;
