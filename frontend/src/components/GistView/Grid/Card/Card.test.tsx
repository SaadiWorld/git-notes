import Card from '.';
import { renderWithProviders } from '../../../../test-utils';

const props = {
  id: '1234654312346543',
  fileName: 'test_file.ts',
  avatar: 'https://gravatar.com/avatar/5f597accccf48fad01c46cacd21bf5fc?s=400&d=robohash&r=x',
  ownerName: 'Saad Salman',
  time: 'one day ago'
};

describe('Card component', () => {
  test('renders correctly', () => {
    const { getByAltText, getByTestId } = renderWithProviders(<Card {...props} />);
    const card = getByTestId('gist-card');
    expect(card).toBeInTheDocument();
    expect(card).toHaveTextContent(props.ownerName);
    expect(card).toHaveTextContent(props.time);
    expect(card).toHaveTextContent(props.fileName);
    expect(getByAltText('avatar')).toHaveAttribute('src', props.avatar);
  });

  test('should have the desired styles', () => {
    const { getByTestId } = renderWithProviders(<Card {...props} />);
    expect(getByTestId('gist-card')).toHaveClass('card card-compact w-full bg-base-100 shadow-xl mb-4');
  });

});
