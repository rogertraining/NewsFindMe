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
      newsData.forEach(news => {
        const newsToBeSaved = 
          new News(news.title, news.link, news.image_url, new Date())
        
          this._repository.push(savedNews)
      });
    }

    const savedNews = [...this._repository]

    return savedNews
  }
}