import { render } from '@testing-library/react';

import AboutSection from './about-section';

describe('AboutSection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AboutSection />);
    expect(baseElement).toBeTruthy();
  });
});
