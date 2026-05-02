import { sendInquiryEmail } from '@/lib/email/send-inquiry';
import { inquirySchema, type InquiryPayload } from '@/lib/inquiry-schema';

type SubmitResult = { ok: true } | { ok: false; error: string };

export async function processInquiry(
  payload: InquiryPayload
): Promise<SubmitResult> {
  const parsed = inquirySchema.safeParse(payload);
  if (!parsed.success) {
    return { ok: false, error: 'Nieprawidłowe dane formularza.' };
  }

  try {
    await sendInquiryEmail(parsed.data);
  } catch {
    return {
      ok: false,
      error:
        'Nie udało się wysłać wiadomości. Spróbuj ponownie lub skontaktuj się bezpośrednio.',
    };
  }
  return { ok: true };
}
