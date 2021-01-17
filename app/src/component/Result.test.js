import {render, screen} from '@testing-library/react'
import Result from './Result'

it('renders test link', () => {
  render(<Result url="test-link"/>)
  expect(screen.getByText(/test-link/i)).toBeInTheDocument()
})
