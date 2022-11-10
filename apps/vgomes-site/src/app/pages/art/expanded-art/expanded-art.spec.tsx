import { render } from '@testing-library/react';

import ExpandedArt from './expanded-art';

describe('ExpandedArt', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ExpandedArt />);
    expect(baseElement).toBeTruthy();
  });
});
