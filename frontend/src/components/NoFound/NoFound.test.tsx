import { fireEvent } from '@testing-library/react';
import NoFound from '.';
import { renderWithProviders } from '../../test-utils';

describe('NoFound', () => {
  test('renders 404 heading', () => {
    const { getByRole } = renderWithProviders(<NoFound />);
    const heading = getByRole('heading', { level: 1, name: /404/i });
    expect(heading).toBeInTheDocument();
  });

  test('renders error message', () => {
    const { getByText } = renderWithProviders(<NoFound />);
    const message = getByText(/sorry, we couldn't find this page/i);
    expect(message).toBeInTheDocument();
  });

  test('renders "Back to homepage" link', () => {
    const { getByRole } = renderWithProviders(<NoFound />);
    const link = getByRole('link', { name: /back to homepage/i });
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('/');
  });

  test('redirects to homepage when "Back to homepage" link is clicked', () => {
    const { getByRole } = renderWithProviders(<NoFound />);
    const link = getByRole('link', { name: /back to homepage/i });
    fireEvent.click(link);
    expect(window.location.pathname).toBe('/');
  });
});
