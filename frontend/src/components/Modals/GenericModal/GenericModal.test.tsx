import { fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../../test-utils';
import Modal from '.';

const onClick = jest.fn();

describe('Modal', () => {
  test('initially does not render content of modal', () => {
    const { getByTestId, queryByText } = renderWithProviders(<Modal title="Test Modal" subtitle="This is a test modal" onClick={onClick} />);
    const modalToggle = getByTestId('generic-modal') as HTMLInputElement;
    expect(modalToggle.checked).toBe(false);
    expect(queryByText('Test Modal')).not.toBeInTheDocument();
    expect(queryByText('This is a test modal')).not.toBeInTheDocument();
  });

  test('renders modal', () => {
    const { getByTestId, getByText } = renderWithProviders(<Modal title="Test Modal" subtitle="This is a test modal" onClick={onClick} />);
    const modalToggle = getByTestId('generic-modal') as HTMLInputElement;
    fireEvent.click(modalToggle);
    expect(modalToggle.checked).toBe(true);
    expect(getByText('Test Modal')).toBeInTheDocument();
    expect(getByText('This is a test modal')).toBeInTheDocument();
  });


  test('calls the onClick function when the Yes button is clicked and closes modal', () => {
    const { getByTestId, getByText, queryByText } = renderWithProviders(<Modal title="Test Modal" subtitle="This is a test modal" onClick={onClick} />);
    const modalToggle = getByTestId('generic-modal') as HTMLInputElement;
    fireEvent.click(modalToggle);
    const yesButton = getByText('Yes');
    fireEvent.click(yesButton);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(modalToggle.checked).toBe(false);
    expect(queryByText('Test Modal')).not.toBeInTheDocument();
    expect(queryByText('This is a test modal')).not.toBeInTheDocument();
  });

  test('closes the modal when the close icon is clicked', () => {
    const { getByTestId, getByLabelText, queryByText } = renderWithProviders(<Modal title="Test Modal" subtitle="This is a test modal" onClick={onClick} />);
    const modalToggle = getByTestId('generic-modal') as HTMLInputElement;
    fireEvent.click(modalToggle);
    const closeButton = getByLabelText('X');
    fireEvent.click(closeButton);
    expect(modalToggle.checked).toBe(false);
    expect(queryByText('Test Modal')).not.toBeInTheDocument();
    expect(queryByText('This is a test modal')).not.toBeInTheDocument();
  });
});
