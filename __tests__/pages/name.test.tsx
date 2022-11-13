import { render } from '@testing-library/react';

import History from '@/pages/[name]';

it('Renders card [name] page without crashing', () => {
  render(<History />);
});
