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
    const fileNameElement = getByText(props.fileName);
    expect(completeElement.textContent).toBe(`${props.ownerName} / ${props.fileName}`)
    expect(fileNameElement.textContent).toBe(props.fileName);
  });

  test('renders file name as bold', () => {
    const { getByText } = renderWithProviders(<GistDetail {...props} />);
    const fileNameElement = getByText(props.fileName);
    expect(fileNameElement).toHaveStyle('font-weight: bold');
  });

  test('truncates the long text', () => {
    const { getByTestId } = renderWithProviders(<GistDetail {...props} />);
    const completeElement = getByTestId('detail-info');
    expect(completeElement).toHaveClass('overflow-hidden text-ellipsis whitespace-nowrap');
  });

  test('renders the time', () => {
    const { getByText } = renderWithProviders(<GistDetail {...props} />);
    expect(getByText(props.time)).toBeInTheDocument();
  });

  test('renders the avatar', () => {
    const { getByAltText } = renderWithProviders(<GistDetail {...props} />);
    expect(getByAltText('avatar')).toHaveAttribute('src', props.avatar);
  });
});
