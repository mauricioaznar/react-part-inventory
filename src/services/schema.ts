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
  getProducts: Array<Product>;
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

export type Product = {
  __typename?: 'Product';
  is_good?: Maybe<Scalars['Boolean']>;
  is_service?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  product_categories: Array<ProductCategory>;
  product_category_classifications: Array<ProductCategoryClassification>;
  product_feature_applicabilities: Array<ProductFeatureApplicability>;
  product_features: Array<ProductFeature>;
  product_id: Scalars['Float'];
};

export type ProductCategory = {
  __typename?: 'ProductCategory';
  description: Scalars['String'];
  product_category_id: Scalars['Float'];
};

export type ProductCategoryClassification = {
  __typename?: 'ProductCategoryClassification';
  from_date: Scalars['String'];
  product: Product;
  product_category: ProductCategory;
  product_category_id: Scalars['Float'];
  product_id: Scalars['Float'];
};

export type ProductFeatureApplicability = {
  __typename?: 'ProductFeatureApplicability';
  from_date: Scalars['String'];
  product_feature_id: Scalars['Float'];
  product_id: Scalars['Float'];
};

export type ProductFeature = {
  __typename?: 'ProductFeature';
  description: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  assignProductToCategory: Scalars['Boolean'];
  createProduct: Product;
  createProductCategory: ProductCategory;
  createUser: User;
  login: AccessToken;
  updateProduct: Product;
  updateUser: User;
};


export type MutationAssignProductToCategoryArgs = {
  productCategoryId: Scalars['Float'];
  productId: Scalars['Float'];
};


export type MutationCreateProductArgs = {
  productInput: ProductInput;
};


export type MutationCreateProductCategoryArgs = {
  productCategoryInput: ProductCategoryInput;
};


export type MutationCreateUserArgs = {
  userInput: UserInput;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationUpdateProductArgs = {
  id: Scalars['Float'];
  productInput: ProductInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['Float'];
  userInput: UserInput;
};

export type ProductInput = {
  name: Scalars['String'];
  product_subtype: ProductSubtype;
};

export enum ProductSubtype {
  Good = 'Good',
  Service = 'Service'
}

export type ProductCategoryInput = {
  description: Scalars['String'];
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

export const namedOperations = {
  Query: {
    CurrentUser: 'CurrentUser',
    GetUsers: 'GetUsers',
    IsUserOccupied: 'IsUserOccupied'
  },
  Mutation: {
    Login: 'Login'
  }
}