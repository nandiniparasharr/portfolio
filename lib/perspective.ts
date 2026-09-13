/* ------------------------------------------------------------------
   Mapping a screen point onto a surface that is tilted in 3D.

   The easel leans away from the viewer — perspective + rotateY — so the
   canvas face reaches the screen as a trapezium, not a rectangle. A
   bounding rect on it gives the axis-aligned box *around* that trapezium,
   which is the wrong shape to measure a drop position against: the same
   cursor position would mean different places depending on how far up the
   canvas you are.

   A perspective projection of a plane is a homography, so four known
   corners are enough to recover it exactly. Invert it and any screen point
   maps back to a fraction across and down the surface.
   ------------------------------------------------------------------ */

export type Mat3 = [
  number, number, number,
  number, number, number,
  number, number, number,
]

export type Pt = { x: number; y: number }

/** Homography taking the unit square to `quad`, given in the order
    (0,0) (1,0) (1,1) (0,1). Heckbert's construction. */
export function squareToQuad(quad: Pt[]): Mat3 {
  const [p0, p1, p2, p3] = quad
  const dx1 = p1.x - p2.x
  const dx2 = p3.x - p2.x
  const dx3 = p0.x - p1.x + p2.x - p3.x
  const dy1 = p1.y - p2.y
  const dy2 = p3.y - p2.y
  const dy3 = p0.y - p1.y + p2.y - p3.y

  /* No fourth-corner drift means the quad is a parallelogram and the map is
     merely affine — the general form divides by zero there. */
  if (Math.abs(dx3) < 1e-9 && Math.abs(dy3) < 1e-9) {
    return [
      p1.x - p0.x, p2.x - p1.x, p0.x,
      p1.y - p0.y, p2.y - p1.y, p0.y,
      0, 0, 1,
    ]
  }

  const den = dx1 * dy2 - dx2 * dy1
  const g = (dx3 * dy2 - dx2 * dy3) / den
  const h = (dx1 * dy3 - dx3 * dy1) / den
  return [
    p1.x - p0.x + g * p1.x, p3.x - p0.x + h * p3.x, p0.x,
    p1.y - p0.y + g * p1.y, p3.y - p0.y + h * p3.y, p0.y,
    g, h, 1,
  ]
}

export function invert(m: Mat3): Mat3 | null {
  const [a, b, c, d, e, f, g, h, i] = m
  const A = e * i - f * h
  const D = -(d * i - f * g)
  const G = d * h - e * g
  const det = a * A + b * D + c * G
  /* A degenerate quad — the scene not laid out yet, or collapsed to nothing
     by a display:none ancestor — has no inverse. Callers skip the drag. */
  if (!Number.isFinite(det) || Math.abs(det) < 1e-12) return null
  return [
    A / det, -(b * i - c * h) / det, (b * f - c * e) / det,
    D / det, (a * i - c * g) / det, -(a * f - c * d) / det,
    G / det, -(a * h - b * g) / det, (a * e - b * d) / det,
  ]
}

/** Apply a homography to a point, dividing through by the weight. */
export function project(m: Mat3, x: number, y: number): Pt {
  const [a, b, c, d, e, f, g, h, i] = m
  const w = g * x + h * y + i
  return { x: (a * x + b * y + c) / w, y: (d * x + e * y + f) / w }
}

export function clamp(v: number, lo: number, hi: number) {
  return v < lo ? lo : v > hi ? hi : v
}
