import Rand from 'rand-seed'

export default function createUuid (props: {
  seed: string
  count: number
}): string {
  const seedString = `${props.seed}-${props.count}`

  const rand = new Rand(seedString)

  const bytes = []
  for (let i = 0; i < 16; i++) {
    const randomValue = rand.next()
    const byteValue = Math.floor(randomValue * 256)
    bytes.push(byteValue)
  }

  const version4Mask = 0x40
  const variantMask = 0x80

  const sixthByteBase = bytes[6] & 0x0f
  bytes[6] = sixthByteBase | version4Mask

  const eighthByteBase = bytes[8] & 0x3f
  bytes[8] = eighthByteBase | variantMask

  const hexBytes = []
  for (const byte of bytes) {
    const hexByte = byte.toString(16).padStart(2, '0')
    hexBytes.push(hexByte)
  }

  const part1 = hexBytes.slice(0, 4).join('')
  const part2 = hexBytes.slice(4, 6).join('')
  const part3 = hexBytes.slice(6, 8).join('')
  const part4 = hexBytes.slice(8, 10).join('')
  const part5 = hexBytes.slice(10, 16).join('')

  return `${part1}-${part2}-${part3}-${part4}-${part5}`
}
