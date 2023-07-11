import React, { useState, useEffect } from 'react';
import { TrackList } from './TrackList';
import PropTypes from 'prop-types';

function SpotifyPlayer({
  albumName,
  artistName,
  listGroupClassName,
  listGroupItemBadgeClassName,
  listGroupItemClassName,
  listGroupItemLink,
  noDataFoundText,
  onTrackPaused,
  onTrackPlayed,
  previewWarningText,
  showHeader,
  token
}) {
  const initialPlayerPlaceholder = '<i class="fa fa-spinner fa-spin"></i>';
  const [state, setState] = useState({
    albumData: null,
    playerPlaceholder: initialPlayerPlaceholder,
    albumName,
    artistName
  });


  async function fetchAlbumData(albumName, artistName) {
    const url = `https://api.spotify.com/v1/search?q=album:${albumName} artist:${artistName}&type=album`;
    const headers = {
      'Authorization': 'Bearer ' + token
    };

    try {
      const response = await fetch(url, { method: 'GET', headers });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.albums.items.length > 0) {
        try {
          const tracksData = await fetchTracks(data.albums.items[0].id);

          if (tracksData.tracks.items.length > 0) {
            setState(prevState => ({ ...prevState, albumData: tracksData }));
          } else {
            setState(prevState => ({ ...prevState, albumData: null, playerPlaceholder: noDataFoundText }));
          }
        } catch (error) {
          console.error('Error:', error);
          setState(prevState => ({ ...prevState, albumData: null, playerPlaceholder: noDataFoundText }));
        }
      } else {
        setState(prevState => ({ ...prevState, albumData: null, playerPlaceholder: noDataFoundText }));
      }
    } catch (error) {
      console.error('Error:', error);
      setState(prevState => ({ ...prevState, albumData: null, playerPlaceholder: noDataFoundText }));
    }
  }

  async function fetchTracks(albumId) {
    const url = `https://api.spotify.com/v1/albums/${albumId}`;
    const headers = {
      'Authorization': 'Bearer ' + token
    };

    try {
      const response = await fetch(url, { method: 'GET', headers });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      setState(prevState => ({ ...prevState, albumData: null, playerPlaceholder: noDataFoundText }));
      throw error;
    }
  }

  function firePlayingStatusChangeEvent(isPlaying, audioTrack, spotifyTrack) {
    if (isPlaying && onTrackPlayed) {
      onTrackPlayed(audioTrack, spotifyTrack);
    } else if (!isPlaying && onTrackPaused) {
      onTrackPaused(audioTrack, spotifyTrack);
    }
  }

  useEffect(() => {
    if (token === null) {
      console.error('A valid access token is needed to access spotify API');
      return;
    }
    fetchAlbumData(albumName, artistName);
  }, [token, albumName, artistName]);

  function playlistHeader() {
    if (showHeader && state.albumData) {
      return (
        <div className="media">
          <div className="media-left">
            <a href={state.albumData.external_urls.spotify}>
              <img
                alt="cover image"
                className="media-object"
                height="64"
                src={state.albumData.images[0].url}
                width="64"
              />
            </a>
          </div>
          <div className="media-body">
            <h4 className="media-heading">{state.albumData.name}</h4>
            {state.albumData.release_date}
          </div>
        </div>
      );
    }
    return null;
  }

  if (state.albumData === null) {
    return (
      <section className="spotify-player">
        <div dangerouslySetInnerHTML={{ __html: state.playerPlaceholder }} />
      </section>
    );
  } else {
    return (
      <section className="spotify-player">
        {playlistHeader()}
        <TrackList
          listGroupClassName={listGroupClassName}
          listGroupItemBadgeClassName={listGroupItemBadgeClassName}
          listGroupItemClassName={listGroupItemClassName}
          listGroupItemLink={listGroupItemLink}
          previewWarningText={previewWarningText}
          tracks={state.albumData.tracks.items}
          updateTrackPlayingStatus={firePlayingStatusChangeEvent}
        />
      </section>
    );
  }
}

SpotifyPlayer.propTypes = {
  albumName: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  listGroupClassName: PropTypes.string,
  listGroupItemBadgeClassName: PropTypes.string,
  listGroupItemClassName: PropTypes.string,
  listGroupItemLink: PropTypes.string,
  noDataFoundText: PropTypes.string,
  onTrackPaused: PropTypes.func,
  onTrackPlayed: PropTypes.func,
  previewWarningText: PropTypes.string,
  showHeader: PropTypes.bool,
  token: PropTypes.string
};

SpotifyPlayer.defaultProps = {
  listGroupClassName: 'list-group',
  listGroupItemBadgeClassName: 'badge',
  listGroupItemClassName: 'list-group-item',
  listGroupItemLink: '',
  noDataFoundText: 'No data found',
  onTrackPaused: undefined,
  onTrackPlayed: undefined,
  previewWarningText: 'Only 30 seconds preview',
  showHeader: true,
  token: null
};

export { SpotifyPlayer };
