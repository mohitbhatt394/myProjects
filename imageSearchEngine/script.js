let inputSearch = document.querySelector('.inputSearch')
let searchForm = document.querySelector('form')
let searchContent = document.querySelector('.search-content')
let showMore = document.querySelector('.show-more')


let clientId = 'ua75Rb5vJw-S6fIn_HeSZ3wud6OdKAoYXAIwXFUxgq8'

let keyWord = ''
let page = 1

async function showImages() {
  try {
    keyWord = inputSearch.value.trim() 
    if (!keyWord) {
      alert('Please enter a search keyword!')
      return
    }

    let response = await fetch(
      `https://api.unsplash.com/search/photos?page=${page}&query=${keyWord}&client_id=${clientId}&per_page=12`
    )

    let data = await response.json()

    if (page === 1) {
      searchContent.innerHTML = ''
    }

    let results = data.results

    results.forEach((result) => {
      let image = document.createElement('img')
      image.src = result.urls.small
      image.alt = result.alt_description || 'Unsplash Image'

      let link = document.createElement('a')
      link.href = result.links.html 
      link.target = '_blank'
      link.appendChild(image)

      searchContent.appendChild(link)
    })

    showMore.style.display = results.length > 0 ? 'block' : 'none'
  } catch (error) {
    console.error('Error fetching images:', error)
  }
}

searchForm.addEventListener('submit', (e) => {
  e.preventDefault()
  page = 1
  showImages()
})

showMore.addEventListener('click', () => {
  page++
  showImages()
})
