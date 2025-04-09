import { Flow, chooseOption } from '../../src'
import getVerifiedChoice from '../choice/getVerifiedChoice'

export default function chooseOptions (props: {
  flow: Flow
  options: Array<'A' | 'B'>
}): Flow {
  const chosen = props.options.reduce((flow, option) => {
    const choice = getVerifiedChoice({ flow })
    const itemUid = option === 'A' ? choice.aItemUid : choice.bItemUid
    const chosenFlow = chooseOption({
      flow, option: itemUid
    })
    return chosenFlow
  }, props.flow)
  return chosen
}
