import { API, Auth, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api';
import { User } from '~/API';
import { getUser } from '~/graphql/queries';
import { CognitoUserExt } from '~/types';

const _getAuthenticatedUser = async (): Promise<CognitoUserExt> => {
  return await Auth.currentAuthenticatedUser({ bypassCache: true });
};

type GetUserProps = {
  currentUser?: boolean;
  id?: string;
};
const _getUser = async ({
  currentUser,
  id,
}: GetUserProps): Promise<User | undefined> => {
  try {
    if (!currentUser || !id) {
      return undefined;
    }
    let userId;
    if (currentUser) {
      const authenticatedUser = await _getAuthenticatedUser();
      userId = authenticatedUser.attributes.sub;
    } else {
      userId = id;
    }
    const response = (await API.graphql(
      graphqlOperation(getUser, { id: userId }),
    )) as GraphQLResult<{ getUser: User }>;
    return response.data?.getUser;
  } catch (err) {
    console.log('Error Services -> getUser: ', err);
  }
};

export { _getAuthenticatedUser, _getUser };
