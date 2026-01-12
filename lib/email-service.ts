"use server"

/**
 * Email Service for Digiteria
 * Handles sending welcome emails and seller approval notifications
 * 
 * For production, configure with a real email service like:
 * - Resend (recommended): npm install resend
 * - SendGrid: npm install @sendgrid/mail
 * - Nodemailer: npm install nodemailer
 */

// Email templates
export const emailTemplates = {
    welcome: (name: string, email: string) => ({
        subject: "Welcome to Digiteria! 🎉",
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Digiteria</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f7fb; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f7fb; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); padding: 40px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Welcome to Digiteria! 🎉</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="color: #334155; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                Hi <strong>${name || 'there'}</strong>,
              </p>
              <p style="color: #334155; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                Thank you for joining Digiteria – the ultimate marketplace for digital creators! We're thrilled to have you as part of our community.
              </p>
              
              <div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin: 24px 0;">
                <h3 style="color: #1e293b; margin: 0 0 16px; font-size: 18px;">Here's what you can do:</h3>
                <ul style="color: #475569; margin: 0; padding-left: 20px; line-height: 1.8;">
                  <li>🛒 Browse thousands of digital products</li>
                  <li>💰 Become a creator and sell your own products</li>
                  <li>⭐ Rate and review your purchases</li>
                  <li>💬 Connect with talented creators</li>
                </ul>
              </div>
              
              <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://digiteria.com'}/marketplace" style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: white; text-decoration: none; padding: 14px 32px; border-radius: 12px; font-weight: 600; margin-top: 16px;">
                Explore Marketplace →
              </a>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 24px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #64748b; font-size: 14px; margin: 0;">
                Questions? Reply to this email or contact us at support@digiteria.com
              </p>
              <p style="color: #94a3b8; font-size: 12px; margin: 12px 0 0;">
                © ${new Date().getFullYear()} Digiteria. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
        text: `
Welcome to Digiteria, ${name || 'there'}!

Thank you for joining Digiteria – the ultimate marketplace for digital creators! We're thrilled to have you as part of our community.

Here's what you can do:
- Browse thousands of digital products
- Become a creator and sell your own products
- Rate and review your purchases
- Connect with talented creators

Explore the marketplace: ${process.env.NEXT_PUBLIC_APP_URL || 'https://digiteria.com'}/marketplace

Questions? Contact us at support@digiteria.com

© ${new Date().getFullYear()} Digiteria. All rights reserved.
    `
    }),

    sellerApproved: (name: string, email: string) => ({
        subject: "🎉 Your Seller Application Has Been Approved!",
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Seller Application Approved</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f7fb; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f7fb; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Congratulations! 🎉</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 12px 0 0; font-size: 16px;">Your Seller Application Has Been Approved</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="color: #334155; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                Hi <strong>${name || 'Creator'}</strong>,
              </p>
              <p style="color: #334155; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                Great news! Your application to become a seller on Digiteria has been <strong style="color: #10b981;">approved</strong>. You can now start listing and selling your digital products to our growing community of buyers.
              </p>
              
              <div style="background: #f0fdf4; border-radius: 12px; padding: 24px; margin: 24px 0; border: 1px solid #86efac;">
                <h3 style="color: #166534; margin: 0 0 16px; font-size: 18px;">🚀 Getting Started as a Seller:</h3>
                <ol style="color: #15803d; margin: 0; padding-left: 20px; line-height: 1.8;">
                  <li>Go to your Creator Dashboard</li>
                  <li>Click "Add Product" to list your first item</li>
                  <li>Set up your Stripe Connect for payments</li>
                  <li>Start earning 85% of every sale!</li>
                </ol>
              </div>
              
              <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://digiteria.com'}/dashboard" style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; text-decoration: none; padding: 14px 32px; border-radius: 12px; font-weight: 600; margin-top: 16px;">
                Go to Creator Dashboard →
              </a>
            </td>
          </tr>
          
          <!-- Tips Section -->
          <tr>
            <td style="padding: 0 40px 40px;">
              <div style="background: #f8fafc; border-radius: 12px; padding: 24px;">
                <h4 style="color: #334155; margin: 0 0 12px; font-size: 16px;">💡 Pro Tips for Success:</h4>
                <ul style="color: #64748b; margin: 0; padding-left: 20px; line-height: 1.8; font-size: 14px;">
                  <li>Use high-quality thumbnails to attract buyers</li>
                  <li>Write detailed descriptions with features & benefits</li>
                  <li>Respond promptly to buyer questions</li>
                  <li>Keep your products updated and bug-free</li>
                </ul>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 24px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #64748b; font-size: 14px; margin: 0;">
                Need help? Reply to this email or check our <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://digiteria.com'}/contact" style="color: #3b82f6; text-decoration: none;">Creator FAQ</a>
              </p>
              <p style="color: #94a3b8; font-size: 12px; margin: 12px 0 0;">
                © ${new Date().getFullYear()} Digiteria. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
        text: `
Congratulations, ${name || 'Creator'}!

Your application to become a seller on Digiteria has been APPROVED! You can now start listing and selling your digital products to our growing community of buyers.

Getting Started as a Seller:
1. Go to your Creator Dashboard
2. Click "Add Product" to list your first item
3. Set up your Stripe Connect for payments  
4. Start earning 85% of every sale!

Go to your dashboard: ${process.env.NEXT_PUBLIC_APP_URL || 'https://digiteria.com'}/dashboard

Pro Tips for Success:
- Use high-quality thumbnails to attract buyers
- Write detailed descriptions with features & benefits
- Respond promptly to buyer questions
- Keep your products updated and bug-free

Need help? Contact us at support@digiteria.com

© ${new Date().getFullYear()} Digiteria. All rights reserved.
    `
    })
}

/**
 * Send email using the configured email service
 * Currently logs to console in development, but can be configured for production
 */
export async function sendEmail(
    to: string,
    template: ReturnType<typeof emailTemplates.welcome>
): Promise<{ success: boolean; error?: string }> {
    try {
        // Check if we have email service configured (e.g., Resend API key)
        const resendApiKey = process.env.RESEND_API_KEY

        if (resendApiKey) {
            // Production: Use Resend API
            const response = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${resendApiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    from: process.env.EMAIL_FROM || 'Digiteria <noreply@digiteria.com>',
                    to: [to],
                    subject: template.subject,
                    html: template.html,
                    text: template.text,
                }),
            })

            if (!response.ok) {
                const error = await response.text()
                console.error('[EmailService] Resend API error:', error)
                return { success: false, error: 'Failed to send email' }
            }

            console.log(`[EmailService] Email sent to ${to}: ${template.subject}`)
            return { success: true }
        } else {
            // Development: Log email to console
            console.log('\n📧 ========== EMAIL PREVIEW ==========')
            console.log(`To: ${to}`)
            console.log(`Subject: ${template.subject}`)
            console.log('--- Text Content ---')
            console.log(template.text)
            console.log('====================================\n')

            return { success: true }
        }
    } catch (error) {
        console.error('[EmailService] Error sending email:', error)
        return { success: false, error: String(error) }
    }
}

/**
 * Send welcome email to new users
 */
export async function sendWelcomeEmail(email: string, name?: string) {
    return sendEmail(email, emailTemplates.welcome(name || '', email))
}

/**
 * Send seller approval notification email
 */
export async function sendSellerApprovedEmail(email: string, name?: string) {
    return sendEmail(email, emailTemplates.sellerApproved(name || '', email))
}
