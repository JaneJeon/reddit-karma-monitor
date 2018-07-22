# Reddit Karma Monitor
A node.js serverless AWS stack that checks your new Reddit comments' karma

## Before You Start
1. Copy `.env.example` to `.env` and fill out the configuration.
2. **Make sure** that your emails are "verified" with Amazon SES. The easiest way to do so is through the AWS console.
3. Install the serverless framework: `yarn global add serverless`

Deploy using `sls deploy`.