import { z } from "zod";

export const welfareRequestSchema = z.object({
  page: z.number(),
  size: z.number(),
});

export const welfareSchema = z.object({
  views: z.number(),
  service_name: z.string(),
  service_summary: z.string(),
  service_category: z.string(),
  service_conditions: z.string(),
  apply_period: z.string(),
  apply_url: z.string().url().nullable().optional(),
  document: z.string(),
  receiving_agency: z.string(),
  contact: z.string(),
  support_details: z.string(),
});

export const welfareResponseSchema = z.array(welfareSchema);

export type welfareRequest = z.infer<typeof welfareSchema>;
export type welfare = z.infer<typeof welfareSchema>;
export type walfareResponse = z.infer<typeof welfareResponseSchema>;
