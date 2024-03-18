import type { Track } from '~/types/track'

export const useTracksStore = defineStore('tracks', () => {
  const tracks = ref<Track[]>([])
  const track = ref<Track>()
  const [isTrackEditModalOpen, toggleEditTrackModalState] = useToggle()

  const page = ref(1)
  const pageCount = 20

  const artistFilter = ref('')
  const tracksCount = ref(0)
  const filteredCount = ref(0)

  const filteredTracks = computed(() => {
    const filtered = tracks.value.filter(
      track =>
        track.artistName.toLowerCase().includes(artistFilter.value.toLowerCase()) ||
        track.trackTitle.toLowerCase().includes(artistFilter.value.toLowerCase())
    )
    filteredCount.value = filtered.length
    page.value = 1
    return filtered
  })

  const tracksByPage = computed(() => filteredTracks.value.slice((page.value - 1) * pageCount, page.value * pageCount))

  async function fetchTracks() {
    if (tracks.value.length) return
    const data = await $fetch<Track[]>('/api/tracks')
    tracks.value = data
    tracksCount.value = data.length
  }

  function storeRefs() {
    return { tracks, tracksCount, tracksByPage, pageCount, page, artistFilter, filteredCount, track, isTrackEditModalOpen }
  }

  return { fetchTracks, toggleEditTrackModalState, storeRefs }
})
