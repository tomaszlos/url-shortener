import { render, screen } from '@testing-library/react'
import Shortener from './Shortener'

test('renders input', () => {
  render(<Shortener />);
  expect(screen.getByRole('textbox')).toBeInTheDocument();
});

test('renders button', () => {
  render(<Shortener />);
  expect(screen.getByText(/make it short/i)).toBeInTheDocument();
});
