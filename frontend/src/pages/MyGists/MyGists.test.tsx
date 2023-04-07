import MyGistsPage from ".";
import { renderWithProviders } from "../../test-utils";

describe('My Gists Page', () => {
  test('should render My Gists Component', () => {
    renderWithProviders(<MyGistsPage />);
  });
});