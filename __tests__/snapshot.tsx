import { render } from '@testing-library/react';
import Generate from '@/pages/generate';

it('renders homepage unchanged', () => {
  const { container } = render(<Generate />);
  expect(container).toMatchSnapshot();
});
