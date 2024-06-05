<script setup lang="ts">
import type { User } from '~/scheme/z_user'

const selected = defineModel<User[]>({ required: true })
const { hosts } = defineProps<{ hosts: User[] }>()
const selectedNames = computed(() =>
  selected.value.map((id) => hosts.find((host) => host.id == (id as unknown as string))?.fullName)
)
</script>

<template>
  <UFormGroup label="Ведущие" class="w-1/5 min-w-48 max-w-52" required name="userId">
    <USelectMenu
      v-model="selected"
      :options="hosts"
      value-attribute="id"
      option-attribute="fullName"
      placeholder="Выбрать ведущего"
      multiple
    >
      <template #option="{ option: person }">
        <UAvatar :src="person.avatar" imgClass="object-cover size-6" :alt="person.fullName" />
        <span class="truncate">{{ person.fullName }}</span>
      </template>
      <template #label>
        <span v-if="selected.length" class="truncate">{{ selectedNames.join(', ') }}</span>
        <span v-else>Выбрать ведущего</span>
      </template>
    </USelectMenu>
  </UFormGroup>
</template>
