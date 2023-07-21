import React from 'react';
import Map from '~/components/molecules/Map';
import MessageBox from '~/components/atoms/MessageBox';
import Search from '~/components/molecules/Search';
import carsList from 'assets/data/cars';
import { Car } from '~/types';
import MapMarker from '~/components/molecules/MapMarker';
import Container from '~/components/atoms/Container';

const HomeScreen = () => {
  return (
    <Container>
      <Map>
        {carsList.map((car: Car) => (
          <MapMarker
            key={car.id}
            coordinate={{
              latitude: car.latitude,
              longitude: car.longitude,
            }}
            uri={car.uri}
            heading={car.heading}
          />
        ))}
      </Map>
      <MessageBox />
      <Search />
    </Container>
  );
};

export default HomeScreen;
