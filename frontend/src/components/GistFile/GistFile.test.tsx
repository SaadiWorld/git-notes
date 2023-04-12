import { fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils';
import GistFile from '.';

describe('YourComponent', () => {
  const handleFileChange = jest.fn();
  const handleFileRemoval = jest.fn();

  const propsA = {
    fileIndex: 0,
    fileName: 'test.txt',
    content: 'This is the content of the test file',
    showDeleteBtn: true,
    handleFileChange: handleFileChange,
    handleFileRemoval: handleFileRemoval,
  };

  const propsB = {
    ...propsA,
    showDeleteBtn: false,
  };

  test('should render the input and textarea with the correct values along with Delete button', () => {
    const { getByRole, getByPlaceholderText } = renderWithProviders(<GistFile {...propsA} />);
    expect(getByPlaceholderText('Filename including extension...')).toHaveValue(propsA.fileName);
    expect(getByPlaceholderText('Content...')).toHaveValue(propsA.content);
    expect(getByRole('button', { name: 'Delete' })).toBeInTheDocument();
  });

  test('should call the handleFileChange function when the input or textarea values change', () => {
    const { getByPlaceholderText } = renderWithProviders(<GistFile {...propsA} />);

    fireEvent.change(getByPlaceholderText('Filename including extension...'), {
      target: { value: 'new-test.txt' }
    });
    expect(handleFileChange).toHaveBeenCalledWith('filename', 'new-test.txt', propsA.fileIndex);

    fireEvent.change(getByPlaceholderText('Content...'), {
      target: { value: 'This is the new content of the test file' }
    });
    expect(handleFileChange).toHaveBeenCalledWith('content', 'This is the new content of the test file', propsA.fileIndex);
  });

  test('should call the handleFileRemoval function when the Delete button is clicked', () => {
    const { getByRole } = renderWithProviders(<GistFile {...propsA} />);
    fireEvent.click(getByRole('button', { name: 'Delete' }));
    expect(handleFileRemoval).toHaveBeenCalledWith(propsA.fileIndex);
  });

  test('should not render the Delete button if flag is false', () => {
    const { queryByRole } = renderWithProviders(<GistFile {...propsB} />);
    expect(queryByRole('button', { name: 'Delete' })).not.toBeInTheDocument();
  });
});
