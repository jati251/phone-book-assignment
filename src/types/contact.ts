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
  __typename?: string;
}

export type ContactContextType = {
  handleFetchSearch: (page: number, name: string) => void;
  contacts: ContactProfile[];
};

export interface ContactCardProps {
  handleBookMark: () => void;
  isBoorkmark: boolean;
  contact: ContactProfile;
  handleDetail: () => void;
}

export interface ContactDetailModalProps {
  id: number;
  onClose: () => void;
  open: boolean;
  fetchContacts: () => void;
}
