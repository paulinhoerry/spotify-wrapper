const albums = spotifyWrapper.searchAlbums('incubus');
const albumsEl = document.getElementById('albums');

albums
  .then(data => {
    markup = data.albums.items.map(item =>
      `<img src='${item.images[1].url}' alt='${item.name}' />`
    ).join('');

    albumsEl.innerHTML = markup;
  })



