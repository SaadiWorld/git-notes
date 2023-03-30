import { fireEvent } from '@testing-library/react';
import GistActions from '.';
import { RootState } from '../../store';
import { INITIAL_STATE as APP_INITIAL_STATE } from '../../store/slices/app';
import { INITIAL_STATE as AUTH_INITIAL_STATE } from '../../store/slices/auth';
import { renderWithProviders } from '../../test-utils';
import { GIST_ACTIONS_MOCK_A, GIST_ACTIONS_MOCK_B } from '../../__mocks__/misc';


describe('GistAction component', () => {
  test('should not render any icon if user is not authenticated', () => {
    const { queryByTestId } = renderWithProviders(<GistActions />, { preloadedState: { auth: AUTH_INITIAL_STATE, app: APP_INITIAL_STATE}});
    expect(queryByTestId('star-icon')).not.toBeInTheDocument();
    expect(queryByTestId('fork-icon')).not.toBeInTheDocument();
    expect(queryByTestId('pencil-icon')).not.toBeInTheDocument();
    expect(queryByTestId('delete-icon')).not.toBeInTheDocument();
  });

  test('should render Star and Fork when the user is not the owner of the gist', () => {
    const { getByTestId, queryByTestId } = renderWithProviders(<GistActions />, { preloadedState: GIST_ACTIONS_MOCK_A as RootState});
    expect(getByTestId('star-icon')).toBeInTheDocument();
    expect(getByTestId('fork-icon')).toBeInTheDocument();
    expect(queryByTestId('pencil-icon')).not.toBeInTheDocument();
    expect(queryByTestId('delete-icon')).not.toBeInTheDocument();
  });

  test('should render PencilSquareIcon and Delete when the user is the owner of the gist', () => {
    const { getByTestId, queryByTestId } = renderWithProviders(<GistActions />, { preloadedState: GIST_ACTIONS_MOCK_B as RootState});
    expect(getByTestId('pencil-icon')).toBeInTheDocument();
    expect(getByTestId('delete-icon')).toBeInTheDocument();
    expect(queryByTestId('star-icon')).not.toBeInTheDocument();
    expect(queryByTestId('fork-icon')).not.toBeInTheDocument();
  });

  test('should navigate to the edit-gist page when the PencilSquareIcon is clicked', () => {
    const { getByTestId } = renderWithProviders(<GistActions />, { preloadedState: GIST_ACTIONS_MOCK_B as RootState});
    const pencilIcon = getByTestId('pencil-icon');
    fireEvent.click(pencilIcon);
    expect(window.location.pathname).toBe(`/edit-gist/${GIST_ACTIONS_MOCK_B.app.selectedGist.id}`);
  });
});
