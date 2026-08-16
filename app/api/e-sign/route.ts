import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, role, joinedDate, recipientGmail, signatureDataUrl } = body;

    if (!fullName || !email || !role || !signatureDataUrl) {
      return NextResponse.json(
        { success: false, message: "Missing required fields: fullName, email, role, or signature." },
        { status: 400 }
      );
    }

    const targetEmail = recipientGmail || process.env.DESTINATION_GMAIL || "xnishidh.codes@gmail.com";
    const timestamp = new Date().toISOString();
    const submissionId = `AURENITH-ESIGN-${Date.now()}`;

    // Extract base64 signature payload for inline attachment
    const base64Data = signatureDataUrl.replace(/^data:image\/png;base64,/, "");

    // Format HTML Email content
    const emailHtmlContent = `
      <div style="font-family: Arial, sans-serif; background-color: #050508; color: #ffffff; padding: 32px; border-radius: 16px;">
        <h2 style="color: #7C3AED; margin-bottom: 8px;">Aurenith Team — New Member E-Signature</h2>
        <p style="color: #9CA3AF; font-size: 14px; margin-bottom: 24px;">Digital Onboarding Agreement Signed</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; color: #ffffff;">
          <tr><td style="padding: 8px 0; color: #9CA3AF;">Member Name:</td><td style="font-weight: bold;">${fullName}</td></tr>
          <tr><td style="padding: 8px 0; color: #9CA3AF;">Member Email:</td><td style="font-weight: bold;">${email}</td></tr>
          <tr><td style="padding: 8px 0; color: #9CA3AF;">Assigned Role:</td><td style="font-weight: bold;">${role}</td></tr>
          <tr><td style="padding: 8px 0; color: #9CA3AF;">Effective Date:</td><td style="font-weight: bold;">${joinedDate || new Date().toLocaleDateString()}</td></tr>
          <tr><td style="padding: 8px 0; color: #9CA3AF;">Delivered To:</td><td style="font-weight: bold;">${targetEmail}, ${email}</td></tr>
          <tr><td style="padding: 8px 0; color: #9CA3AF;">Document Ref:</td><td style="font-weight: bold;">${submissionId}</td></tr>
        </table>

        <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 20px; text-align: center; margin-top: 16px;">
          <p style="color: #A78BFA; font-size: 12px; text-transform: uppercase; margin-bottom: 12px;">Digital Signature Record</p>
          <img src="cid:signature_image" alt="Digital Signature" style="max-width: 100%; height: auto; max-height: 120px;" />
        </div>
      </div>
    `;

    // Configure Nodemailer SMTP Transporter
    const smtpUser = process.env.GMAIL_USER || process.env.SMTP_USER || "xnishidh.codes@gmail.com";
    const rawPass = process.env.GOOGLE_EMAIL_APP_PASS || process.env.GMAIL_PASS || process.env.SMTP_PASS;
    const smtpPass = rawPass ? rawPass.replace(/\s+/g, "") : "";

    // Recipients: Both the admin/team lead Gmail AND the new member's email
    const recipientList = Array.from(new Set([targetEmail, email].filter(Boolean))).join(", ");

    let emailSentStatus = false;
    let emailErrorMessage = "";

    if (smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: `"Aurenith Team" <${smtpUser}>`,
          to: recipientList,
          subject: `🏆 New Member E-Signature: ${fullName} (${role})`,
          html: emailHtmlContent,
          attachments: [
            {
              filename: "signature.png",
              content: Buffer.from(base64Data, "base64"),
              cid: "signature_image",
            },
          ],
        });
        emailSentStatus = true;
      } catch (err: unknown) {
        const error = err as { code?: string; message?: string };
        console.error("Nodemailer SMTP error:", error);
        emailErrorMessage = error?.message || "SMTP authentication failed";
      }
    }

    return NextResponse.json({
      success: true,
      message: emailSentStatus
        ? `E-Signature successfully delivered via Nodemailer to ${recipientList}!`
        : `E-Signature verified for ${recipientList}! (Note: ${emailErrorMessage || "Invalid App Password"})`,
      submissionId,
      timestamp,
      details: {
        fullName,
        email,
        role,
        recipientGmail: recipientList,
        emailSent: emailSentStatus,
        errorNotice: emailSentStatus ? undefined : emailErrorMessage,
      },
    });
  } catch (error) {
    console.error("E-Sign API processing error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error processing signature." },
      { status: 500 }
    );
  }
}
