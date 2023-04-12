import { waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/lib/node';
import LoginPage from '.';
import { renderWithProviders } from '../../test-utils';
import { AUTH_INITIAL_STATE, AUTH_STATE_MOCK } from '../../__mocks__/auth';

export const handlers = [
  rest.post('http://localhost:9000/login', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ token: AUTH_STATE_MOCK.token, user: AUTH_STATE_MOCK.user}))
  }),
]
const server = setupServer(...handlers)
// Enable API mocking before tests.
beforeAll(() => server.listen())
// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())
// Disable API mocking after the tests are done.
afterAll(() => server.close())


describe('Login Page', () => {
  test('should attemptLogin if there is code', async () => {
    const initialRoute = `/login?code=MY_CODE` 
    window.history.pushState({}, '', initialRoute);
    jest.spyOn(Storage.prototype, 'setItem');
    const { store } = renderWithProviders(<LoginPage />);
    const authState = store.getState().auth;
    expect(authState.token).toEqual(AUTH_INITIAL_STATE.token);
    expect(authState.user).toEqual(AUTH_INITIAL_STATE.user);

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith('token', AUTH_STATE_MOCK.token);
      expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(AUTH_STATE_MOCK.user));
      const authStateAfterLogin = store.getState().auth;
      expect(authStateAfterLogin.token).toEqual(AUTH_STATE_MOCK.token);
      expect(authStateAfterLogin.user).toEqual(AUTH_STATE_MOCK.user);
    })
  });

  test('should not attemptLogin if there is no code', async () => {
    const initialRoute = `/login` 
    window.history.pushState({}, '', initialRoute);
    jest.spyOn(Storage.prototype, 'setItem');
    const { store } = renderWithProviders(<LoginPage />);
    const authState = store.getState().auth;
    expect(authState.token).toEqual(AUTH_INITIAL_STATE.token);
    expect(authState.user).toEqual(AUTH_INITIAL_STATE.user);

    await waitFor(() => {
      expect(localStorage.setItem).not.toHaveBeenCalledWith('token', AUTH_STATE_MOCK.token);
      expect(localStorage.setItem).not.toHaveBeenCalledWith('user', JSON.stringify(AUTH_STATE_MOCK.user));
      const authStateAfterLoginFail = store.getState().auth;
      expect(authStateAfterLoginFail.token).toEqual(AUTH_INITIAL_STATE.token);
      expect(authStateAfterLoginFail.user).toEqual(AUTH_INITIAL_STATE.user);
    })
  });
});
