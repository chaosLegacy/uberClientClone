import React from 'react';
import styles from './styles';
import { Marker, LatLng } from 'react-native-maps';
import { Image, ImageSourcePropType } from 'react-native';

type MapMarkerProps = {
  coordinate: LatLng;
  title?: string;
  uri?: ImageSourcePropType;
};
const MapMarker = ({ coordinate, title, uri }: MapMarkerProps) => {
  return (
    <Marker coordinate={coordinate} title={title}>
      {uri && <Image source={uri} style={styles.marker} />}
    </Marker>
  );
};

export default MapMarker;
