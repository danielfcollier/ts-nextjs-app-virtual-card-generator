import { useRouter } from 'next/router';

import LinkButton from '@/components/LinkButton';
import PageHeader from '@/components/PageHeader';

import { cards } from '../config/cards';

export default function History() {
  const router = useRouter();
  const { name } = router.query;

  Object.keys(cards).forEach((key) => {
    if (router.query[key]) {
      cards[key].url = router.query[key] as string;
    }
  });

  return (
    <>
      <PageHeader name={name} />

      <p>Hello, my name is {name}</p>

      <h1>My history</h1>

      <p>Lorem ipsum dolor sit amet, consectetur</p>

      <div>
        {Object.keys(cards).map((key) => {
          return <LinkButton key={key} link={cards[key].url as string} label={cards[key].label} />;
        })}
      </div>
    </>
  );
}
