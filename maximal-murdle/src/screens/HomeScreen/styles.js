import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {},

  logo: {
    resizeMode: 'stretch',
    width: 224,
    height: 92,
    alignSelf: 'center',
    margin: 30,
  },

  button: {
    backgroundColor: '#D7DADC',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutButton: {
    backgroundColor: '#bb0a1e',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    color: '#bb0a1e',
    fontSize: 20,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  signOutButtonTitle: {
    color: '#D7DADC',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  headerText: {
    color: '#D7DADC',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 'auto',
    marginTop: 10,
    fontSize: 40,
  },
  murderText: {
    color: '#bb0a1e',
  },
});
