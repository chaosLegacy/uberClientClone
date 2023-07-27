import React, { useState, useEffect } from 'react';
import Map from '~/components/molecules/Map';
import MessageBox from '~/components/atoms/MessageBox';
import Search from '~/components/molecules/Search';
import { Car } from '~/API';
import MapMarker from '~/components/molecules/MapMarker';
import Container from '~/components/atoms/Container';
import { _getCarsList } from '~/services/car';

const HomeTemplate = () => {
  const [carsList, setCarsList] = useState<Car[]>([]);
  const fetchCars = async () => {
    const cars = await _getCarsList();
    setCarsList(cars || []);
  };
  useEffect(() => {
    fetchCars();
  }, []);
  return (
    <Container>
      <Map>
        {carsList.map((car: Car) => (
          <MapMarker
            key={car.id}
            coordinate={{
              latitude: car.latitude as number,
              longitude: car.longitude as number,
            }}
            car={car}
          />
        ))}
      </Map>
      <MessageBox />
      <Search />
    </Container>
  );
};

export default HomeTemplate;
