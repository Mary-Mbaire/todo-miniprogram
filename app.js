App({
  onLaunch(options) {
    // Page opens for the first time
    console.info('App onLaunch');
  },
  onShow(options) {
    // Reopened by scheme from the background
  },
  globalData: {
    appVersion: "1.0.0",
    miniAliUiLang: "en-US"
  }
});
