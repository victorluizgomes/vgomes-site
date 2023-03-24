import { render } from '@testing-library/react';

import ArtWrapper from './art-wrapper';

describe('ArtWrapper', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ArtWrapper />);
    expect(baseElement).toBeTruthy();
  });
});
