import GistDetail from '.';
import { renderWithProviders } from '../../test-utils';

const props = {
  fileName: 'test_file.ts',
  avatar: 'https://gravatar.com/avatar/5f597accccf48fad01c46cacd21bf5fc?s=400&d=robohash&r=x',
  ownerName: 'Saad Salman',
  time: 'one day ago'
};

describe('GistDetail component', () => {
  test('renders the owner name and file name', () => {
    const { getByText, getByTestId } = renderWithProviders(<GistDetail {...props} />);
    const completeElement = getByTestId('detail-info');
    const fileNameElement = getByText('test_file.ts');
    expect(completeElement.textContent).toBe('Saad Salman / test_file.ts')
    expect(fileNameElement.textContent).toBe('test_file.ts');
    expect(fileNameElement).toHaveStyle('font-weight: bold');
  });

  test('renders the time', () => {
    const { getByText } = renderWithProviders(<GistDetail {...props} />);
    expect(getByText('one day ago')).toBeInTheDocument();
  });

  test('renders the avatar', () => {
    const { getByAltText } = renderWithProviders(<GistDetail {...props} />);
    expect(getByAltText('avatar')).toHaveAttribute('src', 'https://gravatar.com/avatar/5f597accccf48fad01c46cacd21bf5fc?s=400&d=robohash&r=x');
  });
});
