import { trackAPI } from '~/api/track-api'
import type { Track } from '~/scheme/z_track'

export const useTracksStore = defineStore('tracks', () => {
  const loading = ref(false)
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
      (track) =>
        track.artistName.toLowerCase().includes(artistFilter.value.toLowerCase()) ||
        track.trackTitle.toLowerCase().includes(artistFilter.value.toLowerCase())
    )
    filteredCount.value = filtered.length
    page.value = 1
    return filtered
  })

  const tracksByPage = computed(() => filteredTracks.value.slice((page.value - 1) * pageCount, page.value * pageCount))

  async function fetchTracks() {
    tracks.value = await trackAPI.list()
    tracksCount.value = tracks.value.length
  }

  function storeRefs() {
    return {
      tracks,
      tracksCount,
      tracksByPage,
      pageCount,
      page,
      artistFilter,
      filteredCount,
      track,
      isTrackEditModalOpen,
      loading
    }
  }

  return { fetchTracks, toggleEditTrackModalState, storeRefs }
})
