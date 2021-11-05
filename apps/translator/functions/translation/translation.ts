import { Handler, HandlerContext, HandlerEvent } from '@netlify/functions'

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const { protractor, cypress }: { protractor: string; cypress: string } = JSON.parse(event.body)

  const body = JSON.stringify(protractor === cypress ? { protractor } : { protractor, cypress })

  console.log(body)

  return {
    statusCode: 200,
    body,
  }
}
