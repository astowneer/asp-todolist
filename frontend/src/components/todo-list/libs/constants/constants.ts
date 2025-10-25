import type { ValueOf } from "@/common/common";

export const TodoFilter = {
  ALL: "all",
  COMPLETED: "true",
  NOT_COMPLETED: "false",
} as const;

export type TodoFilterValue = ValueOf<typeof TodoFilter>;
