interface Props {
  label: string;
  link: string;
};

export default function LinkButton(props: Props) {
  const { label, link } = props;

  return (
    <>
      <a href={link}>
        <button>{label}</button>
      </a>
    </>
  );
}
