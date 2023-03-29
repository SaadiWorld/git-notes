import Loader from '.';
import { renderWithProviders } from '../../test-utils';

describe('Loader', () => {
  it('should render the loader component', () => {
    const { getByRole, getByText } = renderWithProviders(<Loader />);
    const loaderElement = getByRole('status');
    expect(loaderElement).toBeInTheDocument();

    const loadingText = getByText('Loading...');
    expect(loadingText).toBeInTheDocument();
  });
});