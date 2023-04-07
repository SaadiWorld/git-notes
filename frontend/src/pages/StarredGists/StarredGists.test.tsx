import StarredGistsPage from ".";
import { renderWithProviders } from "../../test-utils";

describe('Starred Gists Page', () => {
  test('should render Starred Gists Component', () => {
    renderWithProviders(<StarredGistsPage />);
  });
});