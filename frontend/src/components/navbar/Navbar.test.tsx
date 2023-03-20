import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../test-utils";
import Navbar from "./Navbar";

describe("Navbar Common View", () => {
  test("displays 'E M U M B A' title if loggedin", () => {
    renderWithProviders(<Navbar isAuthenticated={true} />);
    const titleElement = screen.getByText(/E M U M B A/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("displays 'E M U M B A' title if loggedout", () => {
    renderWithProviders(<Navbar isAuthenticated={false} />);
    const titleElement = screen.getByText(/E M U M B A/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("displays search bar if loggedin", () => {
    renderWithProviders(<Navbar isAuthenticated={true} />);
    const searchElement = screen.getByPlaceholderText(/Search/i);
    expect(searchElement).toBeInTheDocument();
  });

  test("doesn't display search bar if loggedout", () => {
    renderWithProviders(<Navbar isAuthenticated={false} />);
    const searchElement = screen.getByPlaceholderText(/Search/i);
    expect(searchElement).toBeInTheDocument();
  });

})

describe("Navbar Loggedin View", () => {
  test("displays user avatar", async () => {
    renderWithProviders(<Navbar isAuthenticated={true} />);
    const avatarElement = await screen.findByTestId('nav-avatar')
    expect(avatarElement).toBeInTheDocument();
  });

  test("doesn't display sign in button", () => {
    renderWithProviders(<Navbar isAuthenticated={true} />);
    const signInElement = screen.queryByRole("link", { name: /login/i });
    expect(signInElement).toBeNull();
  });
})

describe("Navbar Loggedout View", () => {
  test("doesn't display user avatar", async () => {
    renderWithProviders(<Navbar isAuthenticated={false} />);
    const avatarElement = await screen.queryByTestId('nav-avatar')
    expect(avatarElement).toBeNull();
  });

  test("displays sign in button", () => {
    renderWithProviders(<Navbar isAuthenticated={false} />);
    const signInElement = screen.getByRole("link", { name: /login/i });
    expect(signInElement).toBeInTheDocument();
  });
});
