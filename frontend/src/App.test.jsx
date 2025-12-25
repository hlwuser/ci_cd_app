import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("Todo App", () => {
  it("renders the main heading", () => {
    render(<App />);
    expect(screen.getByText("Todo App")).toBeInTheDocument();
  });

  it("adds a new todo", () => {
    render(<App />);
    const input = screen.getByPlaceholderText("What needs to be done?");
    const addButton = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(addButton);

    expect(screen.getByText("New Task")).toBeInTheDocument();
  });

  it("toggles todo completion", () => {
    render(<App />);
    const input = screen.getByPlaceholderText("What needs to be done?");
    const addButton = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "Toggle Task" } });
    fireEvent.click(addButton);

    const task = screen.getByText("Toggle Task");
    fireEvent.click(task);

    expect(task.closest("li")).toHaveClass("completed");
  });

  it("deletes a todo", () => {
    render(<App />);
    const input = screen.getByPlaceholderText("What needs to be done?");
    const addButton = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "Delete Task" } });
    fireEvent.click(addButton);

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    expect(screen.queryByText("Delete Task")).not.toBeInTheDocument();
  });
});
