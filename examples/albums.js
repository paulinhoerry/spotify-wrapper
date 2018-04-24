global.fetch = require('node-fetch');

import SpotifyWrapper from '../src/index';

const spotify = new SpotifyWrapper({
  token: 'BQARzO_tt7exlY-XuMMegQu2aTtepPWOIrF_GaEZjtj4DC6U82bvg18vtlI2THOtdtJhqKAgHnYFGZh-MTyezgxCN-GSJd_8QWIDG5uS90gaRnoAUqRYdZOKOp1YYhqyY-ThI8IbEJNqN-LzrehzjbIX2YNugfopM_VzOQVk4RLAYcEv1pKJCmGiVHPQl7qCY7PRQmFv9JXk5Msr5iddnF9O211rj8N9IIYcv7CO6CgkQrnagJDSUcVuHdKMSll27U1yYGbCJgWtQVU',
})




const albums = spotify.search.albums('incubus');

albums
  .then(data => data.albums.items.map(item => console.log(item.name)))
// const albumsEl = document.getElementById('albums');

// albums
//   .then(data => {
//     markup = data.albums.items.map(item =>
//       `<img src='${item.images[1].url}' alt='${item.name}' />`
//     ).join('');

//     albumsEl.innerHTML = markup;
//   })



