import { render } from '@testing-library/react';

import TopSection from './top-section';

describe('TopSection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TopSection />);
    expect(baseElement).toBeTruthy();
  });
});
