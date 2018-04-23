import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

import { search, searchAlbums, searchArtists, searchTracks, searchPlaylists } from '../src/search';


describe('Search', () => {
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
		it('should exist the search method', () => {
			expect(search).to.exist;
		})

		it('should exist the searchAlbums method', () => {
			expect(searchAlbums).to.exist;
		})


		it('should exist the searchArtists method', () => {
			expect(searchArtists).to.exist;
		})

		it('should exist the searchTracks method', () => {
			expect(searchTracks).to.exist;
		})

		it('should exist the searchPlaylists method', () => {
			expect(searchPlaylists).to.exist;
		})
	})

	describe('Generic Search', () => {
		it('should call fetch function', () => {
			const artists = search();
			expect(fetchedStub).to.have.been.calledOnce;
		})


		it('should a valid url to fetch', () => {
			context('Passing one type', () => {
				const artists = search('incubus', 'artist');

				expect(fetchedStub).to.have.been
					.calledWith('https://api.spotify.com/v1/search?q=incubus&type=artist')

				const albums = search('Incubus', 'album')

				expect(fetchedStub).to.have.been
					.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album')
			})

			context('Passing more than one type', () => {
				const artists = search('incubus', ['artist', 'album']);

				expect(fetchedStub).to.have.been
					.calledWith('https://api.spotify.com/v1/search?q=incubus&type=artist,album')
			})
		})

		it('should return the JSON Data from the promise', () => {
			promise.resolves({ body: 'json' });
			const artists = search('Incubus', 'artist')

			expect(artists.resolveValue).to.be.eql({ body: 'json' });
		})
	})

	describe('searchArtist', () => {
		it('should a valid URL to fetch', () => {
			const artists = searchArtists('Incubus');
			expect(fetchedStub).to.have.been.calledOnce;
		});

		it('should call fetch with the valid URL', () => {
			const artists = searchArtists('Incubus');

			expect(fetchedStub).to.have.been
				.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist')

			const artists2 = searchArtists('Muse');

			expect(fetchedStub).to.have.been
				.calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist')
		});
	});

	describe('searchAlbums', () => {
		it('should a valid URL to fetch', () => {
			const artists = searchAlbums('Incubus');
			expect(fetchedStub).to.have.been.calledOnce;
		});

		it('should call fetch with the valid URL', () => {
			const artists = searchAlbums('Incubus');

			expect(fetchedStub).to.have.been
				.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album')

			const artists2 = searchAlbums('Muse');

			expect(fetchedStub).to.have.been
				.calledWith('https://api.spotify.com/v1/search?q=Muse&type=album')
		});
	});

	describe('searchTracks', () => {
		it('should a valid URL to fetch', () => {
			const artists = searchTracks('Incubus');
			expect(fetchedStub).to.have.been.calledOnce;
		});

		it('should call fetch with the valid URL', () => {
			const artists = searchTracks('Incubus');

			expect(fetchedStub).to.have.been
				.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=track')

			const artists2 = searchTracks('Muse');

			expect(fetchedStub).to.have.been
				.calledWith('https://api.spotify.com/v1/search?q=Muse&type=track')
		});
	});

	describe('searchPlaylists', () => {
		it('should a valid URL to fetch', () => {
			const artists = searchPlaylists('Incubus');
			expect(fetchedStub).to.have.been.calledOnce;
		});

		it('should call fetch with the valid URL', () => {
			const artists = searchPlaylists('Incubus');

			expect(fetchedStub).to.have.been
				.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=playlist')

			const artists2 = searchPlaylists('Muse');

			expect(fetchedStub).to.have.been
				.calledWith('https://api.spotify.com/v1/search?q=Muse&type=playlist')
		});
	});

});
