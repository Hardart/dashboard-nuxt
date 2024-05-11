import type { ResponseApi } from '~/types/fetch'
import type { ITunesResponse } from '~/types/itunes'

export const trackAPI = {
  async list() {
    const { data } = await useCustomFetch<ResponseApi.TrackList>('/track-list')
    return data.value?.tracks || []
  },

  async getITunesMetadata(term: string) {
    const response = await $fetch<ITunesResponse>('https://itunes.apple.com/search', {
      query: { term, limit: '1', entity: 'song', media: 'music' },
      parseResponse: JSON.parse
    })
    return response.resultCount === 1 ? response.results[0] : null
  }
}
