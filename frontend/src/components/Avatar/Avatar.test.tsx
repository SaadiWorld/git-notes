import Avatar from '.';
import { renderWithProviders } from '../../test-utils';

const imageUrl = 'https://gravatar.com/avatar/5f597accccf48fad01c46cacd21bf5fc?s=400&d=robohash&r=x'

describe('Avatar component', () => {
  test('renders the avatar image', () => {
    const { getByAltText } = renderWithProviders(<Avatar url={imageUrl} />);
    expect(getByAltText('avatar')).toBeInTheDocument();
  });

  it('applies default tailwind styles', () => {
    const { getByTestId } = renderWithProviders(<Avatar url={imageUrl} />);
    const avatarElement = getByTestId('avatar-container');
    expect(avatarElement).toHaveClass('w-10 h-10');
  });

  it('applies custom tailwind styles', () => {
    const { getByTestId } = renderWithProviders(<Avatar url={imageUrl} twWidth="w-16" twHeight="h-16" />);
    const avatarElement = getByTestId('avatar-container');
    expect(avatarElement).toHaveClass('w-16 h-16');
  });
});
