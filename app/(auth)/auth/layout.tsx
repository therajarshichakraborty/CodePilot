import * as React from "react";
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main
      className="flex justify-center items-center h-screen flex-col cursor-pointer"
      suppressHydrationWarning
    >
      {children}
    </main>
  );
};

export default AuthLayout;
