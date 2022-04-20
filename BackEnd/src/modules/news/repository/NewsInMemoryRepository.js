import { News } from "../models/News.js"

export class NewsInMemoryRepository {
  constructor() {
    this._repository = []
  }

  static getInstance() {
    if (!this._INSTANCE) {
      this._INSTANCE = new NewsInMemoryRepository()
    }

    return this._INSTANCE
  }

  create(newsData) {
    if (newsData.length !== 0) {
      newsData.forEach(newsObject => {
        const [newsindex,news] = newsObject
        const category = this.separateCategory(newsindex)
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
    
    const savedNews = [...this._repository]

    return savedNews
  }

  separateCategory(preference) {
    const category_regex = /^.*\b - \b([a-z-]+)$/

    const matches = category_regex.exec(preference)
    
    return matches[1]
  }
}