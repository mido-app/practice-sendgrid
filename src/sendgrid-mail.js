const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const msg = {
  from: 'yutaka.omido@gmail.com',
  to: 'yutaka.omido@gmail.com',
  subject: 'SendGrid Test Mail',
  text: 'This is a test mail using SendGrid',
  html: '<strong>Do not reply this address because it is for send only.</strong>'
}

sgMail
  .send(msg)
  .then(res => {
    console.log(res)
    console.log('success!')
  })
  .catch(err => {
    console.error(err)
    console.log('error!')
  })
