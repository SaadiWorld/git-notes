import { fireEvent } from '@testing-library/react';
import Pagination from '.';
import { renderWithProviders } from '../../../../test-utils';

describe('Pagination', () => {
  const totalRows = 50;
  const rowsPerPage = 10;
  const pageChangeHandler = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders', () => {
    renderWithProviders(<Pagination totalRows={totalRows} rowsPerPage={rowsPerPage} pageChangeHandler={pageChangeHandler} />);
  });

  test('displays the correct number of pages', () => {
    const { container } = renderWithProviders(<Pagination totalRows={totalRows} rowsPerPage={rowsPerPage} pageChangeHandler={pageChangeHandler} />);
    const pageCount = Math.ceil(totalRows / rowsPerPage);
    const allPagesLinkCount = container.getElementsByClassName('numbered-link').length
    expect(allPagesLinkCount).toEqual(pageCount);
  });

  test('calls the pageChangeHandler when a page is clicked', () => {
    const { getByLabelText } = renderWithProviders(<Pagination totalRows={totalRows} rowsPerPage={rowsPerPage} pageChangeHandler={pageChangeHandler} />);
    const nextPageButton = getByLabelText('Next page');
    fireEvent.click(nextPageButton);
    expect(pageChangeHandler).toHaveBeenCalledWith(2);
  });

  test('displays no pagination when 0 pages', () => {
    const { container, queryByRole } = renderWithProviders(<Pagination totalRows={0} rowsPerPage={rowsPerPage} pageChangeHandler={pageChangeHandler} />);
    const pagination = queryByRole('navigation');
    const allPagesLinkCount = container.getElementsByClassName('numbered-link').length
    expect(allPagesLinkCount).toEqual(0);
    expect(pagination).toBeNull();
  });
});
