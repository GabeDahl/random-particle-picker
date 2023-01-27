interface AttractorParams {
  x: number
  y: number
  z: number
  delta: number
}
export type AttractorResults = [number, number, number]
export type ActiveAttractor = keyof typeof attractors

export const attractors = {
  lorenz: ({ x, y, z, delta }: AttractorParams): AttractorResults => {
    const σ = 10,
      ρ = 28,
      β = 8 / 3
    const xn = x + σ * (-x + y) * delta
    const yn = y + (-x * z + ρ * x - y) * delta
    const zn = z + (x * y - β * z) * delta
    return [xn, yn, zn]
  },
}
// These are some other attractors that will need work to harness.
//   aizawa: ({ x, y, z, delta }: AttractorParams): AttractorResults => {
//     const a = 0.95
//     const b = 0.7
//     const c = 0.6
//     const d = 3.5
//     const e = 0.25
//     const f = 0.1
//     const xn = (z - b) * x - d * y * delta
//     const yn = d * x + (z - b) * y * delta
//     const zn =
//       c +
//       a * z -
//       (z * z * z) / 3 -
//       (x * x + y * y) * (1 + e * z) +
//       f * z * x * x * x * delta
//     return [xn, yn, zn]
//   },
//   chen: ({ x, y, z, delta }: AttractorParams): AttractorResults => {
//     const α = 5
//     const β = -10
//     const δ = -0.38
//     const xn = α * x - y * z * delta
//     const yn = β * y + x * z * delta
//     const zn = δ * z + ((x * y) / 3) * delta
//     return [xn, yn, zn]
//   },
//   fourWing: ({ x, y, z, delta }: AttractorParams): AttractorResults => {
//     const a = 0.2,
//       b = 0.01,
//       c = -0.4
//     const xn = a * x + y * z
//     const yn = b * x + c * y - x * z
//     const zn = -z - x * y
//     return [xn, yn, zn]
//   },
//   thomas: ({ x, y, z, delta }: AttractorParams): AttractorResults => {
//     const b = 0.208186
//     const xn = (Math.sin(y) - b * x) * 0.01
//     const yn = (Math.sin(z) - b * y) * 0.01
//     const zn = (Math.sin(x) - b * z) * 0.01
//     return [xn, yn, zn]
//   },
