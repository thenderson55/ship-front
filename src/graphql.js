import gql from 'graphql-tag'

export const SIGNUP_MUTATION = gql`
  mutation SignUpMutation($email: String!, @password: String!) {
    createUser(
      authProvider: {
        email: {
          email: $email,
          password: $password
        }
      }
      ){ 
        email
        id
      }
  }
`