import { Resend } from 'resend'
import { IMailService } from './index.dto'
import * as templatesHtml from './templates'

export class ResendService implements IMailService.Implements {
  private readonly resend: Resend
  constructor({ apiKey }: IMailService.ResendProps) {
    this.resend = new Resend(apiKey)
  }
  async send({
    from,
    to,
    subject,
    template,
    body,
  }: IMailService.IPropsSend): Promise<boolean> {
    const CP = templatesHtml[template] as any
    await this.resend.emails
      .send({
        from,
        to,
        subject,
        react: CP(body),
      })
      .catch((e) => {
        console.log('error catch', e)
      })

    return true
  }
}
