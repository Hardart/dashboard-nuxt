<script setup lang="ts">
const items = [
  {
    name: 'messages',
    icon: 'i-heroicons-chat-bubble-oval-left',
    count: 3,
    label: 'Shakirov A.'
  },
  {
    name: 'notifications',
    icon: 'i-heroicons-bell',
    count: 0,
    label: 'Larin E.'
  },
  {
    name: 'messages',
    icon: 'i-heroicons-chat-bubble-oval-left',
    count: 3,
    label: 'Shakirov A.'
  },
  {
    name: 'notifications',
    icon: 'i-heroicons-bell',
    count: 0,
    label: 'Larin E.'
  },
  {
    name: 'messages',
    icon: 'i-heroicons-chat-bubble-oval-left',
    count: 3,
    label: 'Shakirov A.'
  },
  {
    name: 'notifications',
    icon: 'i-heroicons-bell',
    count: 0,
    label: 'Larin E.'
  },
  {
    name: 'messages',
    icon: 'i-heroicons-chat-bubble-oval-left',
    count: 3,
    label: 'Shakirov A.'
  },
  {
    name: 'notifications',
    icon: 'i-heroicons-bell',
    count: 0,
    label: 'Larin E.'
  },
  {
    name: 'messages',
    icon: 'i-heroicons-chat-bubble-oval-left',
    count: 3,
    label: 'Shakirov A.'
  },
  {
    name: 'notifications',
    icon: 'i-heroicons-bell',
    count: 0,
    label: 'Larin E.'
  },
  {
    name: 'messages',
    icon: 'i-heroicons-chat-bubble-oval-left',
    count: 3,
    label: 'Shakirov A.'
  },
  {
    name: 'notifications',
    icon: 'i-heroicons-bell',
    count: 0,
    label: 'Larin E.'
  },
  {
    name: 'messages',
    icon: 'i-heroicons-chat-bubble-oval-left',
    count: 3,
    label: 'Shakirov A.'
  },
  {
    name: 'notifications',
    icon: 'i-heroicons-bell',
    count: 0,
    label: 'Larin E.'
  }
]
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Чат" />
      <UDashboardPanelContent :ui="{ wrapper: 'relative p-0' }">
        <div class="grid size-full grid-cols-7 gap-4">
          <div class="relative">
            <div class="absolute inset-0 flex flex-col">
              <div class="mb-2 flex flex-grow flex-col space-y-2.5 overflow-y-auto p-2 text-sm">
                <UChip v-for="{ name, label, count } in items" :key="name" :show="count > 0">
                  <UButton block :label color="gray" :ui="{ block: 'justify-start' }" />
                </UChip>
              </div>
            </div>
          </div>
          <div class="relative col-span-2">
            <div class="absolute inset-0 flex flex-col">
              <div class="flex-grow overflow-y-auto bg-zinc-800/60 p-2">
                <ul class="flex flex-col space-y-2.5">
                  <li class="space-y-0.5">
                    <p class="inline-flex rounded-2xl bg-gray-900 px-5 py-2">message</p>
                    <p class="px-2 text-xs font-light text-zinc-300/60">date</p>
                  </li>
                  <li class="space-y-0.5">
                    <p class="ml-24 inline-flex rounded-2xl bg-emerald-700 px-5 py-2 text-left">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt ex quae veniam vel voluptate laboriosam?
                    </p>
                    <p class="px-2 text-right text-xs font-light text-zinc-300/60">date</p>
                  </li>
                </ul>
              </div>
              <div class="mb-2 flex gap-2">
                <UInput class="flex-grow" />
                <UButton icon="heroicons:paper-airplane-16-solid" variant="outline" />
              </div>
            </div>
          </div>
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
