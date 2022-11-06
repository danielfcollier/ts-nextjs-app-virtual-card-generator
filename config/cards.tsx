export interface Card {
  [key: string]: {
    id?: string;
    card: string;
    label: string;
    url: string | null;
  };
}

export const cards: Card = {
  linkedin: {
    card: 'LinkedIn',
    label: 'LinkedIn URL',
    url: '',
  },
  github: {
    card: 'GitHub',
    label: 'GitHub URL',
    url: '',
  },
};
