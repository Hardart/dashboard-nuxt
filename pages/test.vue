<script setup lang="ts">
const src = ref('')
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <div class="fixed inset-0 grid place-items-center">
        <div class="flex gap-x-4 p-8 bg-slate-100">
          <div class="relative grid place-items-center size-44 rounded-full bg-teal-500 overflow-clip">
            <UIcon name="i-heroicons-identification" class="text-4xl" />
            <input type="file" name="" id="" class="absolute inset-0 opacity-0" />
          </div>
          <div class="relative grid place-items-center size-44 rounded-full bg-sky-500 overflow-clip">
            <UPopover>
              <UButton lable="Выбрать" icon="i-heroicons-server" :ui="{ rounded: 'rounded-full' }" />
              <template #panel>
                <UiFileSelect />
              </template>
            </UPopover>
          </div>
        </div>
      </div>
    </UDashboardPanel>
  </UDashboardPage>
</template>

<style></style>
