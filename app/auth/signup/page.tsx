"use client";

import { useActionState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signupAction } from "@/lib/actions";

export default function SignupPage() {
  const router = useRouter();
  const [error, submitAction, isPending] = useActionState(
    async (previousState: void | null, formData: FormData) => {
      try {
        const { token } = await signupAction({
          email: formData.get("email") as string,
          password: formData.get("password") as string,
        });

        localStorage.setItem("token", token);
        toast.success("Signup successful! Welcome!");
        router.push("/");
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(
            error.message || "Signup failed. Please check your credentials."
          );
        } else {
          toast.error("Signup failed. Please check your credentials.");
        }
      }
    },
    null
  );

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>
      <form action={submitAction}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          disabled={isPending}
        >
          {isPending ? "Submitting..." : "Sign Up"}
        </button>
        {!!error && <p>{error}</p>}
      </form>
    </div>
  );
}
