import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

import SpotifyWrapper from '../src/index';


describe('Album', () => {
  let spotify;
  let fetchedStub;
  let promise;

  beforeEach(() => {
    spotify = new SpotifyWrapper({
      token: 'foo'
    })

    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  })

  afterEach(() => {
    fetchedStub.restore();
  })

	describe('smoke tests', () => {
    it('should exist getAlbum method', () => {
      expect(spotify.album.getAlbum).to.exist;
    })

    it('should exist getAlbum method', () => {
      expect(spotify.album.getAlbums).to.exist;
    })

    it('should exist getAlbumTracks method', () => {
      expect(spotify.album.getAlbumTracks).to.exist;
    })
  })

  describe('getAlbum', () => {
    it('should call fetch method', () => {
      const album = spotify.album.getAlbum();
      expect(fetchedStub).to.have.been.calledOnce;
    })

    it('should call fetch with the valid URL', () => {
      const album = spotify.album.getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy');

      const album2 = spotify.album.getAlbum('4aawyAB9vmqN3uQ7FjRGTk');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTk');
    });

    it('should return the JSON Data from the promise', () => {
      promise.resolves({ album: 'name'});

      const album = spotify.album.getAlbum('4aawyAB9vmqN3uQ7FjRGTy');

      expect(album.resolveValue).to.be.eql({ album: 'name'});
    });
  })

  describe('getAlbums', () => {
    it('should call fetch method', () => {
      const albums = spotify.album.getAlbums();
      expect(fetchedStub).to.have.been.calledOnce;
    })

    it('should call fetch with the valid URL', () => {
      const albums = spotify.album.getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '382ObEPsp2rxGrnsizN5TX']);
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/albums?ids=4aawyAB9vmqN3uQ7FjRGTy,382ObEPsp2rxGrnsizN5TX');
    });

    it('should return the JSON Data from the promise', () => {
      promise.resolves({ album: 'name'});

      const albums = spotify.album.getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '382ObEPsp2rxGrnsizN5TX']);

      expect(albums.resolveValue).to.be.eql({ album: 'name'});
    });
  })

  describe('getAlbumTracks', () => {
    it('should call fetch method', () => {
      const tracks = spotify.album.getAlbumTracks();
      expect(fetchedStub).to.have.been.calledOnce;
    })

    it('should call fetch with the valid URL', () => {
      const tracks = spotify.album.getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks');
    });

    it('should return the JSON Data from the promise', () => {
      promise.resolves({ album: 'name'});

      const tracks = spotify.album.getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');

      expect(tracks.resolveValue).to.be.eql({ album: 'name'});
    });
  })
});
