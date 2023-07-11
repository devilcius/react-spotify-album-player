'use strict';
import React from 'react';
import { TrackList } from './TrackList';
import PropTypes from 'prop-types';

class SpotifyPlayer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            albumData: null,
            playerPlaceholder: '<i class="fa fa-spinner fa-spin"></i>',
            albumName: this.props.albumName,
            artistName: this.props.artistName
        };
        this.fetchAlbumData = this.fetchAlbumData.bind(this);
        this.fetchTracks = this.fetchTracks.bind(this);
        this.firePlayingStatusChangeEvent = this.firePlayingStatusChangeEvent.bind(this);
    }

    async fetchAlbumData() {
        const url = `https://api.spotify.com/v1/search?q=album:${this.state.albumName} artist:${this.state.artistName}&type=album`;
        const headers = {
            'Authorization': 'Bearer ' + this.props.token
        };

        try {
            const response = await fetch(url, { method: 'GET', headers });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            if (data.albums.items.length > 0) {
                try {
                    const tracksData = await this.fetchTracks(data.albums.items[0].id);

                    if (tracksData.tracks.items.length > 0) {
                        this.setState({ albumData: tracksData });
                    } else {
                        this.setState({ albumData: null, playerPlaceholder: this.props.noDataFoundText });
                    }
                } catch (error) {
                    console.error('Error:', error);
                    this.setState({ albumData: null, playerPlaceholder: this.props.noDataFoundText });
                }
            } else {
                this.setState({ albumData: null, playerPlaceholder: this.props.noDataFoundText });
            }
        } catch (error) {
            console.error('Error:', error);
            this.setState({ albumData: null, playerPlaceholder: this.props.noDataFoundText });
        }
    }

    async fetchTracks(albumId) {
        const url = `https://api.spotify.com/v1/albums/${albumId}`;
        const headers = {
            'Authorization': 'Bearer ' + this.props.token
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
            this.setState({ albumData: null, playerPlaceholder: this.props.noDataFoundText });
            throw error; // re-throw the error if you want to catch it in the parent function
        }
    }

    firePlayingStatusChangeEvent(isPlaying, audioTrack, spotifyTrack) {
        if (isPlaying && this.props.onTrackPlayed) {
            this.props.onTrackPlayed(audioTrack, spotifyTrack);
        } else if (!isPlaying && this.props.onTrackPaused) {
            this.props.onTrackPaused(audioTrack, spotifyTrack);
        }
    }
    componentDidMount() {
        if (this.props.token === null) {
            console.error('A valid access token is needed to access spotify API');
            return;
        }
        this.fetchAlbumData();
    }
    componentWillUpdate(newProps) {
        if ((newProps.albumName !== this.props.albumName) || (newProps.artistName !== this.props.artistName)) {
            this.setState({ artistName: newProps.artistName, albumName: newProps.albumName }, this.fetchAlbumData);
        }
    }
    render() {
        var playlistHeader = function () {
            if (this.props.showHeader) {
                return (
                    <div className="media">
                        <div className="media-left">
                            <a href={this.state.albumData.external_urls.spotify}>
                                <img
                                    alt="cover image"
                                    className="media-object"
                                    height="64"
                                    src={this.state.albumData.images[0].url}
                                    width="64"
                                />
                            </a>
                        </div>
                        <div className="media-body">
                            <h4 className="media-heading">
                                {this.state.albumData.name}
                            </h4>
                            {this.state.albumData.release_date}
                        </div>
                    </div>
                );
            }
            return null;
        }.bind(this);
        if (this.state.albumData === null) {
            return (
                <section className="spotify-player">
                    <div dangerouslySetInnerHTML={{ __html: this.state.playerPlaceholder }} >
                    </div>
                </section>
            );
        } else {
            return (
                <section className="spotify-player">
                    {playlistHeader()}
                    <TrackList
                        listGroupClassName={this.props.listGroupClassName}
                        listGroupItemBadgeClassName={this.props.listGroupItemBadgeClassName}
                        listGroupItemClassName={this.props.listGroupItemClassName}
                        listGroupItemLink={this.props.listGroupItemLink}
                        previewWarningText={this.props.previewWarningText}
                        tracks={this.state.albumData.tracks.items}
                        updateTrackPlayingStatus={this.firePlayingStatusChangeEvent}
                    />
                </section>
            );
        }
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
    listGroupItemClassName: 'list-grouprequired to work-item',
    listGroupItemLink: '',
    noDataFoundText: 'No data found',
    onTrackPaused: undefined,
    onTrackPlayed: undefined,
    previewWarningText: 'Only 30 seconds preview',
    showHeader: true,
    token: null //https://developer.spotify.com/web-api/
};
export { SpotifyPlayer };
