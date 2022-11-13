import QRCode from 'qrcode';

import { Card } from 'config/cards';
import { States } from '@/pages/generate';

const fixUrlProtocol = (url: string) => {
  const regex = /^http(s)??:\/\//g;
  const hasUrlPrefix = regex.test(url);
  const link = hasUrlPrefix ? url : `https://${url}`;

  return link;
};

const addQueryString = (previousValue: string, currentValue: Card) => {
  const url = currentValue.url as unknown as string;
  if (url === '') {
    return `${previousValue}`;
  }

  const link = fixUrlProtocol(url);
  const queryParam = `${currentValue.id}=${link}`;

  if (previousValue.includes('=')) {
    return `${previousValue}&${queryParam}`;
  }

  return `${previousValue}?${queryParam}`;
};

const generateQrCode = async (states: States) => {
  const baseUrl = `${process.env.NEXT_PUBLIC_HOST_URL}/${encodeURIComponent(states.name)}`;
  const linkUrl = Object.keys(states.cards)
    .map((key) => {
      return { ...states.cards[key], id: key } as unknown as Card;
    })
    .reduce(addQueryString, baseUrl);
  const qrCode = await QRCode.toDataURL(linkUrl);

  return { qrCode, linkUrl };
};

export { addQueryString };
export default generateQrCode;
