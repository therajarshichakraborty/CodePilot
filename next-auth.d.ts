// Unused for now: these types describe the `id`/`role` fields added by the
// jwt/session callbacks in auth.ts, which are commented out. Uncomment both together.

// import type { UserRole } from "@prisma/client";
// import type { DefaultSession } from "next-auth";
//
// export type ExtendedUser = DefaultSession["user"] & {
//   id: string;
//   role: UserRole;
// };
//
// declare module "next-auth" {
//   interface Session {
//     user: ExtendedUser;
//   }
// }
//
// declare module "@auth/core/jwt" {
//   interface JWT {
//     role: UserRole;
//   }
// }

export {};
