"use server";

import { cookies } from "next/headers";

export async function create_token({ token }) {
  const three_days = 3 * 24 * 60 * 60 * 1000;
  cookies().set("token", token, {
    secure: true,
    httpOnly: true,
    maxAge: three_days,
  });
}

export async function delete_token() {
  cookies().delete("token");
}
