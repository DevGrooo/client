export default function (context) {
  context.$axios.onResponse((response) => {
    return response
  })

  context.$axios.onError((error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          context.store.dispatch('setError', ['401'])
          context.$auth.logout()
          context.redirect('/auth/login')
          break
        case 404:
          return Promise.reject(error)
      }
      return error.response.data
    }
    return Promise.reject(error)
  })
}
