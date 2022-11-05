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
    url: 'https://linkedin.com/in/danielfcollier',
  },
  github: {
    card: 'GitHub',
    label: 'GitHub URL',
    url: 'https://github.com/danielfcollier',
  },
};
