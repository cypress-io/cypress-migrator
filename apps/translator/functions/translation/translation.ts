import { Handler, HandlerContext, HandlerEvent, HandlerResponse } from '@netlify/functions'
import fetch from 'node-fetch'

const API_URL = 'https://api.github.com/repos/cypress-io/cypress-dx/issues'

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext): Promise<HandlerResponse> => {
  const { protractor, cypress }: { protractor: string; cypress: string } = JSON.parse(event.body)

  const body = JSON.stringify(protractor === cypress ? { protractor } : { protractor, cypress })

  // this log is here so that we can see these results logged inside of Netlify
  console.log(body)

  // await createIssue(body)
  return await fetch(API_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `token ${process.env.NX_GITHUBAPI_ACCESS_TOKEN}`,
      contentType: 'text/plain',
    },
    body: JSON.stringify({
      title: `Add Missing Protractor Translation`,
      body: `
      \n### Translation Input
      \n${protractor}
      
      \n### Translation Language/Framework
      \nProtractor
      
      \n### Cypress Translated Output
      \n${cypress}
      
      \n### Expected Cypress Translation
      \n unknown
      `,
      labels: ['codemods', 'protractor'],
    }),
  })
    .then(({ status: statusCode }) => {
      return { statusCode }
    })
    .catch((error) => {
      console.error(error)
      return { statusCode: 500 }
    })
}
