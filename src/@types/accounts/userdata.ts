import { z } from "zod";

export const UserDataSchema = z.object({
  id: z.number(),
  sub: z.string(),
  overcome: z.number(),
  household_size: z.number(),
  multicultural: z.boolean(),
  north_korean: z.boolean(),
  single_parent_or_grandparent: z.boolean(),
  homeless: z.boolean(),
  new_resident: z.boolean(),
  multi_child_family: z.boolean(),
  extend_family: z.boolean(),
  disable: z.boolean(),
  veteran: z.boolean(),
  disease: z.boolean(),
  life_status: z.number(),
  primary_industry_status: z.number(),
  academic_status: z.number(),
  working_status: z.number(),
});

export type UserData = z.infer<typeof UserDataSchema>;
