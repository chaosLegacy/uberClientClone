import React from 'react';
import styles from './styles';
import { Marker, LatLng } from 'react-native-maps';
import { Image, ImageSourcePropType } from 'react-native';

type MapMarkerProps = {
  coordinate: LatLng;
  heading?: number;
  title?: string;
  uri?: ImageSourcePropType;
};
const MapMarker = ({ coordinate, title, uri, heading }: MapMarkerProps) => {
  return (
    <Marker coordinate={coordinate} title={title}>
      {uri && (
        <Image
          source={uri}
          style={[
            styles.marker,
            heading
              ? {
                  transform: [
                    {
                      rotate: `${heading}deg`,
                    },
                  ],
                }
              : {},
          ]}
        />
      )}
    </Marker>
  );
};

export default MapMarker;
