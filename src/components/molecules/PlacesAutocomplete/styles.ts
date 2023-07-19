import { StyleSheet } from 'react-native';
import Colors from '~/constants/Colors';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: Colors.lightGray,
    padding: 5,
    borderRadius: 50,
    marginRight: 10,
  },
});

const autocompleteStyle = StyleSheet.create({
  textInputContainer: {
    height: 'auto',
    overflow: 'visible',
    zIndex: 10,
  },
});

export { styles, autocompleteStyle };
