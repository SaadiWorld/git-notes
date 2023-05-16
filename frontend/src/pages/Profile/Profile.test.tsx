import { fireEvent } from "@testing-library/dom";
import Profile from ".";
import { renderWithProviders } from "../../test-utils";
import { APP_STATE_MOCK } from "../../__mocks__/app";
import { AUTH_STATE_MOCK } from "../../__mocks__/auth";

describe('Profile', () => {
  test('renders the component with expected values', () => {
    const { getByRole, getByAltText, getByText } = renderWithProviders(<Profile />, { preloadedState: { auth: AUTH_STATE_MOCK, app: APP_STATE_MOCK }});
    expect(getByAltText('avatar')).toHaveAttribute('src', AUTH_STATE_MOCK.user?.avatar_url);
    expect(getByText(`${AUTH_STATE_MOCK.user?.name}`)).toBeInTheDocument();
    expect(getByText(`${AUTH_STATE_MOCK.user?.login}`)).toBeInTheDocument();
    expect(getByText(`${AUTH_STATE_MOCK.user?.followers} followers · ${AUTH_STATE_MOCK.user?.following} following`)).toBeInTheDocument();
    expect(getByText(`${AUTH_STATE_MOCK.user?.public_gists} gists · ${AUTH_STATE_MOCK.user?.public_repos} repos`)).toBeInTheDocument();
    expect(getByText(`${AUTH_STATE_MOCK.user?.company}`)).toBeInTheDocument();
    expect(getByText(`${AUTH_STATE_MOCK.user?.location}`)).toBeInTheDocument();
    expect(getByRole('link', { name: `${AUTH_STATE_MOCK.user?.email}` })).toHaveAttribute('href', `mailto:${AUTH_STATE_MOCK.user?.email}`);
    expect(getByRole('link', { name: `${AUTH_STATE_MOCK.user?.blog}` })).toHaveAttribute('href', `${AUTH_STATE_MOCK.user?.blog}`);
  });

  test('navigates to My Gists Page', () => {
    const { getByRole } = renderWithProviders(<Profile />, { preloadedState: { auth: AUTH_STATE_MOCK, app: APP_STATE_MOCK }});
    const myGistsPageLink = getByRole('link', { name: 'View Gists' })
    expect(myGistsPageLink).toHaveAttribute('href', '/my-gists');
    fireEvent.click(myGistsPageLink);
    expect(window.location.pathname).toBe('/my-gists');
  });
});