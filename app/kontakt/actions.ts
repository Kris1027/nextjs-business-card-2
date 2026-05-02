'use server';

import type { InquiryPayload } from '@/lib/inquiry-schema';
import { processInquiry } from '@/lib/submit-inquiry';

export async function submitInquiry(payload: InquiryPayload) {
  return processInquiry(payload);
}
