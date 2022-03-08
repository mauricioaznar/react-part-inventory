import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  currentUser: User;
  getPartCategories: Array<PartCategory>;
  getParts: Array<Part>;
  getServerVersion?: Maybe<Scalars['String']>;
  isUserOccupied: Scalars['Boolean'];
  users: Array<User>;
};


export type QueryIsUserOccupiedArgs = {
  username: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  username: Scalars['String'];
};

export type PartCategory = {
  __typename?: 'PartCategory';
  name: Scalars['String'];
  part_category_id: Scalars['Float'];
  parts: Array<Part>;
};

export type Part = {
  __typename?: 'Part';
  components: Array<Component>;
  current_quantity: Scalars['Int'];
  image_url?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  part_category_id: Scalars['Float'];
  part_id: Scalars['Float'];
};

export type Component = {
  __typename?: 'Component';
  component: Part;
  quantity: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addAddition: PartAddition;
  addCategory: PartCategory;
  addComponent: PartComponent;
  addSubtraction: PartSubtraction;
  createPart: Part;
  createUser: User;
  login: AccessToken;
  updatePart: Part;
  updateUser: User;
};


export type MutationAddAdditionArgs = {
  partComponentInput: PartAdditionInput;
};


export type MutationAddCategoryArgs = {
  partCategoryInput: PartCategoryInput;
};


export type MutationAddComponentArgs = {
  partComponentInput: PartComponentInput;
};


export type MutationAddSubtractionArgs = {
  partSubtractionInput: PartSubtractionInput;
};


export type MutationCreatePartArgs = {
  partInput: PartInput;
};


export type MutationCreateUserArgs = {
  userInput: UserInput;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationUpdatePartArgs = {
  id: Scalars['Float'];
  partInput: PartInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['Float'];
  userInput: UserInput;
};

export type PartAdditionInput = {
  part_id: Scalars['Float'];
  quantity: Scalars['Float'];
};

export type PartAddition = {
  __typename?: 'PartAddition';
  part_id: Scalars['Float'];
  quantity: Scalars['Float'];
};

export type PartCategoryInput = {
  name: Scalars['String'];
};

export type PartComponentInput = {
  component_id: Scalars['Float'];
  parent_id: Scalars['Float'];
  quantity: Scalars['Float'];
};

export type PartComponent = {
  __typename?: 'PartComponent';
  component_id: Scalars['Float'];
  parent_id: Scalars['Float'];
  quantity: Scalars['Float'];
};

export type PartSubtractionInput = {
  part_id: Scalars['Float'];
  quantity: Scalars['Float'];
};

export type PartSubtraction = {
  __typename?: 'PartSubtraction';
  part_id: Scalars['Float'];
  quantity: Scalars['Float'];
};

export type PartInput = {
  image_url?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  part_category_id: Scalars['Float'];
};

export type UserInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type LoginInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type AccessToken = {
  __typename?: 'AccessToken';
  accessToken: Scalars['String'];
};


export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    username
    id
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export function refetchCurrentUserQuery(variables?: CurrentUserQueryVariables) {
      return { query: CurrentUserDocument, variables: variables }
    }
export const GetUsersDocument = gql`
    query GetUsers {
  users {
    id
    username
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export function refetchGetUsersQuery(variables?: GetUsersQueryVariables) {
      return { query: GetUsersDocument, variables: variables }
    }
export const IsUserOccupiedDocument = gql`
    query IsUserOccupied($username: String!) {
  isUserOccupied(username: $username)
}
    `;

/**
 * __useIsUserOccupiedQuery__
 *
 * To run a query within a React component, call `useIsUserOccupiedQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsUserOccupiedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsUserOccupiedQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useIsUserOccupiedQuery(baseOptions: Apollo.QueryHookOptions<IsUserOccupiedQuery, IsUserOccupiedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsUserOccupiedQuery, IsUserOccupiedQueryVariables>(IsUserOccupiedDocument, options);
      }
export function useIsUserOccupiedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsUserOccupiedQuery, IsUserOccupiedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsUserOccupiedQuery, IsUserOccupiedQueryVariables>(IsUserOccupiedDocument, options);
        }
export type IsUserOccupiedQueryHookResult = ReturnType<typeof useIsUserOccupiedQuery>;
export type IsUserOccupiedLazyQueryHookResult = ReturnType<typeof useIsUserOccupiedLazyQuery>;
export type IsUserOccupiedQueryResult = Apollo.QueryResult<IsUserOccupiedQuery, IsUserOccupiedQueryVariables>;
export function refetchIsUserOccupiedQuery(variables?: IsUserOccupiedQueryVariables) {
      return { query: IsUserOccupiedDocument, variables: variables }
    }
export const LoginDocument = gql`
    mutation Login($loginInput: loginInput!) {
  login(loginInput: $loginInput) {
    accessToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const GetPartCategoriesDocument = gql`
    query GetPartCategories {
  getPartCategories {
    name
    parts {
      part_id
      name
      image_url
      components {
        component {
          name
        }
        quantity
      }
      current_quantity
    }
  }
}
    `;

/**
 * __useGetPartCategoriesQuery__
 *
 * To run a query within a React component, call `useGetPartCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPartCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPartCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPartCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetPartCategoriesQuery, GetPartCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPartCategoriesQuery, GetPartCategoriesQueryVariables>(GetPartCategoriesDocument, options);
      }
export function useGetPartCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPartCategoriesQuery, GetPartCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPartCategoriesQuery, GetPartCategoriesQueryVariables>(GetPartCategoriesDocument, options);
        }
export type GetPartCategoriesQueryHookResult = ReturnType<typeof useGetPartCategoriesQuery>;
export type GetPartCategoriesLazyQueryHookResult = ReturnType<typeof useGetPartCategoriesLazyQuery>;
export type GetPartCategoriesQueryResult = Apollo.QueryResult<GetPartCategoriesQuery, GetPartCategoriesQueryVariables>;
export function refetchGetPartCategoriesQuery(variables?: GetPartCategoriesQueryVariables) {
      return { query: GetPartCategoriesDocument, variables: variables }
    }
export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'User', username: string, id: number } };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: number, username: string }> };

export type IsUserOccupiedQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type IsUserOccupiedQuery = { __typename?: 'Query', isUserOccupied: boolean };

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AccessToken', accessToken: string } };

export type GetPartCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPartCategoriesQuery = { __typename?: 'Query', getPartCategories: Array<{ __typename?: 'PartCategory', name: string, parts: Array<{ __typename?: 'Part', part_id: number, name: string, image_url?: string | null | undefined, current_quantity: number, components: Array<{ __typename?: 'Component', quantity: number, component: { __typename?: 'Part', name: string } }> }> }> };

export const namedOperations = {
  Query: {
    CurrentUser: 'CurrentUser',
    GetUsers: 'GetUsers',
    IsUserOccupied: 'IsUserOccupied',
    GetPartCategories: 'GetPartCategories'
  },
  Mutation: {
    Login: 'Login'
  }
}