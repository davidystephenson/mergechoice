import getFloorHalf from './getFloorHalf'

export default function getInitialOptionIndex (props: {
  length: number
}): number {
  if (typeof props.length !== 'number') {
    throw new Error('Length must be a number')
  }
  const difference = props.length - 1
  const half = getFloorHalf({ value: difference })
  return half
}
