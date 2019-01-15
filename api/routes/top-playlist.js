const Spotify = require('spotify-web-api-node');

exports.topPlaylist = {
  method: 'GET',
  path: '/top-playlist',
  async handler(request, h) {
    const token = request.query.token;
    const artists = request.query.artists.split(',');
    const playlistName = request.query.name;
    const max = request.query.max || 5;
    let playlistId = request.query.playlist;
    const spotify = new Spotify();
    spotify.setAccessToken(token);

    const me = await spotify.getMe();

    const artistData = await Promise.all(artists.map((a) => spotify.searchArtists(a)));

    const topTracks = await Promise.all(artistData.map((a) => {
      const data = a.body.artists.items[0];
      const artistId = data.id;
      console.log(data.name);
      return spotify.getArtistTopTracks(artistId, 'US');
    }));

    if (playlistName) {
      const playlist = await spotify.createPlaylist(me.body.id, playlistName, { public: false });
      playlistId = playlist.body.id;
    }

    const tracks = [];
    topTracks.forEach((artist) => {
      artist.body.tracks.forEach((t, i) => {
        if (i < max) {
          tracks.push(t.uri);
        }
      });
    });

    const chunks = [[]];
    const chunkSize = 99;
    let c = 0;
    tracks.forEach((t, i) => {
      //console.log(i);
      if (i > (chunkSize * (c + 1))) {
        c++;
        chunks.push([]);
      }
      chunks[c].push(t);
    });
    if (playlistId) {
      await spotify.replaceTracksInPlaylist(playlistId, []);
      await Promise.all(chunks.map((chunk) => spotify.addTracksToPlaylist(playlistId, chunk)));
    }

    return 'ok';
    //return { artistData, topTracks, tracks };
  }
};
