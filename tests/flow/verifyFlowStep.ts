import { Flow, getChoice, getRanking, isFlowComplete } from '../../src'
import getVerifiedChoice from '../choice/getVerifiedChoice'
import chooseOptions from '../option/chooseOptions'
import { OptionArray, OptionsTest } from '../option/optionTypes'
import { RankingTest } from '../ranking/rankingTypes'
import verifyRankingItems from '../ranking/verifyRankingItems'

export default function verifyFlowStep (props: {
  choice: OptionsTest | undefined
  createInitialFlow: () => Flow
  ranking: RankingTest[]
  options: OptionArray
}): void {
  function setupFlow (): Flow {
    const initialFlow = props.createInitialFlow()
    const chosenFlow = chooseOptions({
      flow: initialFlow, options: props.options
    })
    return chosenFlow
  }

  if (props.choice == null) {
    it('should be completed', () => {
      const flow = setupFlow()
      const completed = isFlowComplete({ flow })
      expect(completed).toBe(true)
    })
  } else {
    it('should not be completed', () => {
      const flow = setupFlow()
      const completed = isFlowComplete({ flow })
      expect(completed).toBe(false)
    })
  }

  const rankingLabels = props.ranking.map((item) => {
    const label = `${item.uid} rank ${item.rank} with ${item.points} points`
    return label
  })
  const rankingJoined = rankingLabels.join(', ')
  const rankingLabel = `should give ${rankingJoined}`

  it(rankingLabel, () => {
    const flow = setupFlow()
    const ranking = getRanking({ flow })
    verifyRankingItems({ ranking, items: props.ranking })
  })

  if (props.choice == null) {
    it('should not create a choice', () => {
      const flow = setupFlow()
      const choice = getChoice({ flow })
      expect(choice).toBeUndefined()
    })
  } else {
    const choiceLabel = `should create a choice with ${props.choice.a} as a ${props.choice.b} as b`
    it(choiceLabel, () => {
      if (props.choice == null) {
        throw new Error('Choice is null')
      }
      const flow = setupFlow()
      const choice = getVerifiedChoice({ flow })
      const options = new Set([choice.aItemUid, choice.bItemUid])
      expect(options).toContain(props.choice.a)
      expect(options).toContain(props.choice.b)
      expect(choice.aItemUid).toBe(props.choice.a)
      expect(choice.bItemUid).toBe(props.choice.b)
    })
  }
}
