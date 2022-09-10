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
  headerText: {
    color: '#D7DADC',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 'auto',
    marginTop: 10,
    fontSize: 40,
  },
  logo: {
    resizeMode: 'stretch',
    width: 224,
    height: 92,
    alignSelf: 'center',
    margin: 30,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
  button: {
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
    color: '#D7DADC',
    fontSize: 20,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  footerView: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: 'white',
  },
  footerLink: {
    color: '#bb0a1e',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
