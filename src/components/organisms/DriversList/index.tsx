import { TouchableOpacity, Text } from 'react-native';
import React from 'react';
import styles from './styles';
import DriverType from '~/components/molecules/DriverType';
import carsType from 'assets/data/carsType';
import Container from '~/components/atoms/Container';

const DriversList = () => {
  const confirm = () => {};
  return (
    <Container>
      {carsType.map(carType => (
        <DriverType key={carType.id} carType={carType} />
      ))}

      <TouchableOpacity onPress={confirm} style={styles.confirmButton}>
        <Text style={styles.confirmText}>Confirm Uber</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default DriversList;
