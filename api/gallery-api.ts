import type { Slide } from '~/scheme/z_slide'
import type { ResponseApi } from '~/types/fetch'

export const galleryAPI = {
  async list() {
    const { data } = await useCustomFetch<ResponseApi.SlideList>('/gallery')
    return data.value?.slides || []
  },

  async updateAll(body: MaybeRef<Slide[]>) {
    const toast = useToast()
    body = toValue(body)
    const { data } = await useCustomFetch<ResponseApi.SlideList>('/gallery-update', { body })
    if (data.value)
      toast.add({ title: 'Слайды успешно обновлены', timeout: 2500, color: 'emerald', icon: 'i-heroicons-check-circle-16-solid' })
    return data.value?.slides || []
  },

  async addOne(body: Slide) {
    const toast = useToast()
    const { data } = await useCustomFetch<ResponseApi.SlideSingle>('/gallery-add', { body })
    if (data.value)
      toast.add({ title: 'Слайд успешно добавлен', timeout: 2500, color: 'emerald', icon: 'i-heroicons-check-circle-16-solid' })
    return data.value?.slide
  }
}
