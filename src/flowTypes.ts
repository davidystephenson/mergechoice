import { z } from 'zod'

const uuidSchema = z.string().or(z.number())
export type Uuid = z.infer<typeof uuidSchema>

export const itemSchema = z.object({
  name: z.string(),
  seed: z.number(),
  uuid: uuidSchema
})
export type Item = z.infer<typeof itemSchema>

const choiceSchema = z.object({
  a: uuidSchema,
  b: uuidSchema
})

const operationSchema = z.array(uuidSchema)

const episodeSchema = z.object({
  type: z.string(),
  items: z.array(itemSchema)
})

export const flowSchema = z.object({
  seed: uuidSchema,
  choice: choiceSchema.optional(),
  items: z.record(uuidSchema, itemSchema).optional(),
  operations: z.record(uuidSchema, operationSchema).optional(),
  history: z.array(episodeSchema).optional(),
  selectedOption: z.enum(['a', 'b']).optional(),
  selectedUuid: uuidSchema.optional()
})
export type Flow = z.infer<typeof flowSchema>
