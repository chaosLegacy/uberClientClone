import { GraphQLResult, GraphQLSubscription } from '@aws-amplify/api';
import { API, graphqlOperation } from 'aws-amplify';
import {
  Order,
  UpdateOrderInput,
  CreateOrderInput,
  OnOrderUpdatedSubscription,
} from '~/API';
import { listOrders, getOrder } from '~/graphql/queries';
import { updateOrder, createOrder } from '~/graphql/mutations';
import { ORDER_STATUS } from '~/constants';
import { onOrderUpdated } from '~/graphql/subscriptions';
import { OrderSubscriptionType } from '~/types';
import { ZenObservable } from 'zen-observable-ts/lib/types';

const _createOrder = async (
  order: CreateOrderInput,
): Promise<Order | undefined> => {
  try {
    const response = (await API.graphql(
      graphqlOperation(createOrder, { input: order }),
    )) as GraphQLResult<{ createOrder: Order }>;
    return response.data?.createOrder;
  } catch (err) {
    console.log('Error Services -> createOrder: ', err);
  }
};

const _getOrdersList = async (): Promise<Order[] | undefined> => {
  try {
    const response = (await API.graphql(
      graphqlOperation(listOrders, {
        filter: { status: { eq: ORDER_STATUS[ORDER_STATUS.NEW] } },
      }),
    )) as GraphQLResult<{ listOrders: { items: Order[] } }>;
    return response.data?.listOrders.items;
  } catch (err) {
    console.log('Error Services -> getOrdersList: ', err);
  }
};

const _getOrderById = async (id: string): Promise<Order | undefined> => {
  try {
    const response = (await API.graphql(
      graphqlOperation(getOrder, { id }),
    )) as GraphQLResult<{ getOrder: Order }>;
    return response.data?.getOrder;
  } catch (err) {
    console.log('Error Services -> getOrderById: ', err);
  }
};

const _updateOrder = async (currentOrder: UpdateOrderInput): Promise<void> => {
  /**
     * You do not have to pass in createdAt and updatedAt fields,
     * AppSync manages this for you.
    If you pass in extra input fields not expected by the AppSync schema, this query will fail.
    You can see this in the error field returned by the query
    (the query itself does not throw, per GraphQL design).
    */
  try {
    await API.graphql(graphqlOperation(updateOrder, { input: currentOrder }));
  } catch (err) {
    console.log('Error Services -> updateCar: ', err);
  }
};

type OnOrderUpdateProps = {
  orderId: string;
  next?(value: OrderSubscriptionType): void;
  error?(errorValue: any): void;
};
const _onOrderUpdatedById = ({
  orderId,
  next,
  error,
}: OnOrderUpdateProps): ZenObservable.Subscription => {
  const sub = API.graphql<GraphQLSubscription<OnOrderUpdatedSubscription>>(
    graphqlOperation(onOrderUpdated, { id: orderId }),
  ).subscribe({
    next,
    error,
  });
  // Stop receiving data updates from the subscription
  // return sub.unsubscribe();
  return sub;
};

export {
  _createOrder,
  _getOrdersList,
  _getOrderById,
  _updateOrder,
  _onOrderUpdatedById,
};
