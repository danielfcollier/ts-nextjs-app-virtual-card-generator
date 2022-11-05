import { ChangeEvent, FormEvent, useState, useRef } from 'react';
import Image from 'next/image';

import download from 'downloadjs';
import { toPng } from 'html-to-image';
import QRCode from 'qrcode';

import PageHeader from '@/components/PageHeader';

import { Card, cards } from '../config/cards';

interface States {
  name: string;
  qrCode: string;
  cards: Card;
}

const initialStates: States = {
  cards,
  qrCode: '',
  name: 'Daniel',
};

export default function Generate() {
  const [states, setStates] = useState(initialStates);

  const imageRef = useRef<HTMLDivElement>(null);

  const handleStates = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value, className } = event.target;
    if (className === 'cards') {
      setStates({
        ...states,
        cards: {
          ...states.cards,
          [id]: {
            ...states.cards[id],
            url: value,
          },
        },
      });
    } else {
      setStates({ ...states, [id]: value });
    }
  };

  const addQueryString = (previousValue: string, currentValue: Card) => {
    if (currentValue.url === null) {
      return `${previousValue}`;
    }

    const queryParam = `${currentValue.id}=${currentValue.url}`;

    if (previousValue.includes('=')) {
      return `${previousValue}&${queryParam}`;
    }

    return `${previousValue}?${queryParam}`;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const baseUrl = `${process.env.NEXT_PUBLIC_HOST_URL}/${encodeURIComponent(states.name)}`;
    const linkUrl = Object.keys(states.cards)
      .map((key) => {
        return { ...states.cards[key], id: key } as unknown as Card;
      })
      .reduce(addQueryString, baseUrl);
    const qrCode = await QRCode.toDataURL(linkUrl);
    console.log({ linkUrl }); // Just to make it easier to verify on the browser
    setStates({ ...states, qrCode });

    if (imageRef.current === null) {
      return;
    }

    download(await toPng(imageRef.current), 'virtual-card.png');
  };

  return (
    <div>
      <PageHeader name={'Virtual Card'} />

      <h1>QR Code Image Generator</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            defaultValue={states.name}
            onChange={handleStates}
            type="text"
            name="name"
            id="name"
          />
          <br />
        </label>

        {Object.keys(states.cards).map((key) => {
          return (
            <label key={key}>
              {states.cards[key].label}
              <input
                className="cards"
                defaultValue={states.cards[key].url as string}
                onChange={handleStates}
                type="text"
                name={key}
                id={key}
              />
              <br />
            </label>
          );
        })}

        <input type="submit" value="Generate Image" />

        {states.qrCode && (
          <div ref={imageRef} id="virtual-card">
            {states.name}
            <br />
            Scan me
            <br />
            <Image src={states.qrCode} width="100" height="100" alt="qrCode" />
          </div>
        )}
      </form>
    </div>
  );
}
