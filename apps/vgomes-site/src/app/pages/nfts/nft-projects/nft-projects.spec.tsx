import { render } from '@testing-library/react';

import NftProjects from './nft-projects';

describe('NftProjects', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NftProjects />);
    expect(baseElement).toBeTruthy();
  });
});
