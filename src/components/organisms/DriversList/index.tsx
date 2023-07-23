import { TouchableOpacity, Text } from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import DriverType from '~/components/molecules/DriverType';
import carsType from 'assets/data/carsType';
import Container from '~/components/atoms/Container';
import GlobalStyles from '~/constants/GlobalStyles';

type DriversListProps = {
  onSubmitCarType: (cartType?: string) => void;
};
const DriversList = ({ onSubmitCarType }: DriversListProps) => {
  const [selectCarType, setSelectCarType] = useState<string>(); //TODO contains car type maybe use ENUM

  return (
    <Container>
      {carsType.map(carType => (
        <DriverType
          key={carType.id}
          carType={carType}
          onPress={() => setSelectCarType(carType.type)}
          isSelected={carType.type === selectCarType}
        />
      ))}
      <TouchableOpacity
        onPress={() => onSubmitCarType(selectCarType)}
        disabled={!selectCarType}
        style={[
          styles.confirmButton,
          !selectCarType ? GlobalStyles.disabledButton : {},
        ]}>
        <Text style={styles.confirmText}>Confirm Uber</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default DriversList;
