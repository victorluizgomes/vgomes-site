import { render } from '@testing-library/react';

import NftsHeader from './nfts-header';

describe('NftsHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NftsHeader />);
    expect(baseElement).toBeTruthy();
  });
});
