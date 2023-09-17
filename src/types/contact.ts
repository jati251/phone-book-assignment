export interface CreateContactProps {
  first_name: string;
  last_name: string;
  phones: { number: string }[];
}

export interface ContactProfile extends CreateContactProps {
  id: number;
  phones: PhoneNumber[];
  __typename: string;
}

export interface PhoneNumber {
  number: string;
  __typename: string;
}

export type ContactContextType = {
  useHandleFetchSearch: (page: number, name: string) => void;
  contacts: ContactProfile[];
};
