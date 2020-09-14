export default ({ $auth, app }) => {
  $auth.onRedirect((to) => {
      return app.localePath(to)
  })
}
