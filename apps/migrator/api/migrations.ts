// import { NextApiRequest, NextApiResponse } from 'next'
import { VercelRequest, VercelResponse } from '@vercel/node'

const API_URL = 'https://api.github.com/repos/cypress-io/cypress-dx/issues'

async function createIssueInGitHub(protractor: string, cypress: string): Promise<Response> {
  return await fetch(API_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `token ${process.env.NX_GITHUBAPI_ACCESS_TOKEN}`,
      contentType: 'text/plan',
    },
    body: JSON.stringify({
      title: `Add Missing Protractor Migrations`,
      body: `
            \n### Migration Input
            \n${protractor}
            
            \n### Migration Language/Framework
            \nProtractor
            
            \n### Cypress Migrated Output
            \n${cypress}
            
            \n### Expected Cypress Migration
            \n unknown
            `,
      labels: ['codemods', 'protractor'],
    }),
  })
}

export default async function handler(request: VercelRequest, response: VercelResponse): Promise<VercelResponse> {
  const { protractor, cypress }: { protractor: string; cypress: string } = JSON.parse(request.body)

  const body = JSON.stringify(protractor === cypress ? { protractor } : { protractor, cypress })

  // this log is here so that we can see these results logged inside of Vercel
  console.log(body)

  const issue: Response = await createIssueInGitHub(protractor, cypress)

  return issue.status === 201
    ? response.status(issue.status).send(issue.body)
    : response.status(500).send({ error: 'There was an error sending the add migration request' })
}
