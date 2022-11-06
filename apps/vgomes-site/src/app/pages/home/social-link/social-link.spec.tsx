import { render } from '@testing-library/react';

import SocialLink from './social-link';

describe('SocialLink', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SocialLink />);
    expect(baseElement).toBeTruthy();
  });
});
