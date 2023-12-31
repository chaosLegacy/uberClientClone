import React from 'react';
import {
  GooglePlacesAutocomplete,
  GooglePlaceDetail,
} from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_API_KEY } from '@env';
//import { StyleProp, TextStyle } from 'react-native';
import PlacesRow from './PlacesRow';
import GlobalStyles from '~/constants/GlobalStyles';
import { autocompleteStyle } from './styles';

type PlacesAutocompleteProps = {
  placeholder: string;
  onPress: (details: GooglePlaceDetail | null) => void;
  //textInputStyle: StyleProp<TextStyle>;
};

const homePlace = {
  description: 'Home',
  geometry: { location: { lat: 47.2056872, lng: -1.5308386 } },
};
const workPlace = {
  description: 'Work',
  geometry: { location: { lat: 47.210762, lng: -1.5720947 } },
};

const PlacesAutocomplete = ({
  placeholder,
  onPress,
}: PlacesAutocompleteProps) => {
  return (
    <GooglePlacesAutocomplete
      placeholder={placeholder}
      onPress={(data, details = null) => {
        onPress(details);
        console.log('===details: ', details?.formatted_address + '===');
        console.log('===data: ', data.description + '===');
      }}
      styles={{
        textInput: GlobalStyles.textInput,
        textInputContainer: autocompleteStyle.textInputContainer,
      }}
      query={{
        key: GOOGLE_MAPS_API_KEY,
        language: 'en',
      }}
      fetchDetails
      enablePoweredByContainer={false}
      renderRow={data => <PlacesRow data={data} />}
      //renderDescription={data => data.description}
      predefinedPlaces={[homePlace, workPlace]}
      currentLocation
      currentLocationLabel="Current location"
    />
  );
};

export default PlacesAutocomplete;
