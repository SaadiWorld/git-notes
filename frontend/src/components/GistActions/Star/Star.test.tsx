import { fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Star from '.';
import { RootState } from '../../../store';
import { renderWithProviders } from '../../../test-utils';
import { SELECTED_GIST_ID_A, SELECTED_GIST_ID_B, STAR_MOCK_A, STAR_MOCK_B } from '../../../__mocks__/misc';

export const handlers = [
  rest.put(`https://api.github.com/gists/${SELECTED_GIST_ID_A}/star`, (req, res, ctx) => {
    return res(ctx.status(204))
  }),
  rest.delete(`https://api.github.com/gists/${SELECTED_GIST_ID_B}/star`, (req, res, ctx) => {
    return res(ctx.status(204))
  }),
]

const server = setupServer(...handlers)
// Enable API mocking before tests.
beforeAll(() => server.listen())
// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())
// Disable API mocking after the tests are done.
afterAll(() => server.close())


describe('Star component', () => {

  test('should render correctly', () => {
    const { getByTestId } = renderWithProviders(<Star />);
    expect(getByTestId('star-icon')).toBeInTheDocument();
  });

  test('should have the correct class name based on the star status - UNSTARRED', () => {
    const { getByTestId } = renderWithProviders(<Star />, { preloadedState: STAR_MOCK_A as RootState });
    expect(getByTestId('star-icon')).not.toHaveClass('text-yellow-400 fill-yellow-400');
  });

  test('should have the correct class name based on the star status - STARRED', () => {
    const { getByTestId } = renderWithProviders(<Star />, { preloadedState: STAR_MOCK_B as RootState });
    expect(getByTestId('star-icon')).toHaveClass('text-yellow-400 fill-yellow-400');
  });

  test('should STAR the UNSTARRED on click', async () => {
    const {getByTestId } = renderWithProviders(<Star />, { preloadedState: STAR_MOCK_A as RootState });
    const starIcon = getByTestId('star-icon');
    expect(starIcon).not.toHaveClass('text-yellow-400 fill-yellow-400');
    fireEvent.click(starIcon);
    await waitFor(() => {
      expect(starIcon).toHaveClass('text-yellow-400 fill-yellow-400');
    })
  });

  test('should UNSTAR the STARRED on click', async () => {
    const { getByTestId } = renderWithProviders(<Star />, { preloadedState: STAR_MOCK_B as RootState });
    const starIcon = getByTestId('star-icon');
    expect(starIcon).toHaveClass('text-yellow-400 fill-yellow-400');
    fireEvent.click(starIcon);
    await waitFor(() => {
      expect(starIcon).not.toHaveClass('text-yellow-400 fill-yellow-400');
    })
  });
});