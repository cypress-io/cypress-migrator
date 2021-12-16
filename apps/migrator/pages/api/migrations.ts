import { NextApiRequest, NextApiResponse } from 'next'

const API_URL = 'https://api.github.com/repos/cypress-io/cypress-migrator/issues'

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

export default async function handler(request: NextApiRequest, response: NextApiResponse): Promise<void> {
  const { protractor, cypress }: { protractor: string; cypress: string } = JSON.parse(request.body)

  const body = JSON.stringify(protractor === cypress ? { protractor } : { protractor, cypress })

  // this log is here so that we can see these results logged inside of Vercel
  console.log(body)

  const issue: Response = await createIssueInGitHub(protractor, cypress)

  return issue.status === 201 ? response.status(issue.status).json(issue.body) : response.status(500).end()
}
