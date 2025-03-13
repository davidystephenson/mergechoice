import { z } from 'zod'

export const uuidSchema = z.string().or(z.number())
export type Uuid = z.infer<typeof uuidSchema>

export const itemSchema = z.object({
  name: z.string(),
  seed: z.number(),
  uuid: uuidSchema
})
export type Item = z.infer<typeof itemSchema>

export const choiceSchema = z.object({
  a: uuidSchema,
  b: uuidSchema
})
export type Choice = z.infer<typeof choiceSchema>

export const operationSchema = z.object({
  a: z.array(uuidSchema),
  ab: z.boolean(),
  b: z.array(uuidSchema),
  output: z.array(uuidSchema),
  uuid: uuidSchema
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
  items: z.record(uuidSchema, itemSchema),
  operationCount: z.number(),
  operations: z.record(uuidSchema, operationSchema),
  seed: z.string()
})
export type Flow = z.infer<typeof flowSchema>
