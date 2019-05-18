export default () => {
  if (window.__STATE__.bundle) {
    $('#launch-info__status')
      .html(window.__loadingTexts__['user data fetch'])
  }
}