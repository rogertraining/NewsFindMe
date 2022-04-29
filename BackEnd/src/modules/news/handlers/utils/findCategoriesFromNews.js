function separateCategory(newsIndex) {
  const category_regex = /^.*\b - \b([a-z-]+)$/

  const matches = category_regex.exec(newsIndex)
  
  return matches[1]
}


export async function linguicada(newsArray) {
  newsArray.forEach(news => {
    const [news_index,news] = newsObject
    const category = separateCategory(news_index)
    const newsToBeSaved = new News()

    Object.assign(newsToBeSaved, {
      title: news.Tittle,
      link: news.Notice,
      image_url: news.Image,
      category,
      saved_at: new Date()
    })
    this._repository.push(newsToBeSaved)
  });
}