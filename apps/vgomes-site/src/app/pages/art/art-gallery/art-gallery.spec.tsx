import { render } from '@testing-library/react';

import ArtGallery from './art-gallery';

describe('ArtGallery', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ArtGallery />);
    expect(baseElement).toBeTruthy();
  });
});
