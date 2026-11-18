import type { Metadata } from "next";

import { SignInCard } from "@/modules/auth/components/sign-in-card";

export const metadata: Metadata = {
  title: "Sign in · CodePilot",
};

type PageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function SignInPage({ searchParams }: PageProps) {
  const { error } = await searchParams;
  return <SignInCard error={error} />;
}
