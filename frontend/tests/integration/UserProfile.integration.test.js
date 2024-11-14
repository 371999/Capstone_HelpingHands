import { render, screen, fireEvent } from '@testing-library/react';
import UserProfile from '../../src/components/UserProfile';
import { getUserData, updateUserData } from '../../src/services/api';

jest.mock('../../src/services/api');

describe('UserProfile Component', () => {
  const userData = { name: 'John Doe', email: 'john@example.com' };

  beforeEach(() => {
    getUserData.mockResolvedValue(userData);
  });

  it('renders user data on load', async () => {
    render(<UserProfile />);
    expect(await screen.findByText(/john doe/i)).toBeInTheDocument();
    expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
  });

  it('updates user data when edit button is clicked', async () => {
    updateUserData.mockResolvedValue({ name: 'Jane Doe', email: 'jane@example.com' });
    
    render(<UserProfile />);
    
    fireEvent.click(screen.getByRole('button', { name: /edit/i }));
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'jane@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    expect(await screen.findByText(/jane doe/i)).toBeInTheDocument();
    expect(screen.getByText(/jane@example.com/i)).toBeInTheDocument();
  });
});
