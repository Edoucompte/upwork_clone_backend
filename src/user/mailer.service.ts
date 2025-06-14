import { Resend } from 'resend';

export class MailerService {
  private readonly mailer: Resend;
  constructor() {
    const resendApiKey = process.env.RESEND_API_KEY;
    this.mailer = new Resend(resendApiKey);
  }

  async createAccountEmail({
    recipient,
    prenom,
  }: {
    recipient: string;
    prenom: string;
  }) {
    const { data, error } = await this.mailer.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [recipient],
      subject: 'Bienvenu sur la plateforme',
      html:
        `Bonjour ${prenom}, et Bienvenu chez nous ! Nous sommes ` +
        '<strong>heureux</strong> de vous avoir parmi nous.',
    });

    if (error) {
      return console.error({ error });
    }

    console.log({ data });
  }

  async sendResquestedPassword({
    recipient,
    prenom,
    token,
  }: {
    recipient: string;
    prenom: string;
    token: string;
  }) {
    const link = `${process.env.FRONTEND_URL}forget-password?token=${token}`;
    const { data, error } = await this.mailer.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [recipient],
      subject: 'Pour reinitialiser votre mot de password',
      html: `Bonjour ${prenom}, voici le lien de reinitialisation de votre mot de passe: ${link}`,
    });

    if (error) {
      return console.error({ error });
    }

    console.log({ data });
  }
}
