export default defineAppConfig({
  ui: {
    primary: 'cyan',
    gray: 'zinc',
    tooltip: {
      default: {
        openDelay: 500,
      },
    },
    notifications: {
      // Show toasts at the top right of the screen
      position: 'top-0 bottom-auto',
    },
    icons: {
      dynamic: true,
    },
  },
})
