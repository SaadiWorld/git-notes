import { fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Fork from '.';
import Star from '.';
import { RootState } from '../../../store';
import { renderWithProviders } from '../../../test-utils';
import { FORKED_GIST_ID, FORK_MOCK_A, FORK_MOCK_B, SELECTED_GIST_ID_A, SELECTED_GIST_ID_B, STAR_MOCK_A, STAR_MOCK_B } from '../../../__mocks__/misc';

export const handlers = [
  rest.post(`https://api.github.com/gists/${SELECTED_GIST_ID_B}/forks`, (req, res, ctx) => {
    return res(ctx.json({
      id: FORKED_GIST_ID,
    }))
  }),
]

const server = setupServer(...handlers)
// Enable API mocking before tests.
beforeAll(() => server.listen())
// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())
// Disable API mocking after the tests are done.
afterAll(() => server.close())


describe('Fork component', () => {

  test('should render correctly', () => {
    const { getByTestId } = renderWithProviders(<Fork />);
    expect(getByTestId('fork-icon')).toBeInTheDocument();
  });

  test('should not render if gist is already FORKED', () => {
    const { queryByTestId } = renderWithProviders(<Star />, { preloadedState: FORK_MOCK_A as RootState });
    expect(queryByTestId('fork-icon')).not.toBeInTheDocument();
  });

  test('should render if gist is NOT FORKED', () => {
    const { getByTestId } = renderWithProviders(<Star />, { preloadedState: FORK_MOCK_B as RootState });
    expect(getByTestId('fork-icon')).toBeInTheDocument();
  });

  test('should FORK the gist on click', async () => {
    const {getByTestId } = renderWithProviders(<Star />, { preloadedState: FORK_MOCK_B as RootState });
    const forkIcon = getByTestId('fork-icon');
    expect(forkIcon).toBeInTheDocument();
    fireEvent.click(forkIcon);
    await waitFor(() => {
      expect(window.location.pathname).toBe(`/gist/${FORKED_GIST_ID}`)
    });
  });

});