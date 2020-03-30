const SendGrid = require('./lib/sendgrid')

async function main () {
  const sendgrid = new SendGrid()

  // 今すぐメールを送る
  // await sendgrid.sendMail({
  //   from: 'yutaka.omido@gmail.com',
  //   to: 'yutaka.omido@example.com',
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
  //   from: 'yutaka.omido@gmail.com',
  //   to: 'yutaka.omido@example.com',
  //   subject: 'SendGrid Test Mail',
  //   contentType: 'text/html',
  //   contentValue: '<strong>Do not reply this address because it is for send only.</strong>',
  //   sendAt: sendAt
  // })

  // テンプレート一覧取得
  // const templateResponse = await sendgrid.listTemplates()
  // templateResponse[1].templates.forEach(template => {
  //   console.log(`----- template ${template.id} -----`)    
  //   console.log(template)
  // })

  // テンプレート取得
  // const template = await sendgrid.getTemplate('d-edbc1d3bb0ff43f59b2e3bc965ebfea3')
  // console.log(JSON.stringify(template))
  // return template

  // テンプレートを利用して送信
  // const sendMailResponse = await sendgrid.sendMailWithTemplate({
  //   from: 'yutaka.omido@gmail.com',
  //   to: 'yutaka.omido@gmail.com',
  //   subject: 'SendGrid Test Mail',
  //   templateId: 'd-fefe23b10789461bab638f738d24655b',
  //   templateData: {
  //     Button_Url: 'https://qiita.com/'
  //   },
  //   customArgs: {
  //     username: 'mido-app'
  //   }
  // })
  // console.log(Object.keys(rsendMailResponsees[0]))
  // console.log(sendMailResponse[0].headers)
  // console.log(sendMailResponse[1])

  // バッチID発行
  const batchIdResponse = await sendgrid.generateBatchId()
  console.log(batchIdResponse[0].headers)
  console.log(batchIdResponse[1])
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
