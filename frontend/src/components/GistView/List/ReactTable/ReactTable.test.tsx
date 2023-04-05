import { fireEvent } from '@testing-library/react';
import Table from '.';
import { renderWithProviders } from '../../../../test-utils';
import { APP_STATE_MOCK } from '../../../../__mocks__/app';
import { AUTH_STATE_MOCK } from '../../../../__mocks__/auth';
import { GISTS } from '../../../../__mocks__/common';

describe('List/React Table Component', () => {
  test('should render the list component', () => {
    const { getByTestId } = renderWithProviders(<Table />);
    expect(getByTestId('list-view')).toBeInTheDocument();
  });

  test('renders the correct number of gists', () => {
    const { getAllByTestId } = renderWithProviders(<Table />, { preloadedState: { auth: AUTH_STATE_MOCK, app: APP_STATE_MOCK }});
    expect(getAllByTestId('gist-row')).toHaveLength(GISTS.length);
  });

  test('navigates to the correct gist when clicked', () => {
    const randomElementIndex = Math.floor(Math.random() * GISTS.length);
    const { getAllByTestId } = renderWithProviders(<Table />, { preloadedState: { auth: AUTH_STATE_MOCK, app: APP_STATE_MOCK }});
    fireEvent.click(getAllByTestId('gist-row')[randomElementIndex]);
    expect(window.location.pathname).toBe(`/gist/${GISTS[randomElementIndex].id}`)
  });
}); 