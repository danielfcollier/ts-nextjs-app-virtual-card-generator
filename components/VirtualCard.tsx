import Image from 'next/image';

import styles from './VirtualCard.module.css';

interface Props {
  name: string;
  qrCode: string;
}

export default function VirtualCard(props: Props) {
  const { name, qrCode } = props;

  return (
    <div>
      <div className={styles.title}>{name}</div>
      <div>
        Scan Me
        <br />
        <Image src={qrCode} width="180" height="180" alt="qrCode" />
      </div>
    </div>
  );
}
