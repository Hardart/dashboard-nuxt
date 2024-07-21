import type { ElementRect, ElementSize } from '~/types/drag'

class BaseProps {
  private BASE_SIZE = 250
  protected zoomMultiplayer = 2
  zoomValue = ref(0)
  image: HTMLImageElement | undefined = undefined
  panElement = ref<HTMLElement>()
  imageRect: Ref<ElementRect> = ref({ x: 0, y: 0, width: 0, height: 0 })
  panRect: Ref<ElementSize> = ref({ width: 0, height: 0 })

  constructor() {
    this.panRect.value.height = this.BASE_SIZE
    this.panRect.value.width = this.BASE_SIZE
  }
}

export default BaseProps
