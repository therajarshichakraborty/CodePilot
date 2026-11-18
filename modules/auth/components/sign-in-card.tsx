import Link from "next/link";

import { signInWithGithub } from "@/modules/auth/actions";
import { GithubSignInButton } from "./github-sign-in-button";

const ERROR_MESSAGES: Record<string, string> = {
  OAuthAccountNotLinked: "This email is already linked to another sign-in method.",
  AccessDenied: "Access was denied. Please try again.",
  Configuration: "Sign-in is unavailable right now. Please try again shortly.",
};

export function SignInCard({ error }: { error?: string }) {
  const errorMessage = error
    ? (ERROR_MESSAGES[error] ?? "Something went wrong. Please try again.")
    : null;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 flex w-full max-w-[340px] flex-col duration-1000">
      <p className="text-muted-foreground text-[13px] font-medium tracking-[0.2em] uppercase">
        CodePilot
      </p>

      <h1 className="text-foreground mt-10 text-[2rem] leading-[1.15] font-medium tracking-[-0.03em]">
        Sign in to continue
      </h1>
      <p className="text-muted-foreground mt-3 text-[15px] leading-relaxed">
        The code editor that thinks with you.
      </p>

      <form action={signInWithGithub} className="mt-10">
        <GithubSignInButton />
      </form>

      {errorMessage && (
        <p role="alert" className="text-destructive mt-4 text-[13px]">
          {errorMessage}
        </p>
      )}

      <p className="text-muted-foreground/70 mt-12 text-xs leading-relaxed">
        By continuing, you agree to the{" "}
        <Link
          href="#"
          className="hover:text-foreground underline decoration-current/30 underline-offset-4 transition-colors"
        >
          Terms
        </Link>{" "}
        and{" "}
        <Link
          href="#"
          className="hover:text-foreground underline decoration-current/30 underline-offset-4 transition-colors"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
