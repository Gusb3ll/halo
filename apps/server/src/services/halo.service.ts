import Danbooru from 'danbooru'

const booru = new Danbooru()

interface ICunnySauce {
  url: string
  name: string
}

export async function getCunnySauce(): Promise<ICunnySauce | undefined> {
  const pageIndex = Math.floor(Math.random() * 1000)
  const data: ICunnySauce = await booru.posts({ tags: 'blue_archive', page: pageIndex }).then((posts) => {
    const index = Math.floor(Math.random() * posts.length)
    const post = posts[index]

    const url: string = booru.url(post.file_url).href
    const name: string = post.md5

    return { url, name }
  })

  return data
}
