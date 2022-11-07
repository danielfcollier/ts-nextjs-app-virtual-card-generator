import { Button } from 'react-bootstrap';

import styles from './CardButton.module.css';

interface Props {
  label: string;
  link: string;
}

export default function CardButton(props: Props) {
  const { label, link } = props;

  const regex = /^http(s)??:\/\//g;
  const hasUrlPrefix = regex.test(link);
  const url = hasUrlPrefix ? link : `https://${link}`;

  return (
    <>
      <a href={url}>
        <Button className="button" variant="outline-dark">
          {label}
        </Button>
      </a>
    </>
  );
}
