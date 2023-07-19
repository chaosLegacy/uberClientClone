import { View } from 'react-native';
import React from 'react';
import Map from '~/components/molecules/Map';
import MessageBox from '~/components/atoms/MessageBox';
import Search from '~/components/molecules/Search';
import carsList from 'assets/data/cars';
import { Car } from '~/types';
import MapMarker from '~/components/molecules/MapMarker';

const index = () => {
  const initialRegion = {
    latitude: 28.450627,
    longitude: -16.263045,
    latitudeDelta: 0.0222,
    longitudeDelta: 0.0121,
  };
  return (
    <View>
      <Map initialRegion={initialRegion}>
        {carsList.map((car: Car) => (
          <MapMarker key={car.id} coordinate={initialRegion} uri={car.uri} />
        ))}
      </Map>
      <MessageBox />
      <Search />
    </View>
  );
};

export default index;
