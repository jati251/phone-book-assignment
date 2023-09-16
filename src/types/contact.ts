export interface CreateContactProps {
  first_name: string;
  last_name: string;
  phones: { number: string }[];
}

export interface ContactProfile {
  first_name: string;
  id: number;
  last_name: string;
  phones: PhoneNumber[];
  __typename: string;
}

export interface PhoneNumber {
  number: string;
  __typename: string;
}
