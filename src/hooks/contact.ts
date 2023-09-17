import { gql, useQuery } from "@apollo/client";

export function useGetContactList() {
  const GET_CONTACT_LIST = gql`
    query GetContactList(
      $distinct_on: [contact_select_column!]
      $limit: Int
      $offset: Int
      $order_by: [contact_order_by!]
      $where: contact_bool_exp
    ) {
      contact(
        distinct_on: $distinct_on
        limit: $limit
        offset: $offset
        order_by: $order_by
        where: $where
      ) {
        created_at
        first_name
        id
        last_name
        phones {
          number
        }
      }
    }
  `;

  const { error, data, loading, refetch } = useQuery(GET_CONTACT_LIST, {
    variables: {
      limit: 10,
      offset: 0,
    },
  });

  const contacts = data?.contact;

  return { error, loading, contacts, refetch };
}

export function useGetContactDetail(id: any) {
  const GET_CONTACT_DETAIL = gql`
    query GetContactDetail($id: Int!) {
      contact_by_pk(id: $id) {
        last_name
        id
        first_name
        created_at
        phones {
          number
        }
      }
    }
  `;

  const { error, data, loading } = useQuery(GET_CONTACT_DETAIL, {
    variables: { id },
  });
  const contact = data?.contact_by_pk;
  return { error, loading, contact };
}

export function useGetPhoneList() {
  const GET_PHONE_LIST = gql`
    query GetPhoneList(
      $where: phone_bool_exp
      $distinct_on: [phone_select_column!]
      $limit: Int = 10
      $offset: Int = 0
      $order_by: [phone_order_by!]
    ) {
      phone(
        where: $where
        distinct_on: $distinct_on
        limit: $limit
        offset: $offset
        order_by: $order_by
      ) {
        contact {
          last_name
          first_name
          id
        }
        number
      }
    }
  `;
  const { error, data, loading } = useQuery(GET_PHONE_LIST, {
    variables: {
      where: {
        contact: {
          first_name: {
            _like: "%John%",
          },
        },
      },
    },
  });

  return { error, loading, data };
}

//CREATE

export const ADD_CONTACT_WITH_PHONES = gql`
  mutation AddContactWithPhones(
    $first_name: String!
    $last_name: String!
    $phones: [phone_insert_input!]!
  ) {
    insert_contact(
      objects: {
        first_name: $first_name
        last_name: $last_name
        phones: { data: $phones }
      }
    ) {
      returning {
        first_name
        last_name
        id
        phones {
          number
        }
      }
    }
  }
`;

export const ADD_NUMBER_TO_CONTACT = gql`
  mutation AddNumberToContact($contact_id: Int!, $phone_number: String!) {
    insert_phone(objects: { contact_id: $contact_id, number: $phone_number }) {
      returning {
        contact {
          id
          last_name
          first_name
          phones {
            number
          }
        }
      }
    }
  }
`;

//EDIT

export const EDIT_CONTACT_BY_ID = gql`
  mutation EditContactById($id: Int!, $_set: contact_set_input) {
    update_contact_by_pk(pk_columns: { id: $id }, _set: $_set) {
      id
      first_name
      last_name
      phones {
        number
      }
    }
  }
`;

export const EDIT_PHONE_NUMBER = gql`
  mutation EditPhoneNumber(
    $pk_columns: phone_pk_columns_input!
    $new_phone_number: String!
  ) {
    update_phone_by_pk(
      pk_columns: $pk_columns
      _set: { number: $new_phone_number }
    ) {
      contact {
        id
        last_name
        first_name
        created_at
        phones {
          number
        }
      }
    }
  }
`;

//DELETE
export const DELETE_CONTACT_PHONE = gql`
  mutation DeleteContact($id: Int!) {
    delete_contact_by_pk(id: $id) {
      first_name
      last_name
      id
    }
  }
`;
