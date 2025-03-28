import { z } from 'zod'

export const itemSchema = z.object({
  name: z.string(),
  seed: z.number(),
  uid: z.string()
})
export type Item = z.infer<typeof itemSchema>

export const choiceSchema = z.object({
  aItemUid: z.string(),
  bItemUid: z.string(),
  operationUid: z.string()
})
export type Choice = z.infer<typeof choiceSchema>

export const operationSchema = z.object({
  aInput: z.array(z.string()),
  ab: z.boolean(),
  ascend: z.boolean(),
  better: z.number(),
  bInput: z.array(z.string()),
  output: z.array(z.string()),
  uid: z.string(),
  worse: z.number()
})
export type Operation = z.infer<typeof operationSchema>

export const operationDefSchema = z.object({
  aInput: z.array(z.string()),
  bInput: z.array(z.string()),
  output: z.array(z.string())
})
export type OperationDef = z.infer<typeof operationDefSchema>

export const episodeSchema = z.object({
  type: z.literal('import'),
  items: z.array(itemSchema)
})
export type Episode = z.infer<typeof episodeSchema>

export const flowSchema = z.object({
  itemCount: z.number(),
  history: z.array(episodeSchema),
  items: z.record(z.string(), itemSchema),
  operationCount: z.number(),
  operations: z.record(z.string(), operationSchema),
  uid: z.string()
})
export type Flow = z.infer<typeof flowSchema>

const rankingItemSpecificSchema = z.object({
  points: z.number(),
  rank: z.number()
})
export const rankingItemSchema = itemSchema.and(rankingItemSpecificSchema)
export type RankingItem = z.infer<typeof rankingItemSchema>
