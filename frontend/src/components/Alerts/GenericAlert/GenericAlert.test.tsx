import { fireEvent } from '@testing-library/react';
import Alert from '.';
import { ALERT_VARIANTS } from '../../../types/common';
import { renderWithProviders } from '../../../test-utils';
import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

describe('Alert', () => {
  test('should render the message and icon correctly', () => {
    const { getByText, getByTestId } = renderWithProviders(<Alert message="This is a success message" variant={ALERT_VARIANTS.SUCCESS} />);
    const icon = getByTestId('icon');
    const message = getByText('This is a success message');
    expect(icon).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  });

  test('should call onClose when the close button is clicked', () => {
    const handleClose = jest.fn();
    const { getByText } = renderWithProviders(<Alert message="This is a warning message" variant={ALERT_VARIANTS.WARNING} onClose={handleClose} />);
    const closeButton = getByText('X')
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('should not render the close button if onClose is not provided', () => {
    const { queryByText } = renderWithProviders(<Alert message="This is an error message" variant={ALERT_VARIANTS.ERROR} />);
    const closeButton = queryByText('X')
    expect(closeButton).not.toBeInTheDocument();
  });

  describe('should render the correct icon for each variant', () => {
    test('SUCCESS', () => {
      const { getByTestId } = renderWithProviders(<Alert message="This is a success message" variant={ALERT_VARIANTS.SUCCESS} />);
      const icon = getByTestId('icon');
      expect(icon).toHaveAttribute('data-icon', 'check-circle');
    })

    test('WARNING', () => {
      const { getByTestId } = renderWithProviders(<Alert message="This is a warning message" variant={ALERT_VARIANTS.WARNING} />);
      const icon = getByTestId('icon');
      expect(icon).toHaveAttribute('data-icon', 'exclamation-triangle');
    })

    test('ERROR', () => {
      const { getByTestId } = renderWithProviders(<Alert message="This is an error message" variant={ALERT_VARIANTS.ERROR} />);
      const icon = getByTestId('icon');
      expect(icon).toHaveAttribute('data-icon', 'times-circle');
    })

    test('INFO', () => {
      const { getByTestId } = renderWithProviders(<Alert message="This is an info message" variant={ALERT_VARIANTS.INFO} />);
      const icon = getByTestId('icon');
      expect(icon).toHaveAttribute('data-icon', 'info-circle');
    })
  });
});