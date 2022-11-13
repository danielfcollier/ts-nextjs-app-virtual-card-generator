import { States } from '@/pages/generate';
import generateQrCode from './generateQrCode';

it('Renders card [name] page without crashing', async () => {
  const states: States = {
    qrCode: '',
    name: 'Daniel Collier',
    cards: {
      linkedin: {
        required: true,
        card: 'linkedin',
        label: 'LinkedIn URL',
        url: 'https://linkedin.com/in/danielfcollier',
        isInvalid: false,
        inValidation: (value: string) => false,
      },
    },
  };

  const { linkUrl } = await generateQrCode(states);
  const baseUrl = `${process.env.NEXT_PUBLIC_HOST_URL}/${encodeURIComponent(states.name)}`;

  expect(linkUrl).toBe(`${baseUrl}?linkedin=https://linkedin.com/in/danielfcollier`);
});

it('Renders card [name] page without crashing', async () => {
  const states: States = {
    qrCode: '',
    name: 'Daniel Collier',
    cards: {
      linkedin: {
        required: true,
        card: 'linkedin',
        label: 'LinkedIn URL',
        url: 'https://linkedin.com/in/danielfcollier',
        isInvalid: false,
        inValidation: (value: string) => false,
      },
      github: {
        required: false,
        card: 'github',
        label: 'GitHub URL',
        url: '',
        isInvalid: false,
        inValidation: (value: string) => false,
      },
    },
  };

  const { linkUrl } = await generateQrCode(states);
  const baseUrl = `${process.env.NEXT_PUBLIC_HOST_URL}/${encodeURIComponent(states.name)}`;

  expect(linkUrl).toBe(`${baseUrl}?linkedin=https://linkedin.com/in/danielfcollier`);
});

it('Renders card [name] page without crashing', async () => {
  const states: States = {
    qrCode: '',
    name: 'Daniel Collier',
    cards: {
      linkedin: {
        required: true,
        card: 'linkedin',
        label: 'LinkedIn URL',
        url: 'https://linkedin.com/in/danielfcollier',
        isInvalid: false,
        inValidation: (value: string) => false,
      },
      github: {
        required: false,
        card: 'github',
        label: 'GitHub URL',
        url: 'https://github.com/danielfcollier',
        isInvalid: false,
        inValidation: (value: string) => false,
      },
    },
  };

  const { linkUrl } = await generateQrCode(states);
  const baseUrl = `${process.env.NEXT_PUBLIC_HOST_URL}/${encodeURIComponent(states.name)}`;

  expect(linkUrl).toBe(`${baseUrl}?linkedin=https://linkedin.com/in/danielfcollier&github=https://github.com/danielfcollier`);
});

it('Renders card [name] page without crashing', async () => {
  const states: States = {
    qrCode: '',
    name: 'Daniel Collier',
    cards: {
      linkedin: {
        required: true,
        card: 'linkedin',
        label: 'LinkedIn URL',
        url: 'linkedin.com/in/danielfcollier',
        isInvalid: false,
        inValidation: (value: string) => false,
      },
      github: {
        required: false,
        card: 'github',
        label: 'GitHub URL',
        url: 'github.com/danielfcollier',
        isInvalid: false,
        inValidation: (value: string) => false,
      },
    },
  };

  const { linkUrl } = await generateQrCode(states);
  const baseUrl = `${process.env.NEXT_PUBLIC_HOST_URL}/${encodeURIComponent(states.name)}`;

  expect(linkUrl).toBe(`${baseUrl}?linkedin=https://linkedin.com/in/danielfcollier&github=https://github.com/danielfcollier`);
});
