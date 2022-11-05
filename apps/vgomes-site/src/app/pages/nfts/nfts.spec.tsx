import { render } from '@testing-library/react';

import Nfts from './nfts';

describe('Nfts', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Nfts />);
    expect(baseElement).toBeTruthy();
  });
});
