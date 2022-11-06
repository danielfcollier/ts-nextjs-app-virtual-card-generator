import { Button } from 'react-bootstrap';

interface Props {
  label: string;
  link: string;
}

export default function LinkButton(props: Props) {
  const { label, link } = props;

  return (
    <>
      <a href={link}>
        <Button className="button" size="lg" variant="outline-dark">
          {label}
        </Button>
      </a>
    </>
  );
}
