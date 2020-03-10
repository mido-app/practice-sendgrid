const SendGrid = require('./lib/sendgrid')

async function main () {
  const sendgrid = new SendGrid()

  // 今すぐメールを送る
  // await sendgrid.sendMail({
  //   from: 'send-mail-test@example.com',
  //   to: 'xxx@example.com',
  //   subject: 'SendGrid Test Mail',
  //   contentType: 'text/html',
  //   contentValue: '<strong>Do not reply this address because it is for send only.</strong>',
  //   categories: [ 'category1' ],
  //   customArgs: {
  //     username: 'mido-app'
  //   }
  // })

  // 3時間後にメールを送る
  // let sendAt = new Date()
  // sendAt.setHours(sendAt.getHours() + 3)
  // await sendgrid.scheduleMail({
  //   from: 'send-mail-test@example.com',
  //   to: 'xxx@example.com',
  //   subject: 'SendGrid Test Mail',
  //   contentType: 'text/html',
  //   contentValue: '<strong>Do not reply this address because it is for send only.</strong>',
  //   sendAt: sendAt
  // })

  // テンプレート一覧取得
  // return await sendgrid.listTemplates()

  // テンプレート取得
  // const template = await sendgrid.getTemplate('d-edbc1d3bb0ff43f59b2e3bc965ebfea3')
  // console.log(JSON.stringify(template))

  // テンプレートを利用して送信
  await sendgrid.sendMailWithTemplate({
    from: 'send-mail-test@example.com',
    to: 'xxx@example.com',
    subject: 'SendGrid Test Mail',
    templateId: 'd-edbc1d3bb0ff43f59b2e3bc965ebfea3',
    templateData: {
      message: 'これはコードから埋め込まれたメッセージです'
    },
    customArgs: {
      username: 'mido-app'
    }
  })
}

main()
  .then(res => {
    console.log('success')
  })
  .catch(err => {
    console.error(err)
    err.response.body.errors.forEach(e => {
      console.error(e)
    });
  })
