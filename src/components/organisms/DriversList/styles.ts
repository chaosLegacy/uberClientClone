import { StyleSheet } from 'react-native';
import Colors from '~/constants/Colors';

const styles = StyleSheet.create({
  confirmButton: {
    width: '100%',
    backgroundColor: Colors.black,
    padding: 15,
    alignItems: 'center',
  },
  confirmText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
});

export default styles;
