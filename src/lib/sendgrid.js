const { Client } = require('@sendgrid/client')

class SendGrid {

  constructor() {
    this.client = new Client()
    this.client.setApiKey(process.env.SENDGRID_API_KEY)    
  }

  /**
   * 対象1名にメールを送信します
   * TODO: 複数名に送る、本文の内容をsubstitutionsで置換するなど
   *       まだまだやれることはたくさんある
   */
  async sendMail(args) {
    return await this.scheduleMail({
      ...args,
      sendAt: undefined
    })
  }

  /**
   * 日時を指定して送信
   */
  async scheduleMail({
    from,
    to,
    subject,
    contentType,
    contentValue,
    categories,
    customArgs,
    sendAt
  }) {
    const body = {
      personalizations: [
        {
          to: [ { email: to } ],
          subject: subject
        }
      ],
      from: { email: from },
      content: [
        {
          type: contentType,
          value: contentValue
        }
      ],
      categories: categories,
      custom_args: customArgs,
      "send_at": sendAt ? Math.round(sendAt.getTime() / 1000) : undefined
    }
    return await this.client.request({
      method: 'POST',
      url: '/v3/mail/send',
      body: body
    })
  }

  async sendMailWithTemplate({
    from,
    to,
    subject,
    templateId,
    templateData,
    categories,
    customArgs,
    batchId,
    sendAt
  }) {
    const body = {
      template_id: templateId,
      personalizations: [
        {
          to: [ { email: to } ],
          dynamic_template_data: templateData,
          subject: subject
        }
      ],
      from: { email: from },
      sections: {
        one: 'セクション1',
        two: 'セクション2'
      },
      headers: {
        one: 'ヘッダ1',
        two: 'ヘッダ2'
      },
      categories: categories,
      custom_args: customArgs,
      "send_at": sendAt ? Math.round(sendAt.getTime() / 1000) : undefined,
      "batch_id": batchId
    }
    return await this.client.request({
      method: 'POST',
      url: '/v3/mail/send',
      body: body
    })
  }

  async listTemplates() {
    return await this.client.request({
      method: 'GET',
      url: '/v3/templates',
      qs: {
        generations: 'dynamic'
      }
    })
  }

  async getTemplate(templateId) {
    return await this.client.request({
      method: 'GET',
      url: `/v3/templates/${templateId}`,
    })
  }

  async generateBatchId() {
    return await this.client.request({
      method: 'POST',
      url: '/v3/mail/batch'
    })
  }
}

module.exports = SendGrid