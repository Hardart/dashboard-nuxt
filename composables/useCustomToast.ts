export const useCustomToast = (title: string, type: 'success' | 'fail', timeout: number = 5000) => {
  const toast = useToast()

  return toast.add({
    title,
    timeout,
    color: type === 'success' ? 'emerald' : 'red',
    icon: type === 'success' ? 'i-heroicons-check-circle-16-solid' : 'i-heroicons-x-circle-20-solid'
  })
}
