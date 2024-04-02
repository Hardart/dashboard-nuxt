import { z } from 'zod'
import type { FormError } from '#ui/types'

export const useFormValidation = () => {
  const errors = ref<FormError[]>([])

  function validate(schema: z.AnyZodObject) {
    return (state: z.AnyZodObject): FormError[] => {
      const validation = schema.safeParse(state)
      if (!validation.success) {
        const validationErrors = validation.error.errors.map(e => ({ path: e.path[0], message: e.message })) as any[]
        errors.value.push(...validationErrors)
      }
      return errors.value
    }
  }

  return { errors, validate }
}
