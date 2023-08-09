import { StyleSheet } from 'react-native';
import Colors from '~/constants/Colors';

const styles = StyleSheet.create({
  inputBox: {
    backgroundColor: Colors.lightGray,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.darkGray,
  },
  timeContainer: {
    flexDirection: 'row',
    width: 100,
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 50,
  },
  row: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.lightGray,
  },
  iconContainer: {
    backgroundColor: Colors.darkGray,
    padding: 10,
    borderRadius: 25,
  },
  destinationText: {
    marginLeft: 10,
    fontWeight: '500',
    fontSize: 16,
  },
});

export default styles;
