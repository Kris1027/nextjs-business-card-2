'use server';

import { headers } from 'next/headers';
import type { InquiryPayload } from '@/lib/inquiry-schema';
import { processInquiry } from '@/lib/submit-inquiry';
import { checkRateLimit } from '@/lib/rate-limiter';

type RawSubmission = InquiryPayload & { _hp: string };

export async function submitInquiry(raw: RawSubmission) {
  if (raw._hp) {
    return { ok: true as const };
  }

  const headersList = await headers();
  const forwarded = headersList.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';

  if (!checkRateLimit(ip)) {
    return {
      ok: false as const,
      error: 'Zbyt wiele zapytań. Spróbuj ponownie za kilka minut.',
    };
  }

  return processInquiry({
    name: raw.name,
    email: raw.email,
    service: raw.service,
    message: raw.message,
  });
}
