import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders language selector', () => {
  render(<App />);
  const langLabel = screen.getByText(/Langue|Language|Idioma|اللغة/i);
  expect(langLabel).toBeInTheDocument();
});
