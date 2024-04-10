<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const state = reactive({
  email: undefined,
  password: undefined,
  firstName: undefined,
  lastName: undefined,
  roles: []
})

// https://ui.nuxt.com/components/formk
const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) errors.push({ path: 'email', message: 'Please enter an email.' })
  if (!state.password) errors.push({ path: 'password', message: 'Please enter an password.' })
  if (!state.firstName) errors.push({ path: 'firstName', message: 'Please enter a name.' })
  if (!state.lastName) errors.push({ path: 'lastName', message: 'Please enter a last name.' })
  return errors
}

defineEmits(['on-submit', 'close'])

const options = [
  { value: 'editor', option: 'Редактор' },
  { value: 'host', option: 'Ведущий' }
]
</script>

<template>
  <UForm
    :validate
    :validate-on="['submit']"
    :state
    class="space-y-4"
    @submit="(event: FormSubmitEvent<any>) => $emit('on-submit', event)"
  >
    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" placeholder="jonny" autofocus>
        <template #trailing>
          <span class="text-md border-l border-gray-600 pl-2 text-gray-600 dark:text-gray-200">@test.ru</span>
        </template></UInput
      >
    </UFormGroup>
    <UFormGroup label="Пароль" name="password">
      <UInput v-model="state.password" />
    </UFormGroup>
    <div class="flex gap-3">
      <UFormGroup label="Имя" name="firstName" class="flex-grow">
        <UInput v-model="state.firstName" />
      </UFormGroup>
      <UFormGroup label="Фамилия" name="lastName" class="flex-grow">
        <UInput v-model="state.lastName" />
      </UFormGroup>
    </div>

    <UFormGroup label="Роли пользователя" name="roles">
      <USelectMenu
        v-model="state.roles"
        multiple
        :options
        :ui-menu="{ select: 'capitalize', option: { base: 'capitalize' } }"
        value-attribute="value"
        option-attribute="option"
      />
    </UFormGroup>

    <div class="flex justify-end gap-3">
      <UButton label="Отменить" color="gray" variant="ghost" @click="$emit('close')" />
      <UButton label="Сохранить" color="black" type="submit" />
    </div>
    {{ state }}
  </UForm>
</template>
