import { render, screen } from '@testing-library/react';

import Generate from '@/pages/generate';

it('Renders Generate page without crashing', () => {
  render(<Generate />);
});

it('renders welcome message', () => {
  render(<Generate />);

  const heading = screen.getByRole('heading', {
    name: 'QR Code Image Generator',
  });

  expect(heading).toBeInTheDocument();
});