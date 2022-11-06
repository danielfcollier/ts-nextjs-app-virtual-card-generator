import { ChangeEvent, FormEvent, useState, useRef, useEffect } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import download from 'downloadjs';
import { toPng } from 'html-to-image';
import QRCode from 'qrcode';

import PageHeader from '@/components/PageHeader';
import VirtualCard from '@/components/VirtualCard';

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
  };

  useEffect(() => {
    if (imageRef.current === null) {
      return;
    }

    const downloadImage = async (current: HTMLDivElement) => {
      download(await toPng(current), 'virtual-card.png');
      setStates({ ...states, qrCode: '' });
    };

    downloadImage(imageRef.current);
  }, [states, imageRef]);

  return (
    <div className="container">
      <PageHeader name={'Virtual Card'} />

      <h1 className="title">QR Code Image Generator</h1>

      <InputGroup className="mb-3">
        <InputGroup.Text>Name</InputGroup.Text>
        <Form.Control id="name" defaultValue={states.name} onChange={handleStates} />
      </InputGroup>

      {Object.keys(states.cards).map((key) => {
        return (
          <InputGroup className="mb-3" key={key}>
            <InputGroup.Text>{states.cards[key].label}</InputGroup.Text>
            <Form.Control
              className="cards"
              id={key}
              defaultValue={states.cards[key].url as string}
              onChange={handleStates}
            />
          </InputGroup>
        );
      })}

      <Button className="button" size="lg" variant="outline-dark" onClick={handleSubmit}>
        Generate Image
      </Button>

      {states.qrCode && (
        <div ref={imageRef} className="virtual-card">
          <VirtualCard name={states.name} qrCode={states.qrCode}/>
        </div>
      )}
    </div>
  );
}
