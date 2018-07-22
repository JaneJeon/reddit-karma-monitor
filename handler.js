require("dotenv").config()

const snoowrap = require("snoowrap"),
  r = new snoowrap({
    userAgent: "Reddit Karma Monitor",
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    username: process.env.USERNAME,
    password: process.env.PASSWORD
  }),
  SES = require("aws-sdk/clients/ses"),
  ses = new SES()

exports.run = async () => {
  for (const comment of await r.getMe().getComments())
    if (comment.score < 1) {
      const body =
        `Deleted comment with score ${comment.score}:\n` +
        `==============================\n${comment.body}`
      console.log(body)

      await Promise.all([
        ses
          .sendEmail({
            Source: process.env.EMAIL_FROM,
            Destination: { ToAddresses: [process.env.EMAIL_TO] },
            Message: {
              Subject: { Data: "Reddit Karma Monitor" },
              Body: { Text: { Data: body } }
            }
          })
          .promise(),
        comment.delete()
      ])
    }
}
