import type { InquiryPayload } from '@/lib/inquiry-schema';

type EmailOutput = {
  subject: string;
  html: string;
  text: string;
};

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
    <p><strong>Od:</strong> ${name} &lt;${email}&gt;</p>
    <p><strong>Usługa:</strong> ${service}</p>
    <hr />
    <p>${message.replace(/\n/g, '<br />')}</p>
  `.trim();

  return { subject, html, text };
}
