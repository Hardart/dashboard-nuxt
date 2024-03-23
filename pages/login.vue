<script setup lang="ts">
const admin = reactive({
  login: '',
  password: '',
})

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
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <div class="grid place-items-center h-full">
        <UCard class="max-w-sm w-full">
          <UAuthForm :fields title="Панель управления" />
        </UCard>
      </div>
    </UDashboardPanel>
  </UDashboardPage>
</template>

<style></style>
