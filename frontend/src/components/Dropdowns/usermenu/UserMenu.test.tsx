import { fireEvent } from '@testing-library/react';
import store from '../../../store';
import { INITIAL_STATE } from '../../../store/slices/auth';
import { renderWithProviders } from '../../../test-utils';
import NavUserMenu from './UserMenu';

describe('NavUserMenu component', () => {
  test('should render avatar and menu options', () => {
    const { getByTestId, getByText } = renderWithProviders(<NavUserMenu />);

    const avatarElement = getByTestId('nav-avatar');
    expect(avatarElement).toBeInTheDocument();

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
    const { getByText } = renderWithProviders(<NavUserMenu />);
    const logoutLink = getByText('Logout');
    fireEvent.click(logoutLink);
    expect(localStorage.clear).toHaveBeenCalled();
    expect(store.getState().auth.token).toEqual(INITIAL_STATE.token);
    expect(store.getState().auth.user).toEqual(INITIAL_STATE.user);
  });

  test('should navigate to correct link when clicked', () => {
    const { getByText } = renderWithProviders(<NavUserMenu />);

    const createGistLink = getByText('Create Gist');
    fireEvent.click(createGistLink);
    expect(window.location.pathname).toBe('/create-gist');

    const myGistsLink = getByText('My Gists');
    fireEvent.click(myGistsLink);
    expect(window.location.pathname).toBe('/my-gists');

    const starredGistsLink = getByText('Starred Gists');
    fireEvent.click(starredGistsLink);
    expect(window.location.pathname).toBe('/starred-gists');

    const profileLink = getByText('Profile');
    fireEvent.click(profileLink);
    expect(window.location.pathname).toBe('/profile');
  });
});
