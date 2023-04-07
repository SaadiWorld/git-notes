import { render } from '@testing-library/react';
import App from './App';
Element.prototype.scrollIntoView = jest.fn();

test('renders react app', () => {
  render(<App />);
});
