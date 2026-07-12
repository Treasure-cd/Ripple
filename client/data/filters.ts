import { mockUsers } from "./mock";

export const filters = Array.from(
  new Set(mockUsers.flatMap((user) => user.skills))
);
