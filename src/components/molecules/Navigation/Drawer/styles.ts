import { StyleSheet } from 'react-native';
import Colors from '~/constants/Colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    padding: 15,
    marginTop: -4,
  },
  link: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 13.5,
    color: Colors.white,
    paddingVertical: 10,
  },
  disabled: {
    color: Colors.lightGray,
  },
  separator: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.darkGray,
    paddingVertical: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bubble: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: Colors.turquoise,
    marginLeft: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  profileInfo: {
    marginLeft: 20,
  },
  profileName: {
    fontSize: 20,
    color: Colors.white,
    marginBottom: 10,
  },
  profileRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    color: Colors.lightGray,
    marginRight: 5,
  },
});

export default styles;
