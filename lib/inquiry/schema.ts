import { z } from 'zod';
import { services } from '@/lib/services/data';

const serviceSlugs = services.map((s) => s.slug) as [string, ...string[]];

export const inquirySchema = z
  .object({
    name: z.string().min(2).max(80),
    email: z.email(),
    service: z.union([z.enum(serviceSlugs), z.literal('inne')]),
    topic: z.string().max(200).optional(),
    message: z.string().min(10).max(2000),
  })
  .refine(
    (data) =>
      data.service !== 'inne' ||
      (!!data.topic && data.topic.trim().length >= 2),
    { message: 'Opisz temat zapytania.', path: ['topic'] }
  );

export type InquiryPayload = z.infer<typeof inquirySchema>;
