"use server";

import apiFetch from "./api";

interface SignupFormData {
  email: string;
  password: string;
}

export async function signupAction(formData: SignupFormData) {
  const res = await apiFetch("/register", {
    method: "POST",
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Signup failed");
  }

  return await res.json();
}

interface LoginFormData {
  email: string;
  password: string;
}

export async function loginAction(formData: LoginFormData) {
  const res = await apiFetch("/login", {
    method: "POST",
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Login failed");
  }

  return await res.json();
}
