import React from 'react';
import styles from './styles';
import { Marker, LatLng } from 'react-native-maps';
import { Image } from 'react-native';
import { getImageByCarType } from '~/utils';

type MapMarkerProps = {
  coordinate: LatLng;
  title?: string;
  car?: {
    heading?: number | null;
    type: string;
  };
};

/** A function that generates the centerOffset prop based on the anchor value */
const getCenterOffsetForAnchor = (
  anchor: { x: number; y: number },
  markerWidth: number,
  markerHeight: number,
): { x: number; y: number } => ({
  x: markerWidth * 0.5 - markerWidth * anchor.x,
  y: markerHeight * 0.5 - markerHeight * anchor.y,
});

/** Marker's width */
const MARKER_WIDTH = 60;
/** Marker's height */
const MARKER_HEIGHT = 60; // marker height

/** Customizable anchor prop - Specify your desired anchor adjustements here */
const ANCHOR = { x: 0.5, y: 0.33 }; // in my case I customized this based on marker dimensions like this: { x: 0.5, y: 1 - 10 / MARKER_HEIGHT } lifting the marker up a bit
/** auto generated centerOffset prop based on the anchor property */
const CENTEROFFSET = getCenterOffsetForAnchor(
  ANCHOR,
  MARKER_WIDTH,
  MARKER_HEIGHT,
);
const MapMarker = ({ coordinate, title, car }: MapMarkerProps) => {
  return (
    <Marker
      coordinate={coordinate}
      title={title}
      tracksViewChanges
      anchor={ANCHOR}
      centerOffset={CENTEROFFSET}>
      {car && (
        <Image
          source={getImageByCarType(car.type, true)}
          style={[
            styles.marker,
            car.heading
              ? {
                  transform: [
                    {
                      rotate: `${car.heading}deg`,
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
