import { fireEvent } from '@testing-library/react';
import reducer, { resetAuthData } from '../../../store/slices/auth';
import { renderWithProviders } from '../../../test-utils';
import { AUTH_INITIAL_STATE, AUTH_STATE_MOCK } from '../../../__mocks__/auth';
import UserMenu from '.';
import { APP_STATE_MOCK } from '../../../__mocks__/app';

describe('UserMenu component', () => {
  test('render avatar and should not render menu options', () => {
    const { getByTestId, queryByText } = renderWithProviders(<UserMenu />);

    const avatarElement = getByTestId('nav-avatar');
    expect(avatarElement).toBeInTheDocument();

    const createGistLink = queryByText('Create Gist');
    expect(createGistLink).not.toBeInTheDocument();

    const myGistsLink = queryByText('My Gists');
    expect(myGistsLink).not.toBeInTheDocument();

    const starredGistsLink = queryByText('Starred Gists');
    expect(starredGistsLink).not.toBeInTheDocument();

    const profileLink = queryByText('Profile');
    expect(profileLink).not.toBeInTheDocument();

    const logoutLink = queryByText('Logout');
    expect(logoutLink).not.toBeInTheDocument();
  });

  test('should render menu options when avatar is clicked', () => {
    const { getByTestId, getByText } = renderWithProviders(<UserMenu />);

    const avatarElement = getByTestId('nav-avatar');
    fireEvent.click(avatarElement);

    const createGistLink = getByText('Create Gist');
    expect(createGistLink).toBeInTheDocument();

    const myGistsLink = getByText('My Gists');
    expect(myGistsLink).toBeInTheDocument();

    const starredGistsLink = getByText('Starred Gists');
    expect(starredGistsLink).toBeInTheDocument();

    const profileLink = getByText('Profile');
    expect(profileLink).toBeInTheDocument();

    const logoutLink = getByText('Logout');
    expect(logoutLink).toBeInTheDocument();
  });

  test('should handle logout', () => {
    jest.spyOn(Storage.prototype, 'clear');
    const { getByText, getByTestId, store } = renderWithProviders(<UserMenu />, { preloadedState: { auth: AUTH_STATE_MOCK, app: APP_STATE_MOCK } });
    const authState = store.getState().auth;
    expect(authState.token).toEqual(AUTH_STATE_MOCK.token);
    expect(authState.user).toEqual(AUTH_STATE_MOCK.user);
    expect(JSON.stringify(authState)).toEqual(JSON.stringify(AUTH_STATE_MOCK));

    const avatarElement = getByTestId('nav-avatar');
    fireEvent.click(avatarElement);
    const logoutLink = getByText('Logout');
    fireEvent.click(logoutLink);
    expect(localStorage.clear).toHaveBeenCalled();

    const authStateAfterClear = store.getState().auth;
    expect(authStateAfterClear.token).toEqual(AUTH_INITIAL_STATE.token);
    expect(authStateAfterClear.user).toEqual(AUTH_INITIAL_STATE.user);
    expect(JSON.stringify(authStateAfterClear)).toEqual(JSON.stringify(AUTH_INITIAL_STATE));

  });

  test('should navigate to correct link when clicked', () => {
    const { getByText, getByTestId } = renderWithProviders(<UserMenu />);
    const avatarElement = getByTestId('nav-avatar');

    fireEvent.click(avatarElement);
    const createGistLink = getByText('Create Gist');
    fireEvent.click(createGistLink);
    expect(window.location.pathname).toBe('/create-gist');

    fireEvent.click(avatarElement);
    const myGistsLink = getByText('My Gists');
    fireEvent.click(myGistsLink);
    expect(window.location.pathname).toBe('/my-gists');

    fireEvent.click(avatarElement);
    const starredGistsLink = getByText('Starred Gists');
    fireEvent.click(starredGistsLink);
    expect(window.location.pathname).toBe('/starred-gists');

    fireEvent.click(avatarElement);
    const profileLink = getByText('Profile');
    fireEvent.click(profileLink);
    expect(window.location.pathname).toBe('/profile');
  });

  test('should close the menu when clicking outside', () => {
    const { getByTestId, queryByTestId } = renderWithProviders(<UserMenu />);
    fireEvent.click(getByTestId('nav-avatar'));
    expect(getByTestId('user-menu-body')).toBeInTheDocument();
    fireEvent.click(document.body);
    expect(queryByTestId('user-menu-body')).not.toBeInTheDocument();
  });
});
