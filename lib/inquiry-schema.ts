import { z } from 'zod';
import { services } from '@/lib/services';

const serviceSlugs = services.map((s) => s.slug) as [string, ...string[]];

export const inquirySchema = z.object({
  name: z.string().min(2).max(80),
  email: z.email(),
  service: z.enum(serviceSlugs),
  message: z.string().min(10).max(2000),
});

export type InquiryPayload = z.infer<typeof inquirySchema>;
