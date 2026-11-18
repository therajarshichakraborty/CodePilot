import Image from "next/image";
import { LogOut } from "lucide-react";

import { currentUser, signOutUser } from "@/modules/auth/actions";

export default async function HomePage() {
  const user = await currentUser();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
      {user?.image && (
        <Image
          src={user.image}
          alt={user.name ?? "Avatar"}
          width={72}
          height={72}
          className="border-border rounded-full border"
        />
      )}
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Hi, {user?.name ?? "there"}</h1>
        <p className="text-muted-foreground mt-1 text-sm">{user?.email}</p>
      </div>
      <form action={signOutUser}>
        <button
          type="submit"
          className="border-border hover:bg-accent inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors"
        >
          <LogOut className="size-4" />
          Sign out
        </button>
      </form>
    </main>
  );
}
