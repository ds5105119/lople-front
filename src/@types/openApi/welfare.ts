import { z } from "zod";

export const welfareRequestSchema = z.object({
  page: z.number().transform((val) => val.toString()), // number → string 변환
  size: z.number().transform((val) => val.toString()), // number → string 변환
});

export const welfareSchema = z.object({
  id: z.number(),
  views: z.number(),
  service_name: z.string(),
  service_summary: z.string().nullable().optional(),
  service_category: z.string(),
  service_conditions: z.string().nullable().optional(),
  apply_period: z.string(),
  apply_url: z.string().url().nullable().optional(),
  document: z.string().nullable().optional(),
  receiving_agency: z.string().nullable().optional(),
  contact: z.string().nullable().optional(),
  support_details: z.string(),
});

export const welfareResponseSchema = z.array(welfareSchema);

export type welfareRequest = z.input<typeof welfareRequestSchema>;
export type welfare = z.infer<typeof welfareSchema>;
export type walfareResponse = z.infer<typeof welfareResponseSchema>;
