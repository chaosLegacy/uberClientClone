import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  relative: {
    position: 'relative',
  },
  container: {
    padding: 10,
    height: '100%',
    marginLeft: 20,
    position: 'relative',
  },
  textInput: {
    backgroundColor: '#eee',
    marginVertical: 5,
    padding: 10,
  },
  circle: {
    width: 8,
    height: 8,
    backgroundColor: '#000',
    borderRadius: 50,
    position: 'absolute',
    top: 23,
    left: -20,
  },
  line: {
    width: 0,
    height: '36%', //80%
    backgroundColor: '#C4C4C4',
    position: 'absolute',
    top: 45,
    bottom: 0,
    left: -6.3,
  },
  square: {
    width: 8,
    height: 8,
    backgroundColor: '#000',
    position: 'absolute',
    top: 23,
    left: -20,
  },
});

export default styles;
