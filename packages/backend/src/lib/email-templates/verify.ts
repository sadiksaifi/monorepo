/* eslint-disable no-irregular-whitespace */
interface VerifyEmailParams {
  name: string;
  verificationLink: string;
}

const metadata = {
  logoUrl: "https://www.sadiksaifi.dev/static/logo.jpeg",
  companyName: "Sadiksaifi",
  companyAddress: "Bangalore, India",
  companyPhone: "+91 0000000000",
  companyEmail: "mail@sadiksaifi.dev",
};

export function verifyAccountTemplate({ name, verificationLink }: VerifyEmailParams) {
  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">

  <head>
    <link rel="preload" as="image" href="https://www.sadiksaifi.dev/static/logo.jpeg" />
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" /><!--$-->
  </head>
  <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Welcome to ${metadata.companyName} - Verify Your Account<div> ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿</div>
  </div>

  <body style="background-color:rgb(243,244,246);font-family:ui-sans-serif, system-ui, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;">
    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="margin-left:auto;margin-right:auto;margin-top:40px;margin-bottom:40px;background-color:rgb(255,255,255);padding:20px;border-radius:8px;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), 0 1px 2px 0 rgb(0,0,0,0.05);max-width:600px">
      <tbody>
        <tr style="width:100%">
          <td>
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="margin-top:32px;text-align:center">
              <tbody>
                <tr>
                  <td><img alt="Kin Technology | CRM Logo" src="${metadata.logoUrl}" style="width:100%;height:auto;object-fit:cover;max-width:200px;margin-left:auto;margin-right:auto;display:block;outline:none;border:none;text-decoration:none" /></td>
                </tr>
              </tbody>
            </table>
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="margin-top:32px">
              <tbody>
                <tr>
                  <td>
                    <h1 style="font-size:24px;font-weight:700;color:rgb(31,41,55);text-align:center">Welcome to ${metadata.companyName}!</h1>
                  </td>
                </tr>
              </tbody>
            </table>
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="margin-top:24px">
              <tbody>
                <tr>
                  <td>
                    <p style="font-size:16px;line-height:24px;color:rgb(55,65,81);margin-bottom:16px;margin-top:16px">Hello ${name},</p>
                    <p style="font-size:16px;line-height:24px;color:rgb(55,65,81);margin-bottom:16px;margin-top:16px">You have been invited to ${metadata.companyName}! We&#x27;re excited to have you on board and can&#x27;t wait to help you streamline your customer relationship management experience.</p>
                    <p style="font-size:16px;line-height:24px;color:rgb(55,65,81);margin-bottom:16px;margin-top:16px">Our platform is designed to help you manage customer interactions, track sales opportunities, and boost your team&#x27;s productivity with powerful yet intuitive tools.</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="margin-top:32px;text-align:center">
              <tbody>
                <tr>
                  <td>
                    <p style="font-size:16px;line-height:24px;color:rgb(55,65,81);margin-bottom:16px;margin-top:16px">To get started, please verify your account by clicking the button below:</p><a href=${verificationLink} style="background-color:rgb(37,99,235);color:rgb(255,255,255);font-weight:700;padding-top:12px;padding-bottom:12px;padding-left:24px;padding-right:24px;border-radius:4px;text-decoration-line:none;text-align:center;box-sizing:border-box;line-height:100%;text-decoration:none;display:inline-block;max-width:100%;mso-padding-alt:0px;padding:12px 24px 12px 24px" target="_blank"><span><!--[if mso]><i style="mso-font-width:400%;mso-text-raise:18" hidden>&#8202;&#8202;&#8202;</i><![endif]--></span><span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:9px">Verify My Account</span><span><!--[if mso]><i style="mso-font-width:400%" hidden>&#8202;&#8202;&#8202;&#8203;</i><![endif]--></span></a>
                  </td>
                </tr>
              </tbody>
            </table>
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="margin-top:32px">
              <tbody>
                <tr>
                  <td>
                    <p style="font-size:16px;line-height:24px;color:rgb(55,65,81);font-weight:700;margin-bottom:16px;margin-top:16px">Next Steps:</p>
                    <p style="font-size:14px;line-height:22px;color:rgb(55,65,81);margin-left:16px;margin-bottom:16px;margin-top:16px"><strong>1.</strong> Download your credentials after clicking the link above. You&#x27;ll land on a page where you can download your login credentials.</p>
                    <p style="font-size:14px;line-height:22px;color:rgb(55,65,81);margin-left:16px;margin-bottom:16px;margin-top:16px"><strong>2.</strong> Use these credentials to log in and start using the CRM.</p>
                    <p style="font-size:14px;line-height:22px;color:rgb(55,65,81);margin-left:16px;margin-bottom:16px;margin-top:16px"><strong>3.</strong> (Optional) You can go to Settings to change your password if you prefer.</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="margin-top:32px">
              <tbody>
                <tr>
                  <td>
                    <p style="font-size:16px;line-height:24px;color:rgb(55,65,81);margin-bottom:16px;margin-top:16px">If you have any questions or need assistance, our support team is here to help. Simply reply to this email or contact us at ${metadata.companyEmail}.</p>
                    <p style="font-size:16px;line-height:24px;color:rgb(55,65,81);margin-top:16px;margin-bottom:16px">We look forward to helping you!</p>
                    <p style="font-size:16px;line-height:24px;color:rgb(55,65,81);font-weight:700;margin-top:16px;margin-bottom:16px">${metadata.companyName} Team</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="margin-top:48px;padding-top:24px;border-top-width:1px;border-color:rgb(209,213,219)">
              <tbody>
                <tr>
                  <td>
                    <p style="font-size:12px;line-height:16px;color:rgb(107,114,128);text-align:center;margin:0px;margin-bottom:16px;margin-top:16px">© <!-- -->2025<!-- --> ${metadata.companyName}. All rights reserved.</p>
                    <p style="font-size:12px;line-height:16px;color:rgb(107,114,128);text-align:center;margin:0px;margin-bottom:16px;margin-top:16px">${metadata.companyAddress}</p>
                    <p style="font-size:12px;line-height:16px;color:rgb(107,114,128);text-align:center;margin-top:8px;margin-bottom:16px"><a href="#" style="color:rgb(107,114,128);text-decoration-line:underline" target="_blank">Unsubscribe</a> <!-- -->•<!-- --> <a href="#" style="color:rgb(107,114,128);text-decoration-line:underline" target="_blank">Privacy Policy</a></p>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table><!--/$-->
  </body>

</html>
`;
}
