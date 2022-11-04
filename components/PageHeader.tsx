import Head from "next/head";

interface Props {
  name: string | string[] | undefined;
}

export default function PageHeader(props: Props) {
  const { name } = props;

  return (
    <>
      <Head>
        <title>{name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
}
