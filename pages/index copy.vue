<script setup lang="ts">
import { sub } from 'date-fns'
import type { Period, Range } from '~/types'

const { isNotificationsSlideoverOpen } = useDashboard()
const { user } = useUserStore().storeRefs()
const { $ws } = useNuxtApp()
const socket = $ws(3071, '')
const items = [
  [
    {
      label: 'Создать новость',
      icon: 'i-heroicons-pencil-square',
      to: '/articles/add'
    },
    {
      label: 'Создать категорию',
      icon: 'i-heroicons-document-plus',
      to: '/categories/add'
    },
    {
      label: 'New user',
      icon: 'i-heroicons-user-plus',
      to: '/users'
    }
  ]
]

const range = ref<Range>({ start: sub(new Date(), { days: 14 }), end: new Date() })
const period = ref<Period>('daily')
const [isOnair, toggleOnairState] = useToggle()
const connect = () => {
  toggleOnairState()
  socket.emit('host:online', { hostId: user.value?.id, state: isOnair.value })
}
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Home">
        <template #right>
          <UBadge label="ONAIR" :color="isOnair ? 'green' : 'gray'" :variant="isOnair ? 'solid' : 'soft'" @click="connect" />
          <UTooltip text="Notifications" :shortcuts="['N']">
            <UButton color="gray" variant="ghost" square @click="isNotificationsSlideoverOpen = true">
              <UChip color="red" inset>
                <UIcon name="i-heroicons-bell" class="h-5 w-5" />
              </UChip>
            </UButton>
          </UTooltip>

          <UDropdown :items="items">
            <UButton icon="i-heroicons-plus" size="md" class="ml-1.5 rounded-full" />
          </UDropdown>
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <!-- ~/components/home/HomeDateRangePicker.vue -->
          <HomeDateRangePicker v-model="range" class="-ml-2.5" />

          <!-- ~/components/home/HomePeriodSelect.vue -->
          <HomePeriodSelect v-model="period" :range="range" />
        </template>
      </UDashboardToolbar>

      <UDashboardPanelContent>
        <!-- ~/components/home/HomeChart.vue -->
        <HomeChart :period="period" :range="range" />

        <div class="mt-8 grid gap-8 lg:grid-cols-2 lg:items-start">
          <!-- ~/components/home/HomeSales.vue -->
          <HomeSales />
          <!-- ~/components/home/HomeCountries.vue -->
          <HomeCountries />
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
