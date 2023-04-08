import axios from 'axios'

interface ICunnySauce {
  url: string
  name: string
}

export async function getCunnySauce(): Promise<ICunnySauce> {
  const pageIndex = Math.floor(Math.random() * 1000)
  const { data } = await axios.get(`https://danbooru.donmai.us/posts/random.json?tags=blue_archive&page=${pageIndex}`)

  return { url: data.file_url, name: data.md5 }
}
