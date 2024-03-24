<script setup lang="ts">
import type { FormError } from '#ui/types'

const { login, storeRefs, tryRefreshToken } = useUserStore()
const { loading } = storeRefs()

await tryRefreshToken()
const fields = [
  {
    name: 'email',
    type: 'mail',
    label: 'Email',
    placeholder: 'Введите Email',
  },
  {
    name: 'password',
    label: 'Пароль',
    type: 'password',
    placeholder: 'Введите пароль',
  },
]

const validate = (state: any) => {
  const errors: FormError[] = []
  if (!state.email) errors.push({ path: 'email', message: 'Email is required' })
  if (!state.password) errors.push({ path: 'password', message: 'Password is required' })
  return errors
}

const onSubmit = async (data: any) => {
  const res = await login(data)
  if (res) await navigateTo('/')
}
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <div class="grid place-items-center h-full">
        <UCard class="max-w-sm w-full">
          <UAuthForm
            :loading
            :fields
            :validate
            @submit="onSubmit"
            title="Панель управления"
            :ui="{ base: 'text-center text-xl', default: { submitButton: { label: 'Войти', color: 'orange' } } }"
          />
        </UCard>
      </div>
    </UDashboardPanel>
  </UDashboardPage>
</template>

<style></style>
