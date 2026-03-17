import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '@/components/Button/Button';

describe('Button', () => {
  it('renders the provided text', () => {
    render(<Button text="Click me" onClick={() => {}} />);

    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('has type="button" to avoid accidental form submission', () => {
    render(<Button text="Submit" onClick={() => {}} />);

    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('calls onClick once when clicked', async () => {
    const onClick = jest.fn();
    render(<Button text="Click me" onClick={onClick} />);

    await userEvent.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when not interacted with', () => {
    const onClick = jest.fn();
    render(<Button text="Click me" onClick={onClick} />);

    expect(onClick).not.toHaveBeenCalled();
  });
});
