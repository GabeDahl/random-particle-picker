interface StepFunctionParams {
  x: number
  y: number
  z: number
  delta: number
}
export type AttractorResults = [number, number, number]
export type AttractorStepFunction = (
  params: StepFunctionParams,
) => AttractorResults

export interface Attractor {
  initialPosition: [number, number, number]
  stepForward: AttractorStepFunction
  defaultCameraPosition?: [number, number, number]
  defaultSpeed?: number
}

const lorenz: Attractor = {
  initialPosition: [0, 0, 0],
  stepForward: ({ x, y, z, delta }) => {
    if (Math.abs(x) > 100 || Math.abs(y) > 100 || Math.abs(z) > 100) {
      return lorenz.initialPosition
    }
    const σ = 10,
      ρ = 28,
      β = 8 / 3
    const xn = x + σ * (-x + y) * delta
    const yn = y + (-x * z + ρ * x - y) * delta
    const zn = z + (x * y - β * z) * delta
    return [xn, yn, zn]
  },
}

const rossler: Attractor = {
  initialPosition: [0, 0, 0],
  defaultCameraPosition: [-1.03, -59.54, 45.23],
  defaultSpeed: 10,
  stepForward: ({ x, y, z, delta }) => {
    if (Math.abs(x) > 100 || Math.abs(y) > 100 || Math.abs(z) > 100) {
      return rossler.initialPosition
    }
    const a = 0.15,
      b = 0.2,
      c = 14
    const xn = x + (-y - z) * delta
    const yn = y + (x + a * y) * delta
    const zn = z + (b + z * (x - c)) * delta
    return [xn, yn, zn]
  },
}

export const attractors = {
  lorenz,
  // aizawa,
  // thomas,
  // chen,
  // henon,
  rossler,
}
export type AttractorKey = keyof typeof attractors

// these need to be fixed
const aizawa: Attractor = {
  initialPosition: [0.1, 0, 0],
  stepForward: ({ x, y, z, delta }) => {
    if (Math.abs(x) > 100 || Math.abs(y) > 100 || Math.abs(z) > 100) {
      return aizawa.initialPosition
    }
    const a = 0.9
    const b = 0.7
    const c = 2
    const dx = -y - z
    const dy = x + a * y
    const dz = b + z * (x - c)
    const xn = x + dx * delta
    const yn = y + dy * delta
    const zn = z + dz * delta
    return [xn, yn, zn]
  },
}

const chen: Attractor = {
  initialPosition: [1.0, 1.0, 1.0],
  stepForward: ({ x, y, z, delta }) => {
    if (Math.abs(x) > 100 || Math.abs(y) > 100 || Math.abs(z) > 100) {
      return chen.initialPosition
    }
    const α = 5
    const β = -10
    const δ = -0.38
    const xn = α * x - y * z * delta
    const yn = β * y + x * z * delta
    const zn = δ * z + ((x * y) / 3) * delta
    return [xn, yn, zn]
  },
}

const thomas: Attractor = {
  initialPosition: [0, 0, 0],
  stepForward: ({ x, y, z, delta }) => {
    if (Math.abs(x) > 100 || Math.abs(y) > 100 || Math.abs(z) > 100) {
      return thomas.initialPosition
    }
    const a = 0.9,
      b = -0.6013,
      c = 2
    const xn = y + z + delta * (y * (b + z) - x * c)
    const yn = x + a * y + delta * (x * z - y * b)
    const zn = b * z + x * y + delta * (c * z - x * y)
    return [xn, yn, zn]
  },
}

const henon: Attractor = {
  initialPosition: [1, 1, 0],
  stepForward: ({ x, y, z, delta }) => {
    if (Math.abs(x) > 100 || Math.abs(y) > 100 || Math.abs(z) > 100) {
      return [Math.random(), Math.random(), 0]
    }
    const a = 1.4,
      b = 0.3
    const xn = y + delta * (1 - a * x * x)
    const yn = b - x + delta * (a * x - x * x * x - y)
    const zn = 0

    return [xn, yn, zn]
  },
}
