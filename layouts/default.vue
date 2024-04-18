<script setup lang="ts">
const route = useRoute()
const appConfig = useAppConfig()
const { isHelpSlideoverOpen } = useDashboard()
const { user } = useUserStore().storeRefs()

const linksTemplate = [
  {
    id: 'home',
    label: 'Home',
    icon: 'i-heroicons-home',
    to: '/',
    tooltip: {
      text: 'Home',
      shortcuts: ['G', 'H']
    }
  },
  {
    id: 'inbox',
    label: 'Inbox',
    icon: 'i-heroicons-inbox',
    to: '/inbox',
    badge: '4',
    tooltip: {
      text: 'Inbox',
      shortcuts: ['G', 'I']
    }
  },
  {
    id: 'users',
    label: 'Users',
    icon: 'i-heroicons-user-group',
    to: '/users',
    tooltip: {
      text: 'Users',
      shortcuts: ['G', 'U']
    }
  },
  {
    id: 'users',
    label: 'Users',
    icon: 'i-heroicons-user-group',
    to: '/users',
    tooltip: {
      text: 'Users',
      shortcuts: ['G', 'U']
    }
  },
  {
    id: 'settings',
    label: 'Settings',
    to: '/settings',
    icon: 'i-heroicons-cog-8-tooth',
    children: [
      {
        label: 'General',
        to: '/settings',
        exact: true
      },
      {
        label: 'Members',
        to: '/settings/members'
      },
      {
        label: 'Notifications',
        to: '/settings/notifications'
      }
    ],
    tooltip: {
      text: 'Settings',
      shortcuts: ['G', 'S']
    }
  }
]

const linksBase = [
  {
    id: 'home',
    label: 'Главная',
    icon: 'i-heroicons-home',
    to: '/',
    tooltip: {
      text: 'на главную',
      shortcuts: ['G', 'H']
    }
  },
  {
    id: 'categories',
    label: 'Категории',
    icon: 'i-heroicons-rectangle-stack',
    to: '/categories',
    tooltip: {
      text: 'список категорий',
      shortcuts: ['G', 'K']
    }
  },
  {
    id: 'articles',
    label: 'Новости',
    icon: 'i-heroicons-newspaper',
    to: '/articles',
    tooltip: {
      text: 'список новостей',
      shortcuts: ['G', 'N']
    }
  },
  // {
  //   id: 'tracks',
  //   label: 'Треки',
  //   icon: 'i-heroicons-musical-note',
  //   to: '/tracks',
  //   tooltip: {
  //     text: 'список песен',
  //     shortcuts: ['G', 'M'],
  //   },
  // },
  {
    id: 'programs',
    label: 'Программы',
    icon: 'i-heroicons-radio',
    to: '/programs',
    tooltip: {
      text: 'список программ',
      shortcuts: ['G', 'P']
    }
  },
  {
    id: 'files',
    label: 'Файлы',
    icon: 'i-heroicons-folder',
    to: '/files',
    tooltip: {
      text: 'список файлов',
      shortcuts: ['G', 'F']
    },
    exeptRoles: ['editor', 'host']
  },
  {
    id: 'settings',
    label: 'Настройки',
    to: '/settings',
    icon: 'i-heroicons-cog-8-tooth',
    children: [
      {
        label: 'Основные',
        to: '/settings',
        exact: true
      },
      {
        label: 'Администраторы',
        to: '/settings/members',
        exeptRoles: ['editor', 'host']
      },
      {
        label: 'Уведомления',
        to: '/settings/notifications',
        exeptRoles: ['editor', 'host']
      }
    ],
    tooltip: {
      text: 'Settings',
      shortcuts: ['G', 'S']
    }
  }
]

const links = computed(() =>
  linksBase.filter((link) => {
    if (link.children) {
      link.children = link.children.filter((childLink) => {
        return !user.value?.roles.some((role) => childLink.exeptRoles?.includes(role))
      })
    }

    return !user.value?.roles.some((role) => link.exeptRoles?.includes(role))
  })
)

const footerLinks = [
  {
    label: 'Invite people',
    icon: 'i-heroicons-plus',
    to: '/settings/members'
  },
  {
    label: 'Help & Support',
    icon: 'i-heroicons-question-mark-circle',
    click: () => (isHelpSlideoverOpen.value = true)
  }
]

const groups = [
  {
    key: 'links',
    label: 'Go to',
    commands: links.value.map((link) => ({
      ...link,
      shortcuts: link.tooltip?.shortcuts
    }))
  },
  {
    key: 'code',
    label: 'Code',
    commands: [
      {
        id: 'source',
        label: 'View page source',
        icon: 'i-simple-icons-github',
        click: () => {
          window.open(
            `https://github.com/nuxt-ui-pro/dashboard/blob/main/pages${route.path === '/' ? '/index' : route.path}.vue`,
            '_blank'
          )
        }
      }
    ]
  }
]

const defaultColors = ref(
  ['green', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet'].map((color) => ({
    label: color,
    chip: color,
    click: () => (appConfig.ui.primary = color)
  }))
)
const colors = computed(() =>
  defaultColors.value.map((color) => ({
    ...color,
    active: appConfig.ui.primary === color.label
  }))
)
</script>

<template>
  <UDashboardLayout class="bg-neutral-100 dark:bg-zinc-900">
    <UDashboardPanel :width="250" :resizable="{ min: 200, max: 300 }" collapsible v-if="route.name !== 'login'">
      <UDashboardNavbar class="!border-transparent" :ui="{ left: 'flex-1' }">
        <template #left>
          <TeamsDropdown />
        </template>
      </UDashboardNavbar>

      <UDashboardSidebar>
        <!-- <template #header>
          <UDashboardSearchButton />
        </template> -->

        <UDashboardSidebarLinks :links="links" />

        <!-- <UDivider /> -->

        <!-- <UDashboardSidebarLinks
          :links="[{ label: 'Colors', draggable: true, children: colors }]"
          @update:links="colors => (defaultColors = colors)"
        /> -->

        <div class="flex-1" />

        <UDashboardSidebarLinks :links="footerLinks" />

        <UDivider class="sticky bottom-0" />

        <template #footer>
          <!-- ~/components/UserDropdown.vue -->
          <UserDropdown />
        </template>
      </UDashboardSidebar>
    </UDashboardPanel>

    <slot />

    <!-- ~/components/HelpSlideover.vue -->
    <HelpSlideover v-if="route.name !== 'login'" />
    <!-- ~/components/NotificationsSlideover.vue -->
    <NotificationsSlideover v-if="route.name !== 'login'" />

    <ClientOnly>
      <LazyUDashboardSearch :groups="groups" v-if="route.name !== 'login'" />
    </ClientOnly>
  </UDashboardLayout>
</template>
