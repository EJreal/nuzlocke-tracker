import { base } from '$app/paths'
const loaded = {}

export default (src) => {
  const fullSrc = src.startsWith('/') ? `${base}${src}` : src;

  if (loaded[fullSrc]) return
  loaded[fullSrc] = true

  if (document.createStyleSheet) document.createStyleSheet(fullSrc)
  else {
    const [head] = document.getElementsByTagName('head')
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = fullSrc
    head.appendChild(link)
  }
}
