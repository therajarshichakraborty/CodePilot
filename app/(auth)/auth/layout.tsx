import type * as React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-background flex min-h-screen w-full items-center justify-center px-6 py-16 antialiased">
      {children}
    </main>
  );
};

export default AuthLayout;
