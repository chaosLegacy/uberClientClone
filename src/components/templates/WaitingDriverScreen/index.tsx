import React from 'react';
import LottieView from 'lottie-react-native';
import Container from '~/components/atoms/Container';

const WaitingDriverTemplate = () => {
  return (
    <Container>
      <LottieView
        source={require('assets/animations/waitingDriver.json')}
        autoPlay
        loop
      />
    </Container>
  );
};

export default WaitingDriverTemplate;
