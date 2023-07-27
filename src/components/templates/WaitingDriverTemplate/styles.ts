import { StyleSheet } from 'react-native';
import Colors from '~/constants/Colors';
import { width } from '~/utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  lottieCheckMark: {
    height: 110,
    alignSelf: 'center',
  },
  lottieStatus: {
    height: 250,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  estimatedTime: {
    fontSize: 25,
    fontWeight: '600',
  },
  estimatedText: {
    fontSize: 15,
    color: Colors.darkGray,
  },
  orderIndicatorContainer: {
    paddingHorizontal: 30,
  },
  orderIndicatorLabel: {
    fontWeight: '600',
    fontSize: 16,
    marginVertical: 15,
  },
  stepIndicatorContainer: {
    marginHorizontal: -(width / 4),
  },

  driverCarDetailContainer: {
    alignItems: 'center',
  },
  driverAvatarRatingContainer: {
    position: 'relative',
    zIndex: 9,
  },
  driverDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  driverRatingContainer: {
    width: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: Colors.white,
    borderRadius: 20,
    position: 'absolute',
    paddingVertical: 4,
    paddingHorizontal: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    bottom: -11,
  },
  driverProfilePicture: {
    width: 55,
    height: 55,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  driverCarPictureContainer: {
    marginLeft: -33,
  },
  driverCarPicture: {
    height: 110,
    width: 120,
    resizeMode: 'contain',
  },
  driverCarDetails: {
    alignItems: 'center',
  },
  driverCarPlate: {
    fontSize: 25,
    fontWeight: '600',
  },
  driverCarBrand: {
    fontSize: 15,
  },
});

export default styles;
