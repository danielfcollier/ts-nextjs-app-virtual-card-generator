import { Button } from 'react-bootstrap';

import styles from './CardButton.module.css';

interface Props {
  label: string;
  link: string;
}

export default function CardButton(props: Props) {
  const { label, link } = props;

  return (
    <>
      <a href={link}>
        <Button className="button" variant="outline-dark">
          {label}
        </Button>
      </a>
    </>
  );
}
