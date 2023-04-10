import { waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/lib/node';
import { Route, Routes } from 'react-router-dom';
import GistPage from '.';
import { renderWithProviders } from '../../test-utils';
import { APP_STATE_MOCK } from '../../__mocks__/app';
import { AUTH_STATE_MOCK } from '../../__mocks__/auth';
import { GISTS } from '../../__mocks__/common';

export const handlers = [
  rest.get(`https://api.github.com/gists/${GISTS[0].id}`, (req, res, ctx) => {
    return res(ctx.status(204), ctx.json(GISTS[0]), ctx.delay(150))
  }),
  rest.get(`https://api.github.com/gists/${GISTS[2].id}`, (req, res, ctx) => {
    return res(ctx.status(204), ctx.json(GISTS[2]), ctx.delay(150))
  })
]
const server = setupServer(...handlers)
// Enable API mocking before tests.
beforeAll(() => server.listen())
// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())
// Disable API mocking after the tests are done.
afterAll(() => server.close())


describe('Gist Page', () => {
  test('renders a loader when app is loading', () => {
    const { getByText, getByRole } = renderWithProviders(
      <GistPage />, 
      { 
        preloadedState: { 
        auth: AUTH_STATE_MOCK, 
        app: {
          ...APP_STATE_MOCK,
          validationStates: {
            ...APP_STATE_MOCK.validationStates,
            isLoading: true,
          }
        }
      }}
    );
    const loaderElement = getByRole('status');
    expect(loaderElement).toBeInTheDocument();
    const loadingText = getByText('Loading...');
    expect(loadingText).toBeInTheDocument();
  });

  test('renders gist content (with description) when gist is valid', async () => {
    const initialRoute = `/gist/${GISTS[0].id}` 
    window.history.pushState({}, '', initialRoute);
    const { getByTestId, queryByRole } = renderWithProviders(
      <Routes>
        <Route path="gist/:id" element={<GistPage />} />
      </Routes>
      , 
      { 
        preloadedState: { 
          auth: AUTH_STATE_MOCK, 
          app: APP_STATE_MOCK,
        },
        initialEntries: [initialRoute]
      }
    );

    await waitFor(() => {
      const loaderElement = queryByRole('status');
      expect(loaderElement).not.toBeInTheDocument();
      const gistContent = getByTestId('gist-content')
      expect(gistContent).toBeInTheDocument();
      const gistDescription = getByTestId('gist-description');
      expect(gistDescription).toBeInTheDocument();
    })
  });

  test('renders gist content (without description) when gist is valid', async () => {
    const initialRoute = `/gist/${GISTS[2].id}` 
    window.history.pushState({}, '', initialRoute);
    const { queryByTestId, getByTestId, queryByRole } = renderWithProviders(
      <Routes>
        <Route path="gist/:id" element={<GistPage />} />
      </Routes>
      , 
      { 
        preloadedState: { 
          auth: AUTH_STATE_MOCK, 
          app: APP_STATE_MOCK,
        },
        initialEntries: [initialRoute]
      }
    );

    await waitFor(() => {
      const loaderElement = queryByRole('status');
      expect(loaderElement).not.toBeInTheDocument();
      const gistContent = getByTestId('gist-content')
      expect(gistContent).toBeInTheDocument();
      const gistDescription = queryByTestId('gist-description');
      expect(gistDescription).not.toBeInTheDocument();
    })
  });

  test('does not render gist content when error', async () => {
    const initialRoute = `/gist/${GISTS[1].id}` 
    window.history.pushState({}, '', initialRoute);
    const { getByTestId, queryByTestId, queryByRole } = renderWithProviders(
      <Routes>
        <Route path="gist/:id" element={<GistPage />} />
      </Routes>
      , 
      { 
        preloadedState: { 
          auth: AUTH_STATE_MOCK, 
          app: APP_STATE_MOCK,
        },
        initialEntries: [initialRoute]
      }
    );

    await waitFor(() => {
      const loaderElement = queryByRole('status');
      expect(loaderElement).not.toBeInTheDocument();
      const gistContent = queryByTestId('gist-content')
      expect(gistContent).not.toBeInTheDocument();
      const errorMessage = getByTestId('error-message')
      expect(errorMessage).toBeInTheDocument();
    })
  });
});
