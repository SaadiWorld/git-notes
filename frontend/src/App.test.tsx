import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
Element.prototype.scrollIntoView = jest.fn();

test('renders learn react link', () => {
  render(<App />);
});
