import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header', () => {
  render(<App />);
  expect(screen.getByText(/url shortener/i)).toBeInTheDocument();
});
