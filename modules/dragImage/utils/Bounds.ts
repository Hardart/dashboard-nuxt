import type { Axis, Point } from '~/types/drag'
import BaseProps from './Base'

class DragBounds extends BaseProps {
  private maxBoundValue: Ref<Point> = ref({ x: 0, y: 0 })
  private minBoundValue: Ref<Point> = ref({ x: 0, y: 0 })

  private _updateAxis(axis: Axis, sizeValue: number, panAreaSize: number) {
    this.maxBoundValue.value[axis] = sizeValue > panAreaSize ? (panAreaSize - sizeValue) / 2 : 0
    this.minBoundValue.value[axis] = sizeValue > panAreaSize ? ((panAreaSize - sizeValue) / 2) * -1 : 0
  }

  private _clamp(val: number, min: number, max: number) {
    return Math.min(Math.max(val, min), max)
  }

  private _correctPan(axis: Axis, panOffset: number) {
    return this._clamp(panOffset, this.maxBoundValue.value[axis], this.minBoundValue.value[axis])
  }

  protected _correctPanBounds() {
    this.imageRect.value.x = this._correctPan('x', this.imageRect.value.x)
    this.imageRect.value.y = this._correctPan('y', this.imageRect.value.y)
  }

  updateBounds() {
    this._updateAxis('x', this.imageRect.value.width, this.panRect.value.width)
    this._updateAxis('y', this.imageRect.value.height, this.panRect.value.height)
  }
}

export default DragBounds
