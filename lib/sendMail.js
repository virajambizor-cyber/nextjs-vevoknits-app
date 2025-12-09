import nodemaiiler from 'nodemailer'
import { success } from 'zod'
export const sendMail = async (subject, reciever, body) =>{
  const transpoter = nodemaiiler.createTransport({
     host: process.env.NODEMAILER_HOST ,
     post: process.env.NODEMAILER_PORT, 
     secure: false, 
     auth:{
         user: process.env.NODEMAILER_EMAIL, 
         pass: process.env.NODEMAILER_PASSWORD,
     }
  })

  const options ={
    from : `"Vevo Knits Garments" <${process.env.NODEMAILER_EMAIL}>`,
    to : reciever,
    subject: subject,
    html: body  
  }
  try {
    await transpoter.sendMail(options)
    return {success: true}
  } catch (error) {
    return { success:false, message:error.message}
  }
}