import { defaultWindow } from '@vueuse/core'
import type DragImageClass from './Image'
import DragPointClass from './Point'

export default class Drag {
  dragImage: DragImageClass | null = null
  isDragging = false

  constructor(dragImage: DragImageClass) {
    this.dragImage = dragImage
  }

  start(e: PointerEvent) {
    if (!this.dragImage) throw createError('Image class is not defined')
    if (e.target !== toValue(this.dragImage.panElement)) return
    this.isDragging = true
    DragPointClass.updatePrevPoint(e)
    this.dragImage.updateBounds()
  }

  move(e: PointerEvent) {
    if (!this.isDragging) return
    DragPointClass.updateP1Point(e)
    this.dragImage?.setPositionOnMove()
  }

  end = (e: PointerEvent) => {
    if (!this.isDragging) return
    this.isDragging = false
  }

  setListeners() {
    if (!this.dragImage) throw createError('Image class is not defined')
    const panArea = this.dragImage.panElement
    const config = { capture: true }
    useEventListener(panArea, 'pointerdown', (e: PointerEvent) => this.start(e), config)
    useEventListener(defaultWindow, 'pointermove', (e: PointerEvent) => this.move(e), config)
    useEventListener(defaultWindow, 'pointerup', (e: PointerEvent) => this.end(e), config)
  }
}
