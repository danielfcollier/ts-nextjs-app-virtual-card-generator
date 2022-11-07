export interface Card {
  [key: string]: {
    id?: string;
    required: boolean;
    card: string;
    label: string;
    url: string;
    isInvalid: boolean;
    inValidation: (value: string) => boolean;
  };
}

const cardTemplate = {
  required: true,
  url: '',
  isInvalid: false,
};

export const cards: Card = {
  linkedin: {
    ...cardTemplate,
    card: 'LinkedIn',
    label: 'LinkedIn URL',
    inValidation: (value: string) => {
      const regex = /^(https:\/\/)?(www\.)??(linkedin\.com\/in\/){1}(.)+/g;
      const isInvalid = !regex.test(value);
      return isInvalid;
    },
  },
  github: {
    ...cardTemplate,
    required: false,
    card: 'GitHub',
    label: 'GitHub URL',
    inValidation: (value: string) => {
      const regex = /^(https:\/\/)?(www\.)??(github\.com\/){1}(.)+/g;
      const isInvalid = !regex.test(value);
      return isInvalid;
    },
  },
};
