import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult, GraphQLSubscription } from '@aws-amplify/api';
import { getCar, listCars } from '~/graphql/queries';
import {
  Car,
  CreateCarInput,
  OnCarUpdatedSubscription,
  UpdateCarInput,
} from '~/API';
import { createCar, updateCar } from '~/graphql/mutations';
import { CarSubscriptionType, CognitoUserExt } from '~/types';
import { ZenObservable } from 'zen-observable-ts/lib/types';
import { onCarUpdated } from '~/graphql/subscriptions';

const _getCarsList = async (): Promise<Car[] | undefined> => {
  try {
    const response = (await API.graphql(
      graphqlOperation(listCars, {
        filter: { isAvailable: { eq: true } },
      }),
    )) as GraphQLResult<{ listCars: { items: Car[] } }>;
    return response.data?.listCars.items;
  } catch (err) {
    console.log('Error Services -> getOrdersList: ', err);
  }
};
const _createDriverCar = async (currentUser: CognitoUserExt) => {
  //Mock dummy car since we don't want an interface to register new cars
  const newCarInput: CreateCarInput = {
    id: currentUser.attributes.sub,
    type: 'UberX',
    uri: 'assets/images/UberX.jpeg',
    isAvailable: false,
  };
  try {
    await API.graphql(graphqlOperation(createCar, { input: newCarInput }));
  } catch (err) {
    console.log('Error Services -> createDriverCar: ', err);
  }
};

const _getDriverCarById = async (carId: string): Promise<Car | undefined> => {
  try {
    const response = (await API.graphql(
      graphqlOperation(getCar, { id: carId }),
    )) as GraphQLResult<{ getCar: Car }>;
    return response.data?.getCar;
  } catch (err) {
    console.log('Error Services -> getCarById: ', err);
  }
};

const _getDriverCarByUserId = async (
  currentUser: CognitoUserExt,
): Promise<Car | undefined> => {
  try {
    const response = (await API.graphql(
      graphqlOperation(getCar, { id: currentUser.attributes.sub }),
    )) as GraphQLResult<{ getCar: Car }>;
    if (response.data?.getCar) {
      return response.data?.getCar;
    } else {
      await _createDriverCar(currentUser);
      return _getDriverCarByUserId(currentUser);
    }
  } catch (err) {
    console.log('Error Services -> getDriverCarByUserId: ', err);
  }
};

const _updateDriverCar = async (currentCar: UpdateCarInput): Promise<void> => {
  /**
     * You do not have to pass in createdAt and updatedAt fields,
     * AppSync manages this for you.
    If you pass in extra input fields not expected by the AppSync schema, this query will fail.
    You can see this in the error field returned by the query
    (the query itself does not throw, per GraphQL design).
    */
  try {
    await API.graphql(graphqlOperation(updateCar, { input: currentCar }));
  } catch (err) {
    console.log('Error Services -> updateCar: ', err);
  }
};

type OnCarUpdateProps = {
  carId: string;
  next?(value: CarSubscriptionType): void;
  error?(errorValue: any): void;
};
const _onDriverCarUpdatedById = ({
  carId,
  next,
  error,
}: OnCarUpdateProps): ZenObservable.Subscription => {
  const sub = API.graphql<GraphQLSubscription<OnCarUpdatedSubscription>>(
    graphqlOperation(onCarUpdated, { id: carId }),
  ).subscribe({
    next,
    error,
  });
  // Stop receiving data updates from the subscription
  // return sub.unsubscribe();
  return sub;
};

export {
  _getCarsList,
  _getDriverCarById,
  _createDriverCar,
  _getDriverCarByUserId,
  _updateDriverCar,
  _onDriverCarUpdatedById,
};
