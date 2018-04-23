import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import { getAlbum, getAlbums, getAlbumsTracks } from '../src/album';

chai.use(sinonChai);
sinonStubPromise(sinon);


describe('Album', () => {
  let fetchedStub;
  let promise;

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  })

  afterEach(() => {
    fetchedStub.restore();
  })

	describe('smoke tests', () => {
    it('should exist getAlbum method', () => {
      expect(getAlbum).to.exist;
    })

    it('should exist getAlbum method', () => {
      expect(getAlbums).to.exist;
    })

    it('should exist getAlbumsTracks method', () => {
      expect(getAlbumsTracks).to.exist;
    })
  })

  describe('getAlbum', () => {
    it('should call fetch method', () => {
      const album = getAlbum();
      expect(fetchedStub).to.have.been.calledOnce;
    })

    it('should call fetch with the valid URL', () => {
      const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy');

      const album2 = getAlbum('4aawyAB9vmqN3uQ7FjRGTk');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTk');
    });

    it('should return the JSON Data from the promise', () => {
      promise.resolves({ album: 'name'});

      const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');

      expect(album.resolveValue).to.be.eql({ album: 'name'});
    });
  })

  describe('getAlbums', () => {
    it('should call fetch method', () => {
      const albums = getAlbums();
      expect(fetchedStub).to.have.been.calledOnce;
    })

    it('should call fetch with the valid URL', () => {
      const albums = getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '382ObEPsp2rxGrnsizN5TX']);
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/albums?ids=4aawyAB9vmqN3uQ7FjRGTy,382ObEPsp2rxGrnsizN5TX');
    });

    it('should return the JSON Data from the promise', () => {
      promise.resolves({ album: 'name'});

      const albums = getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '382ObEPsp2rxGrnsizN5TX']);

      expect(albums.resolveValue).to.be.eql({ album: 'name'});
    });
  })

  describe('getAlbumsTracks', () => {
    it('should call fetch method', () => {
      const tracks = getAlbumsTracks();
      expect(fetchedStub).to.have.been.calledOnce;
    })

    it('should call fetch with the valid URL', () => {
      const tracks = getAlbumsTracks('4aawyAB9vmqN3uQ7FjRGTy');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks');
    });

    it('should return the JSON Data from the promise', () => {
      promise.resolves({ album: 'name'});

      const tracks = getAlbumsTracks('4aawyAB9vmqN3uQ7FjRGTy');

      expect(tracks.resolveValue).to.be.eql({ album: 'name'});
    });
  })
});
