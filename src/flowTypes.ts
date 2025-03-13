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
  a: uidSchema,
  b: uidSchema
})
export type Choice = z.infer<typeof choiceSchema>

export const operationSchema = z.object({
  a: z.array(uidSchema),
  ab: z.boolean(),
  ascend: z.boolean(),
  better: uidSchema.optional(),
  b: z.array(uidSchema),
  output: z.array(uidSchema),
  uid: uidSchema,
  worse: uidSchema.optional()
})
export type Operation = z.infer<typeof operationSchema>

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
