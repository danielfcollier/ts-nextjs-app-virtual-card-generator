import { render } from '@testing-library/react';
import History from '@/pages/[name]';

it('Snapshot of Card [name] page unchanged', () => {
  const { container } = render(<History />);
  expect(container).toMatchSnapshot();
});
