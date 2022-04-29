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
    const someArray = []
    let without_duplicate = []
    if (newsData.length !== 0) {
      newsData.forEach(newsObject => {
        const [newsindex,news] = newsObject
        const category = this.separateCategory(newsindex)
        const newsToBeSaved = new News()

        Object.assign(newsToBeSaved, {
          title: news.Tittle,
          link: news.Notice,
          image_url: news.Image,
          categories: [category],
          saved_at: new Date()
        })
        someArray.push(newsToBeSaved)
      });
    }
    
    for(let i=0;i < someArray.length;i++) {
      for(let j=i+1;j<someArray.length;j++) {
        if(someArray[i] && someArray[j]) {
          if (someArray[i].link === someArray[j].link) {
            someArray[i].categories.push(someArray[j].categories[0])
            without_duplicate = someArray.filter(news => news !== someArray[j])
          }
        }
      }
    }

    return without_duplicate
  }

  separateCategory(preference) {
    const category_regex = /^.*\b - \b([a-z-]+)$/

    const matches = category_regex.exec(preference)
    
    return matches[1]
  }
}