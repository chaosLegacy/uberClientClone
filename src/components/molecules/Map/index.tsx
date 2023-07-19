import React from 'react';

import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';

import styles from './styles';
import { View } from 'react-native';

type IMapProps = {
  initialRegion?: Region;
  children?: React.ReactNode;
};

const Map = ({
  initialRegion = {
    latitude: 28.450627,
    longitude: -16.263045,
    latitudeDelta: 0.0222,
    longitudeDelta: 0.0121,
  },
  children,
}: IMapProps) => {
  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.mapView}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        initialRegion={initialRegion}>
        <>{children}</>
      </MapView>
    </View>
  );
};

export default Map;
