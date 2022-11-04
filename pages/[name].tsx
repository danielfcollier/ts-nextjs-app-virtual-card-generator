import { useRouter } from 'next/router';

import LinkButton from 'components/LinkButton';
import PageHeader from 'components/PageHeader';

export default function History() {
  const router = useRouter();
  const { name, linkedin, github } = router.query;

  const cards = [];

  if (linkedin) {
    cards.push({
      label: 'LinkedIn',
      link: linkedin as string,
    });
  }

  if (github) {
    cards.push({
      label: 'GitHub',
      link: github as string,
    });
  }

  return (
    <>
      <PageHeader name={name} />

      <p>Hello, my name is {name}</p>

      <h1>My history</h1>

      <p>Lorem ipsum dolor sit amet, consectetur</p>

      <div>
        {cards.map((card, index) => {
          return <LinkButton key={index} link={card.link} label={card.label} />;
        })}
      </div>
    </>
  );
}
