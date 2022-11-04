import { ChangeEvent, FormEvent, useCallback, useState, useRef } from 'react';
import Image from 'next/image';

import download from 'downloadjs';
import { toPng } from 'html-to-image';
import QRCode from 'qrcode';

import PageHeader from 'components/PageHeader';

interface LinkProps {
  id: string;
  label: string;
  link: string | null;
}

interface States {
  name: string;
  qrCode: string;
  links: LinkProps[];
}

const initialStates: States = {
  name: 'Daniel',
  qrCode: '',
  links: [
    {
      id: 'linkedin',
      label: 'LinkedIn URL',
      link: 'https://linkedin.com/in/danielfcollier',
    },
    {
      id: 'github',
      label: 'GitHub URL',
      link: 'https://github.com/danielfcollier',
    },
  ],
};

export default function Generate() {
  const [states, setStates] = useState(initialStates);

  const imageRef = useRef<HTMLDivElement>(null);

  const handleStates = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setStates({ ...states, [id]: value });
  };

  const addQueryString = (previousValue: string, currentValue: LinkProps) => {
    if (currentValue.link === null) {
      return `${previousValue}`;
    }

    const queryParam = `${currentValue.id}=${currentValue.link}`;

    if (previousValue.includes('=')) {
      return `${previousValue}&${queryParam}`;
    }

    return `${previousValue}?${queryParam}`;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const baseUrl = `${process.env.NEXT_PUBLIC_HOST_URL}/${encodeURIComponent(states.name)}`;
    const linkUrl = states.links.reduce(addQueryString, baseUrl);
    const qrCode = await QRCode.toDataURL(linkUrl);
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

        {states.links.map((link) => {
          return (
            <label key={link.id}>
              {link.label}
              <input
                defaultValue={link.link as string}
                onChange={handleStates}
                type="text"
                name={link.id}
                id={link.id}
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
