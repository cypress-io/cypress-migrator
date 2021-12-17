import { MarkedOptions, MarkedRenderer } from 'ngx-markdown'

export function markdownOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer()

  renderer.table = (header: string, body: string) =>
    `
      <div class="flex flex-col mb-12 mt-4">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              ${header}
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              ${body}
            </tbody>
          </table>
            </div>
          </div>
        </div>
      </div>
      `

  renderer.tablecell = (content: string) =>
    `
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"><code>${content}</code></td>
      `

  renderer.heading = (text: string) =>
    `
    <div class="pb-2 border-b border-gray-200">
        <h2 class="text-lg leading-6 font-medium text-gray-900">${text}</h2>
      </div>
    `

  return {
    renderer,
  }
}
