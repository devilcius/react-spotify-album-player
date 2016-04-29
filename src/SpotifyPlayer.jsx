'use strict';
import React from 'react';
import TrackList from './TrackList';
var SpotifyPlayer = React.createClass({
	getInitialState: function () {
		return {
			albumData: null,
			playerPlaceholder: '<i class="fa fa-spinner fa-spin"></i>',
			albumName: this.props.albumName,
			artistName: this.props.artistName
		};
		},
		getDefaultProps: function() {
			return {
				noDataFoundText: 'No data found',
				previewWarningText: 'Only 30 seconds preview',
				onTrackPlayed: undefined,
				onTrackPaused: undefined
			}
		},
		propTypes: {
			albumName: React.PropTypes.string.isRequired,
			artistName: React.PropTypes.string.isRequired,
			noDataFoundText: React.PropTypes.string,
			onTrackPlayed: React.PropTypes.func,
			onTrackPaused: React.PropTypes.func,
			previewWarningText: React.PropTypes.string
		},
		fetchAlbumData: function() {
			var that = this;
			var xhr = new XMLHttpRequest();
			var url = 'https://api.spotify.com/v1/search'
			var queryString = '?q=album:' + this.state.albumName + ' artist:' + this.state.artistName;
			queryString += '&type=album';
			xhr.open('get', url + queryString);
			xhr.onload = function () {
				var response = JSON.parse(xhr.responseText);
				if(response.albums.items.length > 0) {
					that.fetchTracks(response.albums.items[0].id, function(data) {
						if(data.tracks.items.length > 0){
							that.setState({albumData: data})
						} else {
							that.setState({albumData: null, playerPlaceholder: that.props.noDataFoundText});
						}
					});
				} else {
					that.setState({albumData: null, playerPlaceholder: that.props.noDataFoundText});
				}
			};
			xhr.onerror = function() {
				that.setState({albumData: null, playerPlaceholder: that.props.noDataFoundText});
			}
			xhr.send();
		},
		fetchTracks: function(albumId, callback){
			var xhr = new XMLHttpRequest();
			var that = this;
			xhr.open('get', 'https://api.spotify.com/v1/albums/' + albumId);
			xhr.onload = function () {
				var response = JSON.parse(xhr.responseText);
				callback(response);
			};
			xhr.onerror = function() {
				that.setState({albumData: null, playerPlaceholder: that.props.noDataFoundText});
			}
			xhr.send();
		},
		firePlayingStatusChangeEvent: function(isPlaying, audioTrack, spotifyTrack) {
			if (isPlaying && this.props.onTrackPlayed) {
				this.props.onTrackPlayed(audioTrack, spotifyTrack);
			} else if(!isPlaying && this.props.onTrackPaused) {
				this.props.onTrackPaused(audioTrack, spotifyTrack);
			}
		},
		componentDidMount: function() {
			this.fetchAlbumData();
		},
		componentWillUpdate: function(newProps) {
			if((newProps.albumName !== this.props.albumName) || (newProps.artistName !== this.props.artistName)) {
				this.setState({artistName: newProps.artistName, albumName: newProps.albumName}, this.fetchAlbumData);
			}
		},
		render: function () {
			var that = this;
			var playlistHeader = function() {
				if(that.props.showHeader) {
					return(
						<div className="media">
							<div className="media-left">
								<a href={that.state.albumData.external_urls.spotify}>
									<img
										alt="cover image"
										className="media-object"
										height="64"
										src={that.state.albumData.images[0].url}
										width="64"
										/>
								</a>
							</div>
							<div className="media-body">
								<h4 className="media-heading">
									{that.state.albumData.name}
								</h4>
								{that.state.albumData.release_date}
							</div>
						</div>
					);
				}
				return null;
			};
			if(this.state.albumData === null) {
				return(
					<section className="spotify-player">
						<div dangerouslySetInnerHTML={{__html: this.state.playerPlaceholder }} >
						</div>
					</section>
				);
			} else {
				return(
					<section className="spotify-player">
						{playlistHeader()}
						<TrackList
							previewWarningText={this.props.previewWarningText}
							tracks={this.state.albumData.tracks.items}
							updateTrackPlayingStatus={this.firePlayingStatusChangeEvent}
							/>
					</section>
				);
			}
		}
	});

module.exports = SpotifyPlayer;
