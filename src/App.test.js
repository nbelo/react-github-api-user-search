import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import App from './App';

test('renders search page', () => {
  render(<App />);
  const titleElement = screen.getByText(/The search page/i);
  expect(titleElement).toBeInTheDocument();
});


test('loads and displays user page', async () => {
  render(<App />);

  const input = screen.getByTestId('username')
  fireEvent.change(input, {target: {value: 'nuno'}})
  const searchButton = screen.getByText(/Search GitHub Users/i, { selector: 'button' })
  fireEvent.click(searchButton)

  await waitFor(() => screen.getByText(/The user page/i))
  const titleElement = screen.getByText(/Found/i);
  expect(titleElement).toBeInTheDocument();
  //expect(screen.getByText('heading')).toHaveTextContent('The user page')
});
