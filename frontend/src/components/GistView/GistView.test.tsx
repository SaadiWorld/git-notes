import { fireEvent } from '@testing-library/react';
import GistView from '.';
import reducer, { setGistView } from '../../store/slices/app';
import { renderWithProviders } from '../../test-utils';
import { GIST_VIEW } from '../../types/common';
import { APP_STATE_MOCK } from '../../__mocks__/app';
import { AUTH_STATE_MOCK } from '../../__mocks__/auth';

window.HTMLElement.prototype.scrollIntoView = function() {};

describe('Gist View Component', () => {
  test('should render the Gist View component', () => {
    const { getByTestId } = renderWithProviders(<GistView />);
    expect(getByTestId('gist-view-container')).toBeInTheDocument();
  });

  test('should render the correct view with correct state - GRID', () => {
    const { getByTestId, queryByTestId } = renderWithProviders(<GistView />, { preloadedState: { auth: AUTH_STATE_MOCK, app: {...APP_STATE_MOCK, gist_view: GIST_VIEW.GRID} }});
    expect(getByTestId('grid-view')).toBeInTheDocument();
    expect(getByTestId('grid-icon')).toHaveClass('text-primary');
    expect(queryByTestId('list-view')).not.toBeInTheDocument();
    expect(getByTestId('list-icon')).not.toHaveClass('text-primary');
  });

  test('should render the correct view with correct state - LIST', () => {
    const { getByTestId, queryByTestId } = renderWithProviders(<GistView />, { preloadedState: { auth: AUTH_STATE_MOCK, app: APP_STATE_MOCK }});
    expect(getByTestId('list-view')).toBeInTheDocument();
    expect(getByTestId('list-icon')).toHaveClass('text-primary');
    expect(queryByTestId('grid-view')).not.toBeInTheDocument();
    expect(getByTestId('grid-icon')).not.toHaveClass('text-primary');
  });

  test('clicking on the list icon changes the view to list', () => {
    const { getByTestId, queryByTestId } = renderWithProviders(<GistView />, { preloadedState: { auth: AUTH_STATE_MOCK, app: {...APP_STATE_MOCK, gist_view: GIST_VIEW.GRID} }});
    expect(getByTestId('grid-view')).toBeInTheDocument();
    const listIcon = getByTestId('list-icon');
    fireEvent.click(listIcon);
    expect(getByTestId('list-view')).toBeInTheDocument();
    expect(queryByTestId('grid-view')).not.toBeInTheDocument();
    expect(reducer({...APP_STATE_MOCK, gist_view: GIST_VIEW.GRID}, setGistView(GIST_VIEW.LIST))).toEqual(APP_STATE_MOCK)
  });

  test('clicking on the grid icon changes the view to grid', () => {
    const { getByTestId, queryByTestId } = renderWithProviders(<GistView />, { preloadedState: { auth: AUTH_STATE_MOCK, app: APP_STATE_MOCK }});
    expect(getByTestId('list-view')).toBeInTheDocument();
    const gridIcon = getByTestId('grid-icon');
    fireEvent.click(gridIcon);
    expect(getByTestId('grid-view')).toBeInTheDocument();
    expect(queryByTestId('list-view')).not.toBeInTheDocument();
    expect(reducer(APP_STATE_MOCK, setGistView(GIST_VIEW.GRID))).toEqual({...APP_STATE_MOCK, gist_view: GIST_VIEW.GRID})
  });
  
  test('clicking on the page link changes the page', () => {
    const { container } = renderWithProviders(<GistView />, { preloadedState: { auth: AUTH_STATE_MOCK, app: APP_STATE_MOCK }});
    const allPageLinks = container.getElementsByClassName('numbered-link');
    const randomElementIndex = Math.floor(Math.random() * (allPageLinks.length - 1) + 1);
    const pageLink = allPageLinks[randomElementIndex];
    expect(pageLink).not.toHaveClass('bg-primary')
    fireEvent.click(pageLink)
    expect(pageLink).toHaveClass('bg-primary')
  });
}); 