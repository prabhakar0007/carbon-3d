import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CarbonForm from '../components/CarbonForm';

describe('CarbonForm', () => {
  it('calls onAddEntry with correct data on submit', () => {
    const mockAdd = vi.fn();
    render(<CarbonForm onAddEntry={mockAdd} />);
    const input = screen.getByLabelText(/value/i);
    fireEvent.change(input, { target: { value: '5' } });
    const button = screen.getByText(/add & calculate/i);
    fireEvent.click(button);
    expect(mockAdd).toHaveBeenCalledWith({ type: 'car_km', value: 5 });
  });
});