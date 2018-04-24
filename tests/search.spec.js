import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

import SpotifyWrapper from '../src/index';


describe('Search', () => {
  let spotify;
	let fetchedStub;
	let promise;

	beforeEach(() => {
    spotify = new SpotifyWrapper({
      token: 'foo'
    });

		fetchedStub = sinon.stub(global, 'fetch');
		promise = fetchedStub.returnsPromise();
	})

	afterEach(() => {
		fetchedStub.restore();
	})

	describe('smoke tests', () => {
		it('should exist the searchAlbums method', () => {
			expect(spotify.search.albums).to.exist;
		})


		it('should exist the searchArtists method', () => {
			expect(spotify.search.artists).to.exist;
		})

		it('should exist the searchTracks method', () => {
			expect(spotify.search.tracks).to.exist;
		})

		it('should exist the searchPlaylists method', () => {
			expect(spotify.search.playlists).to.exist;
		})
	})

	describe('searchArtist', () => {
		it('should a valid URL to fetch', () => {
			const artists = spotify.search.artists('Incubus');
			expect(fetchedStub).to.have.been.calledOnce;
		});

		it('should call fetch with the valid URL', () => {
			const artists = spotify.search.artists('Incubus');

			expect(fetchedStub).to.have.been
				.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist')

			const artists2 = spotify.search.artists('Muse');

			expect(fetchedStub).to.have.been
				.calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist')
		});
	});

	describe('searchAlbums', () => {
		it('should a valid URL to fetch', () => {
			const artists = spotify.search.albums('Incubus');
			expect(fetchedStub).to.have.been.calledOnce;
		});

		it('should call fetch with the valid URL', () => {
			const artists = spotify.search.albums('Incubus');

			expect(fetchedStub).to.have.been
				.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album')

			const artists2 = spotify.search.albums('Muse');

			expect(fetchedStub).to.have.been
				.calledWith('https://api.spotify.com/v1/search?q=Muse&type=album')
		});
	});

	describe('searchTracks', () => {
		it('should a valid URL to fetch', () => {
			const artists = spotify.search.tracks('Incubus');
			expect(fetchedStub).to.have.been.calledOnce;
		});

		it('should call fetch with the valid URL', () => {
			const artists = spotify.search.tracks('Incubus');

			expect(fetchedStub).to.have.been
				.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=track')

			const artists2 = spotify.search.tracks('Muse');

			expect(fetchedStub).to.have.been
				.calledWith('https://api.spotify.com/v1/search?q=Muse&type=track')
		});
	});

	describe('searchPlaylists', () => {
		it('should a valid URL to fetch', () => {
			const artists = spotify.search.playlists('Incubus');
			expect(fetchedStub).to.have.been.calledOnce;
		});

		it('should call fetch with the valid URL', () => {
			const artists = spotify.search.playlists('Incubus');

			expect(fetchedStub).to.have.been
				.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=playlist')

			const artists2 = spotify.search.playlists('Muse');

			expect(fetchedStub).to.have.been
				.calledWith('https://api.spotify.com/v1/search?q=Muse&type=playlist')
		});
	});

});
