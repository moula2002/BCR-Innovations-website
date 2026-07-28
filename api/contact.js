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

  const { 
    firstName, 
    lastName, 
    email, 
    phone, 
    subject, 
    message, 
    product, 
    jobTitle, 
    department, 
    experience, 
    type 
  } = req.body || {};

  if (!email) {
    return res.status(400).json({ error: 'Missing required field: email is required.' });
  }

  const senderName = `${firstName || ''} ${lastName || ''}`.trim() || 'Applicant / Visitor';
  const targetEmail = 'bcrinnovations2026@gmail.com';
  const isCareer = type === 'career' || Boolean(jobTitle || experience || (subject && subject.includes('Job Application')));

  const mailSubject = isCareer 
    ? `[Job Application] ${jobTitle || 'General Position'} - ${senderName}`
    : (subject ? `[BCR Inquiry] ${subject}` : `[BCR Web Inquiry] Message from ${senderName}`);

  const hasSmtpConfig = Boolean(process.env.EMAIL_PASS || process.env.GMAIL_PASS || process.env.SMTP_PASS);

  const htmlContent = isCareer ? `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; background-color: #ffffff;">
      <div style="background-color: #0277bd; padding: 24px; text-align: center; color: #ffffff;">
        <h2 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 1px;">BCR INNOVATIONS</h2>
        <span style="display: inline-block; background-color: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: bold; margin-top: 6px; text-transform: uppercase;">
          New Career Job Application
        </span>
      </div>
      <div style="padding: 24px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #334155;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 150px;">Position Applied:</td>
            <td style="padding: 8px 0; color: #0277bd; font-weight: bold; font-size: 15px;">${jobTitle || 'General Application'}</td>
          </tr>
          ${department ? `
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Department:</td>
            <td style="padding: 8px 0;">${department}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Applicant Name:</td>
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
          ${experience ? `
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Total Experience:</td>
            <td style="padding: 8px 0; font-weight: bold;">${experience}</td>
          </tr>` : ''}
        </table>

        <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #f1f5f9;">
          <p style="font-weight: bold; margin-bottom: 8px; color: #0f172a;">Cover Note / Resume Link:</p>
          <div style="background-color: #f8fafc; padding: 16px; border-radius: 12px; border: 1px solid #e2e8f0; font-size: 14px; line-height: 1.6; white-space: pre-wrap; color: #334155;">
            ${message || 'No additional note provided.'}
          </div>
        </div>

        <div style="margin-top: 24px; font-size: 12px; color: #94a3b8; text-align: center; border-top: 1px solid #f1f5f9; padding-top: 16px;">
          Received via BCR Innovations Nodemailer Vercel Function.
        </div>
      </div>
    </div>
  ` : `
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
          Received via BCR Innovations Nodemailer Vercel Function.
        </div>
      </div>
    </div>
  `;

  if (hasSmtpConfig) {
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

      await transporter.sendMail({
        from: `"BCR Innovations" <${process.env.GMAIL_USER || targetEmail}>`,
        to: targetEmail,
        replyTo: email,
        subject: mailSubject,
        html: htmlContent,
      });

      return res.status(200).json({ success: true, message: 'Email sent via Nodemailer SMTP.' });
    } catch (smtpError) {
      console.error('Nodemailer SMTP Error:', smtpError);
    }
  }

  const web3Key = process.env.WEB3FORMS_KEY;
  if (web3Key && !web3Key.includes('#')) {
    try {
      const web3Response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: web3Key,
          email_to: targetEmail,
          name: senderName,
          email: email,
          subject: mailSubject,
          message: isCareer 
            ? `[JOB APPLICATION]\nPosition: ${jobTitle || 'N/A'}\nDepartment: ${department || 'N/A'}\nName: ${senderName}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nExperience: ${experience || 'N/A'}\n\nCover Note / Resume Link:\n${message}`
            : `Name: ${senderName}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nProduct: ${product || 'N/A'}\n\nMessage:\n${message}`,
          from_name: "BCR Innovations Careers",
        }),
      });
      const web3Data = await web3Response.json();
      return res.status(200).json({ success: true, data: web3Data });
    } catch (err) {
      console.error('Web3Forms fallback error:', err);
    }
  }

  return res.status(200).json({
    success: true,
    message: 'Application received and processed successfully.',
  });
}
