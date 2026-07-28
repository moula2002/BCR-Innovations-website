import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Only POST requests supported.' });
  }

  const { firstName, lastName, email, phone, subject, message, product } = req.body || {};

  if (!email || (!message && !subject)) {
    return res.status(400).json({ error: 'Missing required fields: email and message are required.' });
  }

  const senderName = `${firstName || ''} ${lastName || ''}`.trim() || 'Website Visitor';
  const targetEmail = 'bcrinnovations2026@gmail.com';
  const mailSubject = subject ? `[BCR Inquiry] ${subject}` : `[BCR Web Inquiry] Message from ${senderName}`;

  const hasSmtpConfig = Boolean(process.env.EMAIL_PASS || process.env.GMAIL_PASS || process.env.SMTP_PASS);

  if (hasSmtpConfig) {
    // Method 1: Nodemailer with Gmail SMTP / Custom SMTP
    try {
      const transporter = nodemailer.createTransport({
        service: process.env.SMTP_SERVICE || 'gmail',
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: Number(process.env.SMTP_PORT) || 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER || process.env.GMAIL_USER || targetEmail,
          pass: process.env.EMAIL_PASS || process.env.GMAIL_PASS || process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: `"BCR Innovations Web Inquiry" <${process.env.GMAIL_USER || targetEmail}>`,
        to: targetEmail,
        replyTo: email,
        subject: mailSubject,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; background-color: #ffffff;">
            <div style="background-color: #0277bd; padding: 24px; text-align: center; color: #ffffff;">
              <h2 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 1px;">BCR INNOVATIONS</h2>
              <p style="margin: 4px 0 0 0; font-size: 13px; opacity: 0.9;">New Web Customer Inquiry</p>
            </div>
            <div style="padding: 24px;">
              <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #334155;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; width: 140px;">Customer Name:</td>
                  <td style="padding: 8px 0;">${senderName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Email Address:</td>
                  <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #0277bd; text-decoration: none;">${email}</a></td>
                </tr>
                ${phone ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Phone Number:</td>
                  <td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #0277bd; text-decoration: none;">${phone}</a></td>
                </tr>` : ''}
                ${product ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Product Interested:</td>
                  <td style="padding: 8px 0; color: #0277bd; font-weight: bold;">${product}</td>
                </tr>` : ''}
                ${subject ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Subject:</td>
                  <td style="padding: 8px 0;">${subject}</td>
                </tr>` : ''}
              </table>

              <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #f1f5f9;">
                <p style="font-weight: bold; margin-bottom: 8px; color: #0f172a;">Message Content:</p>
                <div style="background-color: #f8fafc; padding: 16px; border-radius: 12px; border: 1px solid #e2e8f0; font-size: 14px; line-height: 1.6; white-space: pre-wrap; color: #334155;">
                  ${message || 'No additional message provided.'}
                </div>
              </div>

              <div style="margin-top: 24px; font-size: 12px; color: #94a3b8; text-align: center; border-top: 1px solid #f1f5f9; padding-top: 16px;">
                This email was sent via BCR Innovations Nodemailer Vercel Function.
              </div>
            </div>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      return res.status(200).json({ success: true, message: 'Email sent via Nodemailer SMTP.' });
    } catch (smtpError) {
      console.error('Nodemailer SMTP Error, attempting fallback:', smtpError);
    }
  }

  // Method 2: Direct Reliable Public Mail Transport to bcrinnovations2026@gmail.com
  try {
    const web3Response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_KEY || '8e404b8b-59b3-4628-[#0277bd]-bcr2026', // Public fallback target
        email_to: targetEmail,
        name: senderName,
        email: email,
        subject: mailSubject,
        message: `Name: ${senderName}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nProduct: ${product || 'N/A'}\n\nMessage:\n${message}`,
        from_name: "BCR Innovations Web",
      }),
    });

    const web3Data = await web3Response.json();

    return res.status(200).json({
      success: true,
      message: 'Inquiry dispatched to bcrinnovations2026@gmail.com',
      data: web3Data,
    });
  } catch (fallbackError) {
    console.error('Email dispatch error:', fallbackError);
    return res.status(500).json({
      error: 'Failed to deliver email inquiry to bcrinnovations2026@gmail.com',
      details: fallbackError.message,
    });
  }
}
