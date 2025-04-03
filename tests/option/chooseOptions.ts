import { Flow, chooseOption } from '../../src'
import getVerifiedChoice from '../choice/getVerifiedChoice'

export default function chooseOptions (props: {
  flow: Flow
  options: Array<'a' | 'b'>
}): Flow {
  const chosen = props.options.reduce((flow, option) => {
    const choice = getVerifiedChoice({ flow })
    const itemUid = option === 'a' ? choice.aItem : choice.bItem
    const chosenFlow = chooseOption({
      flow, option: itemUid
    })
    return chosenFlow
  }, props.flow)
  return chosen
}
