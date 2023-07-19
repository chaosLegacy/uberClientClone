import React from 'react';
import Map from '~/components/molecules/Map';
import DriversList from '~/components/organisms/DriversList';
import MapDirections from '~/components/molecules/MapDirections';
import MapMarker from '~/components/molecules/MapMarker';
import Container from '~/components/atoms/Container';

const OrderScreen = () => {
  const origin = {
    latitude: 28.450627,
    longitude: -16.263045,
  };
  const destination = {
    latitude: 28.460127,
    longitude: -16.269045,
  };
  return (
    <Container>
      <Map>
        <MapDirections origin={origin} destination={destination} />
        <MapMarker coordinate={origin} title="Origin" />
        <MapMarker coordinate={destination} title="Destination" />
      </Map>
      <DriversList />
    </Container>
  );
};

export default OrderScreen;
