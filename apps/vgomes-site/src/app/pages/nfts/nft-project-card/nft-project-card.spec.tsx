import { render } from '@testing-library/react';

import NftProjectCard from './nft-project-card';

describe('NftProjectCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NftProjectCard />);
    expect(baseElement).toBeTruthy();
  });
});
