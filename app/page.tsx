"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    // Check if user is logged in by token in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else setIsLoggedIn(false);
  }, []);

  return (
    <main className="grid min-h-dvh gap-8 place-items-center">
      {isLoggedIn ? (
        <div className="flex gap-8 items-center">
          <Link href="/users">Users List</Link>
          <button
            type="submit"
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-8">
          <Link href="/auth/signup">Signup</Link>
          <Link href="/auth/login">Login</Link>
        </div>
      )}
    </main>
  );
}
