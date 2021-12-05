import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import App from './App';

// Added this for testing, since the window object isn't availble for testing
window.var = {
  userPage:1,
  userName:""
}

// Pass if "The search page" String is found
test('Renders search page', () => {
  render(<App />)
  const titleElement = screen.getByText(/The search page/i)
  expect(titleElement).toBeInTheDocument()
});

// Pass if the GitHub api response returns the first user found by username "nuno" with the json login.name property equals to "nuno"
test('Loads and displays user page for username "nuno"', async () => {
  render(<App />)

  const input = screen.getByTestId('username')
  fireEvent.change(input, {target: {value: 'nuno'}})
  const searchButton = screen.getByText(/Search GitHub Users/i, { selector: 'button' })
  fireEvent.click(searchButton)

  await waitFor(() => screen.getByText(/The user page/i))
  const titleElement = screen.getByText(/nuno/i)
  expect(titleElement).toBeInTheDocument()
});
