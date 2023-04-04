import { fireEvent } from '@testing-library/react';
import Grid from '.';
import { renderWithProviders } from '../../../test-utils';
import { APP_STATE_MOCK } from '../../../__mocks__/app';
import { AUTH_STATE_MOCK } from '../../../__mocks__/auth';
import { GISTS } from '../../../__mocks__/common';

describe('Grid Component', () => {
  test('should render the grid component', () => {
    const { getByTestId } = renderWithProviders(<Grid />);
    expect(getByTestId('grid-view')).toBeInTheDocument();
  });

  test('should have the desired styles', () => {
    const { getByTestId } = renderWithProviders(<Grid />);
    expect(getByTestId('grid-view')).toHaveClass('gap-5 lg:grid-cols-3 grid grid-cols-1 sm:grid-cols-2');
  });

  test('renders the correct number of gists', () => {
    const { getAllByTestId } = renderWithProviders(<Grid />, { preloadedState: { auth: AUTH_STATE_MOCK, app: APP_STATE_MOCK }});
    expect(getAllByTestId('gist-card')).toHaveLength(GISTS.length);
  });

  test('navigates to the correct gist when clicked', () => {
    const randomElementIndex = Math.floor(Math.random() * GISTS.length);
    const { getAllByTestId } = renderWithProviders(<Grid />, { preloadedState: { auth: AUTH_STATE_MOCK, app: APP_STATE_MOCK }});
    fireEvent.click(getAllByTestId('gist-card')[randomElementIndex]);
    expect(window.location.pathname).toBe(`/gist/${GISTS[randomElementIndex].id}`)
  });
}); 