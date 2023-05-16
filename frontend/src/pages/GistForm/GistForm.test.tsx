import { fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/lib/node';
import { Route, Routes } from 'react-router-dom';
import GistForm from '.';
import { renderWithProviders } from '../../test-utils';
import { APP_STATE_MOCK } from '../../__mocks__/app';
import { AUTH_STATE_MOCK } from '../../__mocks__/auth';
import { GISTS } from '../../__mocks__/common';

export const handlers = [
  rest.get(`https://api.github.com/gists/${GISTS[0].id}`, (req, res, ctx) => {
    return res(ctx.status(204), ctx.json(GISTS[0]), ctx.delay(150))
  }),
]
const server = setupServer(...handlers)
// Enable API mocking before tests.
beforeAll(() => server.listen())
// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())
// Disable API mocking after the tests are done.
afterAll(() => server.close())


describe('Gist Form', () => {

  test('renders a loader when app is loading', () => {
    const { getByText, getByRole } = renderWithProviders(
      <GistForm />, 
      { 
        preloadedState: { 
          auth: AUTH_STATE_MOCK, 
          app: {
            ...APP_STATE_MOCK,
            validationStates: {
              ...APP_STATE_MOCK.validationStates,
              isLoading: true,
            }
          }
        }
      }
    );
    const loaderElement = getByRole('status');
    expect(loaderElement).toBeInTheDocument();
    const loadingText = getByText('Loading...');
    expect(loadingText).toBeInTheDocument();
  });

  test('should show correct number of file forms and delete buttons', () => {
    const { getByRole, queryAllByRole, queryAllByTestId } = renderWithProviders(
      <GistForm />, 
    );
    const addFileBtn = getByRole('button', { name: 'Add File' });
    // Initially
    expect(queryAllByTestId('file-form').length).toEqual(1);
    expect(queryAllByRole('button', { name: 'Delete' }).length).toEqual(0);
    expect(addFileBtn).toBeInTheDocument();
    // Adding One File
    fireEvent.click(addFileBtn);
    expect(queryAllByTestId('file-form').length).toEqual(2);
    expect(queryAllByRole('button', { name: 'Delete' }).length).toEqual(2);
    // Adding Two More Files
    fireEvent.click(addFileBtn);
    fireEvent.click(addFileBtn);
    expect(queryAllByTestId('file-form').length).toEqual(4);
    expect(queryAllByRole('button', { name: 'Delete' }).length).toEqual(4);
    // Removing One File
    fireEvent.click(queryAllByRole('button', { name: 'Delete' })[0]);
    expect(queryAllByTestId('file-form').length).toEqual(3);
    expect(queryAllByRole('button', { name: 'Delete' }).length).toEqual(3);
    // Removing Two More Files - Back to initial state
    fireEvent.click(queryAllByRole('button', { name: 'Delete' })[0]);
    fireEvent.click(queryAllByRole('button', { name: 'Delete' })[0]);
    expect(queryAllByTestId('file-form').length).toEqual(1);
    expect(queryAllByRole('button', { name: 'Delete' }).length).toEqual(0);
  })

  test('should not let the form submit if any of the content is empty', () => {
    const { getByRole, queryAllByRole, queryAllByTestId } = renderWithProviders(
      <GistForm />, 
    );
    const addFileBtn = getByRole('button', { name: 'Add File' });
    // Initially
    expect(queryAllByTestId('file-form').length).toEqual(1);
    expect(queryAllByRole('button', { name: 'Delete' }).length).toEqual(0);
    expect(addFileBtn).toBeInTheDocument();
    // Adding One File
    fireEvent.click(addFileBtn);
    expect(queryAllByTestId('file-form').length).toEqual(2);
    expect(queryAllByRole('button', { name: 'Delete' }).length).toEqual(2);
    // Adding Two More Files
    fireEvent.click(addFileBtn);
    fireEvent.click(addFileBtn);
    expect(queryAllByTestId('file-form').length).toEqual(4);
    expect(queryAllByRole('button', { name: 'Delete' }).length).toEqual(4);
    // Removing One File
    fireEvent.click(queryAllByRole('button', { name: 'Delete' })[0]);
    expect(queryAllByTestId('file-form').length).toEqual(3);
    expect(queryAllByRole('button', { name: 'Delete' }).length).toEqual(3);
    // Removing Two More Files - Back to initial state
    fireEvent.click(queryAllByRole('button', { name: 'Delete' })[0]);
    fireEvent.click(queryAllByRole('button', { name: 'Delete' })[0]);
    expect(queryAllByTestId('file-form').length).toEqual(1);
    expect(queryAllByRole('button', { name: 'Delete' }).length).toEqual(0);
  })

  test('should render error when content is empty', () => {
    const { getByRole, getByTestId, queryByTestId, getByPlaceholderText } = renderWithProviders(
      <GistForm />, 
    );
    const submitBtn = getByTestId('submit-btn');
    const addFileBtn = getByRole('button', { name: 'Add File' });
    // Initial state
    expect(queryByTestId('alert')).not.toBeInTheDocument();
    // Clicking submitBtn without filling content
    fireEvent.click(submitBtn);
    expect(getByTestId('alert')).toBeInTheDocument();
    expect(getByTestId('alert')).toHaveTextContent(/Contents can't be empty/i);
    // Filling contentand then clicking submitBtn
    const contentField = getByPlaceholderText('Content...');
    fireEvent.change(contentField, {
      target: {
        value: 'new content of file'
      }
    })
    fireEvent.click(submitBtn);
    expect(queryByTestId('alert')).not.toBeInTheDocument();
    // Adding a new file form which would then again have an empty content
    fireEvent.click(addFileBtn);
    fireEvent.click(submitBtn);
    expect(getByTestId('alert')).toBeInTheDocument();
    expect(getByTestId('alert')).toHaveTextContent(/Contents can't be empty/i);
  })

  test('should render error when filenames are not unique', () => {
    const { getByRole, getByTestId, queryByTestId, getAllByPlaceholderText } = renderWithProviders(
      <GistForm />, 
    );
    const submitBtn = getByTestId('submit-btn');
    const addFileBtn = getByRole('button', { name: 'Add File' });
    // Initial state
    expect(queryByTestId('alert')).not.toBeInTheDocument();
    // Adding one more field
    fireEvent.click(addFileBtn);
    // First filling content so that its error is not appeared
    const contentFields = getAllByPlaceholderText('Content...');
    fireEvent.change(contentFields[0], {
      target: {
        value: 'new content of file'
      }
    })
    fireEvent.change(contentFields[1], {
      target: {
        value: 'new content of file'
      }
    })
    // Filling both filenames with same value and then clicking submitBtn
    const fileNameFields = getAllByPlaceholderText('Filename including extension...');
    fireEvent.change(fileNameFields[0], {
      target: {
        value: 'file1.txt'
      }
    })
    fireEvent.change(fileNameFields[1], {
      target: {
        value: 'file1.txt'
      }
    })
    fireEvent.click(submitBtn);
    expect(getByTestId('alert')).toBeInTheDocument();
    expect(getByTestId('alert')).toHaveTextContent(/Contents must have unique filenames/i);
    // Making filenames different
    fireEvent.change(fileNameFields[1], {
      target: {
        value: 'file2.txt'
      }
    })
    fireEvent.click(submitBtn);
    expect(queryByTestId('alert')).not.toBeInTheDocument();
  })

  describe('Create Gist', () => {
    test('renders correct heading', () => {
      const { getByRole } = renderWithProviders(<GistForm />);
      const heading = getByRole('heading', { level: 2, name: /create gist/i });
      expect(heading).toBeInTheDocument();
    })

    test('should be able change description', () => {
      const { getByPlaceholderText } = renderWithProviders(<GistForm />);
      const descriptionField = getByPlaceholderText('Gist description...');
      expect(descriptionField).not.toHaveValue();
      fireEvent.change(descriptionField, {
        target: { value: 'This is the description of the gist' }
      });
      expect(descriptionField).toHaveValue('This is the description of the gist');
    });
  })

  describe('Edit Gist', () => {
    test('renders correct heading', async () => {
      const initialRoute = `/edit-gist/${GISTS[0].id}` 
      window.history.pushState({}, '', initialRoute);
      const { getByRole } = renderWithProviders(
        <Routes>
          <Route path="edit-gist/:id" element={<GistForm />} />
        </Routes>
        , 
        { 
          preloadedState: { 
            auth: AUTH_STATE_MOCK, 
            app: APP_STATE_MOCK,
          },
          initialEntries: [initialRoute]
        }
      );
      await waitFor(() => {
        const heading = getByRole('heading', { level: 2, name: /edit gist/i });
        expect(heading).toBeInTheDocument();
      })
    })

    test('should be able change description', async () => {
      const { getByPlaceholderText } = renderWithProviders(
        <Routes>
          <Route path="edit-gist/:id" element={<GistForm />} />
        </Routes>
        , 
        { 
          preloadedState: { 
            auth: AUTH_STATE_MOCK, 
            app: APP_STATE_MOCK,
          },
        }
      );
      await waitFor(() => {
        const descriptionField = getByPlaceholderText('Gist description...');
        expect(descriptionField).toHaveValue(GISTS[0].description);
        fireEvent.change(descriptionField, {
          target: { value: 'This is the description of the gist' }
        });
        expect(descriptionField).toHaveValue('This is the description of the gist');
      })
    });

    test('does not render gist content when error', async () => {
      const initialRoute = `/edit-gist/${GISTS[1].id}` 
      window.history.pushState({}, '', initialRoute);
      const { getByTestId, queryByTestId, queryByRole } = renderWithProviders(
        <Routes>
          <Route path="edit-gist/:id" element={<GistForm />} />
        </Routes>
        , 
        { 
          preloadedState: { 
            auth: AUTH_STATE_MOCK, 
            app: APP_STATE_MOCK,
          },
          initialEntries: [initialRoute]
        }
      );
  
      await waitFor(() => {
        const loaderElement = queryByRole('status');
        expect(loaderElement).not.toBeInTheDocument();
        const gistContent = queryByTestId('gist-content')
        expect(gistContent).not.toBeInTheDocument();
        const errorMessage = getByTestId('error-message')
        expect(errorMessage).toBeInTheDocument();
      })
    });
  })

});
