import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-sm">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link href="/">
              <a className="text-xl font-semibold tracking-tight">SolveEase</a>
            </Link>
            <p className="hidden sm:block text-sm text-gray-500 dark:text-gray-400">Frontend Intern Assignment</p>
          </div>
          <div className="hidden sm:flex sm:items-center sm:gap-4">
            <Link href="/"><a className="px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">Home</a></Link>
            <Link href="/about"><a className="px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">About</a></Link>
            <ThemeToggle />
          </div>
          <div className="sm:hidden flex items-center">
            <ThemeToggle />
            <button
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              className="ml-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              ☰
            </button>
          </div>
        </div>
        {open && (
          <div className="sm:hidden mt-2">
            <Link href="/"><a className="block px-3 py-2 rounded-md">Home</a></Link>
            <Link href="/about"><a className="block px-3 py-2 rounded-md">About</a></Link>
          </div>
        )}
      </nav>
    </header>
  );
}
