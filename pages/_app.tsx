import type { AppProps } from 'next/app';

import 'bootstrap/dist/css/bootstrap.min.css';

import '@/styles/global.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
