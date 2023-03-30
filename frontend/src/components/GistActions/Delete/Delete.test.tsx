import { fireEvent, waitFor } from "@testing-library/react";
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Delete from ".";
import { RootState } from "../../../store";
import { renderWithProviders } from "../../../test-utils";
import { GIST_ACTIONS_MOCK_B } from "../../../__mocks__/misc";

export const handlers = [
  rest.delete(`https://api.github.com/gists/${GIST_ACTIONS_MOCK_B.app.selectedGist.id}`, (req, res, ctx) => {
    return res(ctx.status(204), ctx.delay(150))
  })
]
const server = setupServer(...handlers)
// Enable API mocking before tests.
beforeAll(() => server.listen())
// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())
// Disable API mocking after the tests are done.
afterAll(() => server.close())


describe("Delete component", () => {
  test("renders delete button with trash icon", () => {
    const { getByTestId } = renderWithProviders(<Delete />);
    expect(getByTestId("delete-icon")).toBeInTheDocument();
  });

  test("opens modal on delete button click", () => {
    const { getByTestId } = renderWithProviders(<Delete />);
    const deleteIcon = getByTestId("delete-icon");
    const modal = getByTestId('generic-modal') as HTMLInputElement;
    expect(modal.checked).toBe(false);
    fireEvent.click(deleteIcon);
    expect(modal.checked).toBe(true);
  });

  test("dispatches deleteGist action on modal Yes button click", async () => {
    const { getByTestId, queryByTestId } = renderWithProviders(<Delete />, { preloadedState: GIST_ACTIONS_MOCK_B as RootState });
    const deleteIcon = getByTestId('delete-icon');
    const modal = getByTestId('generic-modal') as HTMLInputElement;
    fireEvent.click(deleteIcon);
    expect(modal.checked).toBe(true);
    const yesButton = getByTestId('yes-btn');
    expect(yesButton).toBeInTheDocument();
    fireEvent.click(yesButton);
    expect(queryByTestId('yes-btn')).not.toBeInTheDocument();
    await waitFor(() => {
      expect(window.location.pathname).toBe('/my-gists')
    });
  })
})