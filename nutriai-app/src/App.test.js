import { render, screen } from '@testing-library/react';
import App from './App';

test('renders NutriAI title', () => {
  render(<App />);
  const titleElement = screen.getByText(/NutriAI/i);
  expect(titleElement).toBeInTheDocument();
});
