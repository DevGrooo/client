export default function ({ app }) {
  // beforeLanguageSwitch called right before setting a new locale
  app.i18n.beforeLanguageSwitch = (oldLocale, newLocale) => {
    app.store.dispatch('user/setMyProfile', { axios: app.$axios, token: app.$auth.getToken('api'), locale: newLocale })
  }
  // onLanguageSwitched called right after a new locale has been set
  // app.i18n.onLanguageSwitched = (oldLocale, newLocale) => {
  //   console.log(oldLocale, newLocale)
  // }
}
