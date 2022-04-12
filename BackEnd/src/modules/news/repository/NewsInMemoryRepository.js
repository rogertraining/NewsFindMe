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

  create(newsData, preferences) {
    if (newsData.length !== 0) {
      newsData.forEach(newsObject => {
        const [,news] = newsObject
        console.log(news.Notice.contains(preferences[0]))
        const newsToBeSaved = new News()
        Object.assign(newsToBeSaved, {
          title: news.Tittle,
          link: news.Notice,
          image_url: news.Image,
          saved_at: new Date()
        })
        this._repository.push(newsToBeSaved)
      });
    }
    
    const savedNews = [...this._repository]

    return savedNews
  }
}