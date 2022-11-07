import { useRouter } from 'next/router';
import { Container, Row } from 'react-bootstrap';

import CardButton from '@/components/CardButton';
import PageHeader from '@/components/PageHeader';

import { cards } from '../config/cards';

const sortWordsAscending = (a: string, b: string) => {
  return a.localeCompare(b);
};

export default function History() {
  const router = useRouter();
  const { name } = router.query;

  Object.keys(cards).forEach((key) => {
    if (router.query[key]) {
      cards[key].url = router.query[key] as string;
    }
  });

  return (
    <div className="card-container">
      <PageHeader name={name} />

      <p>Hello, my name is {name}</p>

      <h1>My history</h1>

      <p>Lorem ipsum dolor sit amet, consectetur</p>

      <Container>
        <Row className="row" sm={6} xs={2}>
          {Object.keys(cards)
            .sort(sortWordsAscending)
            .filter(key => cards[key].url !== '')
            .map(key => {
              return (
                <CardButton key={key} link={cards[key].url as string} label={cards[key].label} />
              );
            })}
        </Row>
      </Container>
    </div>
  );
}
