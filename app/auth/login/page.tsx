"use client";

import { useActionState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { loginAction } from "@/lib/actions";

export default function LoginPage() {
  const router = useRouter();
  const [error, submitAction, isPending] = useActionState(
    async (previousState: void | null, formData: FormData) => {
      try {
        const { token } = await loginAction({
          email: formData.get("email") as string,
          password: formData.get("password") as string,
        });

        localStorage.setItem("token", token);
        toast.success("Login successful! Welcome back!");
        router.push("/");
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(
            error.message || "Login failed. Please check your credentials."
          );
        } else {
          toast.error("Login failed. Please check your credentials.");
        }
      }
    },
    null
  );

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Log In</h1>
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
          {isPending ? "Submitting..." : "Log In"}
        </button>
        {!!error && <p>{error}</p>}
      </form>
    </div>
  );
}
