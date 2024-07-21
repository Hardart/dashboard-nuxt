import type { ElementRect, ElementSize } from '~/types/drag'
import DragPointClass from './Point'
import DragBounds from './Bounds'
import Drag from './Drag'

class DragImageClass extends DragBounds {
  dragClass: Drag | undefined = undefined

  constructor(src: string, panElement: Ref<HTMLElement | undefined>) {
    super()
    this._preloadImage(src)
    this.panElement = panElement
    this.dragClass = new Drag(this)

    watch(this.zoomValue, () => {
      const zoom = this.zoomValue.value * this.zoomMultiplayer
      if (!this.image) throw createError('Image is not defined')
      const { height, width } = this.image
      const newValue = (this._isHorisontal ? height : width) + zoom
      this._correctImageSize(newValue)
      this.updateBounds()
      this.setPositionOnMove()
    })
  }

  private _preloadImage(src: string) {
    this.image = new Image()
    this.image.src = src
    this.image.onload = () => this._onLoadImage()
  }

  private _onLoadImage() {
    if (!this.image) throw createError('Image is not defined')
    this._setNaturalWidthToRect(this.image)
    this._correctImageSize()
    this._setCorrectedSizeToImage()
    DragPointClass.roundPoint(this.imageRect)
    this.dragClass?.setListeners()
  }

  private _setNaturalWidthToRect({ naturalHeight, naturalWidth }: HTMLImageElement) {
    this.imageRect.value.width = naturalWidth
    this.imageRect.value.height = naturalHeight
  }

  private _setCorrectedSizeToImage() {
    if (!this.image) throw createError('Image is not defined')
    this.image.width = this.imageRect.value.width
    this.image.height = this.imageRect.value.height
  }

  get props() {
    return {
      zoomValue: this.zoomValue,
      crop: computed(() => this.panElement.value?.clientWidth),
      imageStyle: computed(() => toStyleString(this.imageRect, true)),
      panStyle: computed(() => `width: ${this.panRect.value.width}px; height: ${this.panRect.value.height}px`),
      imageRect: computed(() => this.imageRect.value)
    }
  }

  private get _isHorisontal() {
    return this.image ? this.image.height < this.image.width : true
  }

  private get _ratio() {
    if (this.image) {
      const { height, width } = this.image
      return this._isHorisontal ? width / height : height / width
    } else {
      return 1
    }
  }

  private _correctImageSize = (propValue?: number) => {
    const { width, height } = this.panRect.value
    const w = propValue ? propValue : width
    const h = propValue ? propValue : height

    switch (true) {
      case this._isHorisontal && this._ratio !== 1:
        this._setRectValue('height', h)
        this._setRectValue('width', h * this._ratio)
        break
      case !this._isHorisontal && this._ratio !== 1:
        this._setRectValue('width', w)
        this._setRectValue('height', w * this._ratio)
        break

      default:
        this._setRectValue('width', w)
        this._setRectValue('height', w)
        break
    }
  }

  private _setRectValue(prop: 'width' | 'height', value: number) {
    this.imageRect.value[prop] = value
  }

  setPositionOnMove() {
    const { x, y } = DragPointClass.getDelta()
    this.imageRect.value.x += x
    this.imageRect.value.y += y
    this._correctPanBounds()
  }
}

export default DragImageClass

function toStyleString(rect: MaybeRef<ElementRect>, setTransform: boolean = false) {
  rect = toValue(rect)
  let style = `width: ${rect.width}px; height: ${rect.height}px; min-width: ${rect.width}px;`
  if (setTransform) style += `transform: translate3d(${rect.x}px,${rect.y}px,0)`
  return style
}
