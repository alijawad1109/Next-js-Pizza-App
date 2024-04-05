'use client';
import {signIn} from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {useState} from "react";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);

    await signIn('credentials', {email, password, callbackUrl: '/'});

    setLoginInProgress(false);
  }
  return (
    <div>
    <div className="flex justify-center items-center mt-8">
      <div className="w-[300px] h-125 bg-white shadow-sm shadow-black rounded-lg p-5">
        <p className="text-center font-sans text-2xl font-bold text-orange-600 my-2.5">
          Sign In
        </p>
        <form
          className="flex flex-col gap-4 mb-3"
          onSubmit={handleFormSubmit}
        >
          <input
            type="email"
            name='email'
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
            name='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-xs text-center text-gray-500 font-sans">
            Don't have an account?
            <span className="ml-0.25 text-sm underline decoration-teal-500 primary font-bold cursor-pointer">
             <Link href={'/register'}> Sign Up &raquo;</Link>
            </span>
          </p>
          <button disabled={false} className="py-2 px-3 font-sans rounded-full btn text-white cursor-pointer shadow-md active:shadow-none">
            Sign In
          </button>
          <div className="flex flex-col justify-start mt-2 gap-3">
            <div className="rounded-full p-2.5 shadow-lg flex justify-center items-center font-sans text-sm gap-1.25 border-2 border-gray-500 cursor-pointer" onClick={()=>signIn('google' , {callbackUrl:"/"})}>
              {/* SVG for Google login */}

              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                version="1.1"
                x="0px"
                y="0px"
                className="google-icon"
                viewBox="0 0 48 48"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24 c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657 C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
              <span>Log in with Google</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

