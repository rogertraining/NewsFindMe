import { News } from "../../../models/News.js"

function separateCategory(preference) {
  const category_regex = /^.*\b - \b([a-z-]+)$/g
  
  const matches = category_regex.exec(preference)
  
  if(matches === null) {
    console.log(preference)
  }
  return matches[1]
}

export function formatFoundNews(news_array) {
  const someArray = []
  let without_duplicate = []
   if (news_array.length !== 0) {
    news_array.forEach(newsObject => {
      const [newsindex,news] = newsObject
      const category = {
        category: {
          connect: {
            name: separateCategory(newsindex)
          }
        }
      }
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