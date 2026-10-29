export type EventType = 'hit' | 'fault'

export interface FifoState {
  step: number
  requested: number | null
  frames: (number | null)[]
  queue: number[]
  event: EventType | null
  evicted: number | null
  hits: number
  faults: number
}

export const DEFAULT_REFERENCES = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2]
export const BELADY_REFERENCES = [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5]

export function emptyState(frameCount: number): FifoState {
  return { step: 0, requested: null, frames: Array(frameCount).fill(null), queue: [], event: null, evicted: null, hits: 0, faults: 0 }
}

export function simulateFifo(references: number[], frameCount: number): FifoState[] {
  const states: FifoState[] = [emptyState(frameCount)]
  let state = states[0]
  references.forEach((requested, index) => {
    const hit = state.frames.includes(requested)
    const frames = [...state.frames]
    const queue = [...state.queue]
    let evicted: number | null = null
    if (hit) {
      state = { ...state, step: index + 1, requested, event: 'hit', evicted: null }
    } else {
      const emptyIndex = frames.indexOf(null)
      if (emptyIndex >= 0) frames[emptyIndex] = requested
      else {
        evicted = queue.shift() ?? null
        const replaceIndex = evicted === null ? 0 : frames.indexOf(evicted)
        frames[replaceIndex] = requested
      }
      queue.push(requested)
      state = { ...state, step: index + 1, requested, frames, queue, event: 'fault', evicted, faults: state.faults + 1 }
    }
    if (hit) state = { ...state, hits: state.hits + 1 }
    states.push(state)
  })
  return states
}

export function parseReferences(input: string): { values?: number[]; error?: string } {
  const tokens = input.split(/[,\s]+/).map((token) => token.trim()).filter(Boolean)
  if (!tokens.length) return { error: 'Add at least one page reference.' }
  if (tokens.some((token) => !/^\d+$/.test(token))) return { error: 'Use whole numbers separated by commas or spaces.' }
  const values = tokens.map(Number)
  if (values.some((value) => value > 99)) return { error: 'Keep page numbers between 0 and 99.' }
  return { values }
}

export function finalStats(references: number[], frameCount: number) {
  const states = simulateFifo(references, frameCount)
  const state = states[states.length - 1]
  return { faults: state.faults, hits: state.hits }
}
