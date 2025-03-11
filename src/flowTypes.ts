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

export const flowSchema = z.object({
  seed: uuidSchema.optional(),
  choice: choiceSchema.optional(),
  items: z.array(itemSchema).optional()
})
export type Flow = z.infer<typeof flowSchema>
