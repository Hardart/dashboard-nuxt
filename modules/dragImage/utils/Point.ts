import type { ElementRect, Point } from '~/types/drag'

class DragPointClass {
  static p1: Point = { x: 0, y: 0 }
  static prevP1: Point = { x: 0, y: 0 }

  static equalizePoints(p1: Point, p2: Point): Point {
    p1.x = p2.x
    p1.y = p2.y
    if (p2.id !== undefined) p1.id = p2.id
    return p1
  }

  static isPointsEqual(p1: Point, p2: Point): boolean {
    return p1.x === p2.x && p1.y === p2.y
  }

  static updatePrevPoint(e: Touch | PointerEvent) {
    this.prevP1 = this.eventPositionToPoint(e, { x: 0, y: 0 })
  }
  static updateP1Point(e: Touch | PointerEvent) {
    this.eventPositionToPoint(e, this.p1)
  }

  static roundPoint(rect: MaybeRef<ElementRect>) {
    rect = toValue(rect)
    rect.x = Math.round(rect.x)
    rect.y = Math.round(rect.y)
    rect.width = Math.round(rect.width)
    rect.height = Math.round(rect.height)
  }

  static eventPositionToPoint(e: Touch | PointerEvent, p: Point): Point {
    p.x = e.pageX
    p.y = e.pageY

    if ('pointerId' in e) p.id = e.pointerId
    else if (e.identifier !== undefined) p.id = e.identifier

    return p
  }

  static getDelta(): Point {
    const x = this.p1.x - this.prevP1.x
    const y = this.p1.y - this.prevP1.y
    DragPointClass.equalizePoints(this.prevP1, this.p1)
    return { x, y }
  }
}

export default DragPointClass
