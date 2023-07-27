import { StyleSheet } from 'react-native';
import Colors from '~/constants/Colors';

const styles = StyleSheet.create({
  relative: {
    position: 'relative',
  },
  container: {
    flex: 1,
    padding: 10,
    height: '100%',
    marginLeft: 20,
    position: 'relative',
  },
  inputContainer: {
    position: 'absolute',
    left: 10,
    right: 10,
    top: 50,
  },
  circle: {
    width: 8,
    height: 8,
    backgroundColor: Colors.black,
    borderRadius: 50,
    position: 'absolute',
    top: 23,
    left: -10,
  },
  line: {
    width: 1,
    height: 36,
    backgroundColor: Colors.lightGray,
    position: 'absolute',
    top: 35,
    bottom: 0,
    left: -6.3,
  },
  square: {
    width: 8,
    height: 8,
    backgroundColor: Colors.black,
    position: 'absolute',
    top: 75,
    left: -10,
  },
});

export default styles;
