module.exports = (id, req) => (
  {
    id,
    lang: req.lang || 'fr',
    url: req.url
  }
)