<script setup lang="ts">
import { userFormDataSchema, type UserFormData } from '@/scheme/z_user'
import type { FormError, FormSubmitEvent } from '#ui/types'
import { UploadURLS } from '~/scheme/enums'
const toast = useToast()
const { updateUserInfo, storeRefs, setUserFormData } = useUserStore()
const { userFormData, user } = storeRefs()

setUserFormData()

function validate(state: UserFormData): FormError[] {
  const errors = [] as FormError[]
  try {
    userFormDataSchema.parse(state)
  } catch (error) {
    const parsedErrors = (JSON.parse(error as string) as any[]).map(item => ({ path: item.path[0], message: item.message }))
    errors.push(...parsedErrors)
    console.log(error)
  }

  return errors
}

async function onSubmit(event: FormSubmitEvent<any>) {
  const res = await updateUserInfo(event.data)

  // Do something with data
  if (res) toast.add({ title: 'Профиль успешно обновлён', icon: 'i-heroicons-check-circle' })
}
</script>

<template>
  <UDashboardPanelContent class="pb-24">
    <UForm :state="userFormData" :schema="userFormDataSchema" :validate="validate" :validate-on="['submit']"
      @submit="onSubmit">
      <UDashboardSection title="Профиль" description="Изменение данных учётной записи">
        <template #links>
          <UButton type="submit" label="Сохранить данные" color="black" />
        </template>

        <div class="grid grid-cols-2 items-center">
          <div class="text-sm">
            <p>Полное имя</p>
            <p class="text-neutral-400">Отображается в нижней части экрана</p>
          </div>
          <div class="flex gap-3">
            <UFormGroup class="flex-grow" name="firstName">
              <UInput class="w-full" placeholder="Имя" v-model="userFormData.firstName" />
            </UFormGroup>
            <UFormGroup class="flex-grow" name="lastName">
              <UInput class="w-full" placeholder="Фамилия" v-model="userFormData.lastName" />
            </UFormGroup>
          </div>
        </div>

        <FormText class="grid grid-cols-2 gap-2 items-center" v-model="userFormData.email" name="email" label="E-mail"
          icon="i-heroicons-envelope" size="md" description="Использется для входа в панель управления" />

        <UiUploadImage label="Аватар" class="grid grid-cols-2 gap-2 items-center" v-model="userFormData.avatar"
          name="avatar" :url="UploadURLS.avatar" :btn="{ label: 'Загрузить фото', color: 'gray' }"
          :ui="{ container: 'flex gap-3 items-center' }" show-select>
          <template #preview>
            <UAvatar icon="i-heroicons-photo" size="xl" :src="userFormData.avatar"
              imgClass="object-cover object-top w-full h-full" />
          </template>
        </UiUploadImage>

        <UFormGroup name="password" label="Пароль" autocomplete="off" description="Введите ваш пароль"
          class="grid grid-cols-2 gap-2" :ui="{ container: '' }">
          <UInput v-model="userFormData.password" autocomplete="off" type="password" placeholder="Ваш пароль" size="md" />
        </UFormGroup>

        <UFormGroup name="password_new" label="Новый пароль" description="Введите новый пароль"
          class="grid grid-cols-2 gap-2" :ui="{ container: '' }">
          <UInput id="password_new" v-model="userFormData.password_new" autocomplete="off" type="password"
            placeholder="Новый пароль" size="md" class="mt-2" />
        </UFormGroup>
      </UDashboardSection>
    </UForm>

    <UDivider class="mb-4" />
    <pre>{{ userFormData }}</pre>
    <pre>{{ user }}</pre>
  </UDashboardPanelContent>
</template>
