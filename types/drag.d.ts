export type Point = {
  x: number
  y: number
  id?: string | number | undefined
}

export type ElementSize = {
  width: number
  height: number
}
export type ElementRect = ElementSize & Omit<Point, 'id'>

export type Axis = 'x' | 'y'
export type ElementProps =
  | ElementSize
  | {
      name: 'width' | 'height' | 'left' | 'right'
      value: number
    }
