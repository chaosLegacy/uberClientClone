import type { PropsWithChildren } from 'react';
import { ImageSourcePropType } from 'react-native';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

type CarCommune = {
  id: string;
  type: string;
  uri: ImageSourcePropType;
};

interface CarType extends CarCommune {
  price: number;
  duration: number;
}

interface Car extends CarCommune {
  latitude: number;
  longitude: number;
  heading: number;
}

export type { SectionProps, CarType, Car };
