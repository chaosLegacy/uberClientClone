import React from 'react';
import {
  GooglePlacesAutocomplete,
  GooglePlaceData,
} from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_API_KEY } from '@env';
import { StyleProp, TextStyle } from 'react-native';

type PlacesAutocompleteProps = {
  placeholder: string;
  onPress: (data: GooglePlaceData) => void;
  textInputStyle: StyleProp<TextStyle>;
};
const PlacesAutocomplete = ({
  placeholder,
  onPress,
  textInputStyle,
}: PlacesAutocompleteProps) => {
  return (
    <GooglePlacesAutocomplete
      placeholder={placeholder}
      onPress={(data, details = null) => {
        onPress(data);
        console.log(data, details);
      }}
      fetchDetails
      styles={{
        textInput: textInputStyle,
      }}
      query={{
        key: GOOGLE_MAPS_API_KEY,
        language: 'en',
      }}
    />
  );
};

export default PlacesAutocomplete;
