import { ChangeEvent, FormEvent, useState, useRef, useEffect } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import download from 'downloadjs';
import { toPng } from 'html-to-image';
import QRCode from 'qrcode';

import PageHeader from '@/components/PageHeader';
import VirtualCard from '@/components/VirtualCard';

import { Card, cards } from '../config/cards';

const MILLISECONDS_TO_RELOAD = 2000;

interface States {
  name: string;
  qrCode: string;
  cards: Card;
}

const initialStates: States = {
  cards,
  qrCode: '',
  name: '',
};

export default function Generate() {
  const imageRef = useRef<HTMLDivElement>(null);

  const [validated, setValidated] = useState(false);
  const [states, setStates] = useState(initialStates);

  const handleStates = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value, className } = event.target;
    if (className.includes('cards')) {
      const url = value;
      const isInvalid = states.cards[id].inValidation(value);

      setStates({
        ...states,
        cards: {
          ...states.cards,
          [id]: {
            ...states.cards[id],
            url,
            isInvalid,
          },
        },
      });
    } else {
      setStates({ ...states, [id]: value });
    }
  };

  const addQueryString = (previousValue: string, currentValue: Card) => {
    const url = currentValue.url as unknown as string;
    if (url === '') {
      return `${previousValue}`;
    }

    const queryParam = `${currentValue.id}=${currentValue.url}`;

    if (previousValue.includes('=')) {
      return `${previousValue}&${queryParam}`;
    }

    return `${previousValue}?${queryParam}`;
  };

  const isFormInvalid = (form: HTMLFormElement) => {
    const isAnyElementInvalid = (previousValue: boolean, currentValue: Element) => {
      return currentValue.getAttribute('class')?.includes('is-invalid') || previousValue;
    };

    return Array.from(form.elements).reduce(isAnyElementInvalid, false);
  };

  const handleSubmit = async (event: FormEvent) => {
    const form = event.currentTarget as HTMLFormElement;
    event.preventDefault();
    form.reportValidity();

    if (!form.checkValidity() || isFormInvalid(form)) {
      event.stopPropagation();
      return;
    }

    const baseUrl = `${process.env.NEXT_PUBLIC_HOST_URL}/${encodeURIComponent(states.name)}`;
    const linkUrl = Object.keys(states.cards)
    .map((key) => {
      return { ...states.cards[key], id: key } as unknown as Card;
    })
    .reduce(addQueryString, baseUrl);
    const qrCode = await QRCode.toDataURL(linkUrl);
    console.log({ linkUrl }); // Just to make it easier to verify on the browser
    setStates({ ...states, qrCode });
    setValidated(true);
  };

  useEffect(() => {
    if (imageRef.current === null) {
      return;
    }

    const timer = setTimeout(() => {
      setValidated(false);
    }, MILLISECONDS_TO_RELOAD);

    const downloadImage = async (current: HTMLDivElement) => {
      download(await toPng(current), 'virtual-card.png');
      setStates({ ...states, qrCode: '' });
      return () => clearTimeout(timer);
    };

    downloadImage(imageRef.current);
  }, [states, imageRef]);

  return (
    <div className="container">
      <PageHeader name={'Virtual Card'} />

      <h1 className="title">QR Code Image Generator</h1>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <InputGroup.Text>Name</InputGroup.Text>
          <Form.Control id="name" defaultValue={states.name} onChange={handleStates} required />
        </InputGroup>

        {Object.keys(states.cards).map((key) => {
          return (
            <InputGroup className="mb-3" key={key}>
              <InputGroup.Text>{states.cards[key].label}</InputGroup.Text>
              <Form.Control
                className="cards"
                id={key}
                defaultValue={states.cards[key].url}
                onChange={handleStates}
                isInvalid={states.cards[key].isInvalid}
                required={states.cards[key].required}
              />
            </InputGroup>
          );
        })}

        <Button className="button" size="lg" variant="outline-dark" type="submit">
          Generate Image
        </Button>
      </Form>

      {states.qrCode && (
        <div ref={imageRef} className="virtual-card">
          <VirtualCard name={states.name} qrCode={states.qrCode} />
        </div>
      )}
    </div>
  );
}
