import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {},
  headerView: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    height: 50,
  },
  logo: {
    resizeMode: 'stretch',
    width: 224,
    height: 92,
    alignSelf: 'center',
    margin: 30,
  },
  headerText: {
    marginLeft: 20,
    marginRight: 20,
    fontSize: 32,
    color: 'white',
    alignSelf: 'center',
  },
  paragraphText: {
    marginLeft: 20,
    marginRight: 20,
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
  },
  murderText: {
    color: '#bb0a1e',
  },
  primaryText: { color: '#538D4E' },
  secondaryText: { color: '#B59F3B' },
});
