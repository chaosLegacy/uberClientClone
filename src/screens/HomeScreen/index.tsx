import React, { useState, useEffect } from 'react';
import Map from '~/components/molecules/Map';
import MessageBox from '~/components/atoms/MessageBox';
import Search from '~/components/molecules/Search';
// import carsList from 'assets/data/cars';
import { Car } from '~/types';
import MapMarker from '~/components/molecules/MapMarker';
import Container from '~/components/atoms/Container';
import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api';
import { listCars } from '~/graphql/queries';

const HomeScreen = () => {
  const [carsList, setCarsList] = useState<Car[]>([]);
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = (await API.graphql(
          graphqlOperation(listCars),
        )) as GraphQLResult<{ listCars: { items: Car[] } }>;
        if (response.data?.listCars) {
          setCarsList(response.data?.listCars.items);
        }
      } catch (err) {
        console.log('Error: ', err);
      }
    };
    fetchCars();
  }, []);
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
            car={car}
          />
        ))}
      </Map>
      <MessageBox />
      <Search />
    </Container>
  );
};

export default HomeScreen;
