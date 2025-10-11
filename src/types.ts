// Central shared types

export type FilterType = "all" | "completed" | "incomplete";

export interface Todo {
  userId?: number;
  id: number;
  title: string;
  completed: boolean;
}
