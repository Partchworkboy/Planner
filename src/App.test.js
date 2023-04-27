import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('adds a task to the planner', () => {
  render(<App />);

  const taskInput = screen.getByPlaceholderText('Enter task...');
  fireEvent.change(taskInput, { target: { value: 'Buy groceries' } });

  const addButton = screen.getByText('Add');
  fireEvent.click(addButton);

  const taskElement = screen.getByText('Buy groceries');
  expect(taskElement).toBeInTheDocument();
});
