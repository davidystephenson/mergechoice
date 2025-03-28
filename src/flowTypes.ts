import { z } from 'zod'

export const uidSchema = z.string().or(z.number())
export type Uid = z.infer<typeof uidSchema>

export const itemSchema = z.object({
  name: z.string(),
  seed: z.number(),
  uid: uidSchema
})
export type Item = z.infer<typeof itemSchema>

export const choiceSchema = z.object({
  aItemId: uidSchema,
  bItemId: uidSchema,
  operationId: uidSchema
})
export type Choice = z.infer<typeof choiceSchema>

export const operationSchema = z.object({
  aInput: z.array(uidSchema),
  ab: z.boolean(),
  ascend: z.boolean(),
  better: z.number(),
  bInput: z.array(uidSchema),
  output: z.array(uidSchema),
  uid: uidSchema,
  worse: z.number()
})
export type Operation = z.infer<typeof operationSchema>

export const operationDefSchema = z.object({
  aInput: z.array(uidSchema),
  bInput: z.array(uidSchema),
  output: z.array(uidSchema)
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
  items: z.record(uidSchema, itemSchema),
  operationCount: z.number(),
  operations: z.record(uidSchema, operationSchema),
  uid: uidSchema
})
export type Flow = z.infer<typeof flowSchema>

const rankingItemSpecificSchema = z.object({
  points: z.number(),
  rank: z.number()
})
export const rankingItemSchema = itemSchema.and(rankingItemSpecificSchema)
export type RankingItem = z.infer<typeof rankingItemSchema>
