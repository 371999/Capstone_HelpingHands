import { render, screen, waitFor } from '@testing-library/react';
import Dashboard from '../../src/components/Dashboard';
import { fetchDashboardData } from '../../src/services/api';

jest.mock('../../src/services/api');

describe('Dashboard Component', () => {
  const mockData = [{ id: 1, title: 'Task 1' }, { id: 2, title: 'Task 2' }];

  it('fetches and displays dashboard data', async () => {
    fetchDashboardData.mockResolvedValue(mockData);
    render(<Dashboard />);

    for (const item of mockData) {
      expect(await screen.findByText(item.title)).toBeInTheDocument();
    }
  });

  it('displays error message when API fails', async () => {
    fetchDashboardData.mockRejectedValue(new Error('Failed to load data'));
    render(<Dashboard />);

    await waitFor(() => screen.getByText(/failed to load data/i));
    expect(screen.getByText(/failed to load data/i)).toBeInTheDocument();
  });
});
