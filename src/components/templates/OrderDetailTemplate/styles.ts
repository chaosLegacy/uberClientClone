import { StyleSheet } from 'react-native';
import Colors from '~/constants/Colors';
import { height } from '~/utils';

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    height: height - 290,
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  driverStatusText: {
    fontWeight: '700',
    fontSize: 18,
  },
  durationContainer: {
    backgroundColor: Colors.blue,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  durationText: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.lightGray,
  },
  durationFormat: {
    color: Colors.lightGray,
    fontSize: 14,
  },
  orderBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  driverCarVisual: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  driverAvatarCar: {
    alignItems: 'center',
    zIndex: 9,
  },
  driverProfilePicture: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Colors.white,
  },
  driverRating: {
    width: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: Colors.white,
    borderRadius: 20,
    position: 'absolute',
    paddingVertical: 3,
    paddingHorizontal: 4,
    // shadowColor: Colors.black,
    // shadowOffset: { width: 2, height: 4 },
    // shadowOpacity: 0.3,
    // shadowRadius: 3,
    bottom: -2,
  },
  driverCarPictureContainer: {
    marginLeft: -45,
  },
  driverCarPicture: {
    height: 80,
    width: 140,
    resizeMode: 'contain',
  },
  driverCarDetail: {
    alignItems: 'flex-end',
  },
  driverCarNameText: {
    color: Colors.gray,
    fontWeight: '500',
    marginBottom: 5,
    fontSize: 15,
  },
  driverCarPlateText: {
    color: Colors.darkGray,
    fontSize: 25,
    fontWeight: '700',
  },
  driverCarBrandText: {
    fontSize: 15,
    color: Colors.black,
    fontWeight: '500',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputMessage: {
    height: 40,
    margin: 12,
    padding: 10,
    backgroundColor: Colors.lightGray,
    borderRadius: 20,
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginRight: 10,
  },
  button: {
    backgroundColor: Colors.lightGray,
    borderRadius: 50,
    padding: 11,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButton: {
    fontSize: 19,
  },
});

export default styles;
