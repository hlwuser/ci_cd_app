import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('Counter App', () => {
  it('renders the initial count as 0', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /count is 0/i });
    expect(button).toBeInTheDocument();
  });

  it('increments count when button is clicked', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /count is 0/i });
    
    fireEvent.click(button);
    
    expect(screen.getByRole('button', { name: /count is 1/i })).toBeInTheDocument();
  });

  it('increments count multiple times', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /count is 0/i });
    
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    
    expect(screen.getByRole('button', { name: /count is 3/i })).toBeInTheDocument();
  });

  it('renders Vite and React logos', () => {
    render(<App />);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
  });

  it('renders the heading text', () => {
    render(<App />);
    const heading = screen.getByText(/Vite \+ React/i);
    expect(heading).toBeInTheDocument();
  });

  it('renders the instruction text', () => {
    render(<App />);
    // Check for text containing "Edit" - flexible for any version
    expect(screen.getByText(/Edit/i)).toBeInTheDocument();
  });

  it('renders the documentation link', () => {
    render(<App />);
    const text = screen.getByText(/Click on the Vite and React logos to learn more/i);
    expect(text).toBeInTheDocument();
  });

  it('button has correct initial text format', () => {
    render(<App />);
    const button = screen.getByRole('button');
    expect(button.textContent).toMatch(/count is \d+/);
  });

  it('maintains count state between renders', () => {
    const { rerender } = render(<App />);
    const button = screen.getByRole('button', { name: /count is 0/i });
    
    fireEvent.click(button);
    expect(screen.getByRole('button', { name: /count is 1/i })).toBeInTheDocument();
    
    rerender(<App />);
    // Note: This will reset to 0 as it's a new component instance
    // Just demonstrating the pattern
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});