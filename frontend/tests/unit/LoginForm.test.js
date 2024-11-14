import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '../../src/components/LoginForm';

describe('LoginForm Component', () => {
  it('renders the form with username and password fields', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('calls onSubmit with username and password on form submit', () => {
    const handleSubmit = jest.fn();
    render(<LoginForm onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(handleSubmit).toHaveBeenCalledWith({ username: 'testuser', password: 'password123' });
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
