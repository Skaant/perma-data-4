module.exports = (datas, lang) => {
  const langNameDatas = datas && datas
    .filter(data => data.tags && data.tags.includes('name') && data.tags.includes(lang))
  return (langNameDatas && langNameDatas.length > 0) ?
    (langNameDatas.sort((a, b) => b - a)[0].value || false) : false
}