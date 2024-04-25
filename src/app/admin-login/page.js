'use client';
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [error, setError] = useState("");

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);

    // Check if the credentials match the admin account
    if (email === "alijan@gmail.com" && password === "test1234") {
      const result = await signIn("credentials", { email, password, redirect: false });
      if (!result.error) {
        window.location.href = "/";
      } else {
        setError("Failed to log in. Please try again.");
        console.log(error)
      }
    } else {
      setError("Invalid credentials. Access is denied.");
    }

    setLoginInProgress(false);
  }

  return (
    <div>
      <div className="flex justify-center items-center mt-8">
        <div className="w-[300px] h-125 bg-white shadow-sm shadow-black rounded-lg p-5">
          <p className="text-center font-sans text-2xl font-bold text-orange-600 my-2.5">
            Admin Sign In
          </p>
          <form className="flex flex-col gap-4 mb-3" onSubmit={handleFormSubmit}>
            <input
              type="email"
              name="email"
              className="rounded-full border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 p-3"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="rounded-full border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 p-3"
              placeholder="Password"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              disabled={loginInProgress}
              className="py-2 px-3 font-sans rounded-full btn text-white cursor-pointer shadow-md active:shadow-none"
            >
              Sign In
            </button>
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
