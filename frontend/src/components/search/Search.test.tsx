import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils';
import Search from './Search';

describe('Search', () => {
  test('renders the input element', () => {
    renderWithProviders(<Search />);
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });

  test('updates the query state when the input value changes', () => {
    renderWithProviders(<Search />);
    const inputElement = screen.getByPlaceholderText('Search');
    fireEvent.change(inputElement, { target: { value: '1a2bc3d4e5f6g7h8' } });
    expect(inputElement).toHaveValue('1a2bc3d4e5f6g7h8');
  });

  test('does not navigate when Enter key is pressed with an empty query', () => {
    renderWithProviders(<Search />);
    const inputElement = screen.getByPlaceholderText('Search');
    fireEvent.change(inputElement, { target: { value: '' } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
    expect(window.location.pathname).toBe('/');
    expect(inputElement).toHaveValue('');
  });

  test('navigates to the correct URL when Enter key is pressed with a non-empty query', () => {
    renderWithProviders(<Search />);
    const inputElement = screen.getByPlaceholderText('Search');
    fireEvent.change(inputElement, { target: { value: '1a2bc3d4e5f6g7h8' } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
    expect(window.location.pathname).toBe('/gist/1a2bc3d4e5f6g7h8');
    expect(inputElement).toHaveValue('');
    expect(inputElement).not.toHaveFocus();
  });
});
