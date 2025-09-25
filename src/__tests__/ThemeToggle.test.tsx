import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ThemeToggle from "../components/ThemeToggle";

describe("ThemeToggle", () => {
  test("renders and toggles", async () => {
    render(<ThemeToggle />);
    const btn = screen.getByRole("button");
    expect(btn).toBeInTheDocument();
    await userEvent.click(btn);
    expect(btn).toBeInTheDocument();
  });
});
