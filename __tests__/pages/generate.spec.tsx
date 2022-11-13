import { render } from '@testing-library/react';
import Generate from '@/pages/generate';

it('Snapshot of Generate page unchanged', () => {
  const { container } = render(<Generate />);
  expect(container).toMatchSnapshot();
});
