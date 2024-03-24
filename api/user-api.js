export const userAPI = {
  async getAll(roles) {
    const { data } = await axiosInstance.get('users', { roles })
    return data
  },

  async resizeAvatar(avatar) {
    const { data } = await axiosInstance.post('upload/resize', { avatar })
    return data
  },

  async changeName(name) {
    const { data } = await axiosInstance.post('changeName', { name })
    return data
  },
}
