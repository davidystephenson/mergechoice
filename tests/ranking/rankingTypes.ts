import { RankingItem } from '../../src'

export type RankingTest = Omit<RankingItem, 'name' | 'seed'>
