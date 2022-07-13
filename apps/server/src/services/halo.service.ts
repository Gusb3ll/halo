import Danbooru from 'danbooru'

const booru = new Danbooru()

interface ICunnySauce {
  url: string
  name: string
}

export async function getCunnySauce(): Promise<ICunnySauce | undefined> {
  const pageIndex = Math.floor(Math.random() * 1000)
  const data: ICunnySauce = await booru.posts({ tags: 'blue_archive', page: pageIndex, limit: 20 }).then((posts) => {
    const { file_url, md5 } = posts[Math.floor(Math.random() * 20)]
    return { url: file_url, name: md5 }
  })

  return data
}
