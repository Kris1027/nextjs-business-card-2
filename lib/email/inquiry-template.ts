import type { InquiryPayload } from '@/lib/inquiry-schema';

type EmailOutput = {
  subject: string;
  html: string;
  text: string;
};

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function renderInquiryEmail(payload: InquiryPayload): EmailOutput {
  const { name, email, service, message } = payload;

  const subject = `Nowe zapytanie od ${name}`;

  const text = [
    `Od: ${name} <${email}>`,
    `Usługa: ${service}`,
    ``,
    message,
  ].join('\n');

  const html = `
    <p><strong>Od:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
    <p><strong>Usługa:</strong> ${escapeHtml(service)}</p>
    <hr />
    <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
  `.trim();

  return { subject, html, text };
}
