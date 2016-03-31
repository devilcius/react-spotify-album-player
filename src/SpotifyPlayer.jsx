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
				previewWarningText: 'Only 20 seconds preview'
			}
		},
		propTypes: {
			albumName: React.PropTypes.string.isRequired,
			artistName: React.PropTypes.string.isRequired,
			noDataFoundText: React.PropTypes.string,
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
							that.setState({playerPlaceholder: that.props.noDataFoundText});
						}
					});
				} else {
					that.setState({playerPlaceholder: that.props.noDataFoundText});
				}
			};
			xhr.send();
		},
		fetchTracks: function(albumId, callback){
			var xhr = new XMLHttpRequest();
			xhr.open('get', 'https://api.spotify.com/v1/albums/' + albumId);
			xhr.onload = function () {
				var response = JSON.parse(xhr.responseText);
				callback(response);
			};
			xhr.send();
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
					<div dangerouslySetInnerHTML={{__html: this.state.playerPlaceholder }} >
					</div>
				);
			} else {
				return(
					<section className="spotify-player">
						{playlistHeader()}
						<TrackList
							previewWarningText={this.props.previewWarningText}
							tracks={this.state.albumData.tracks.items}
							/>
					</section>
				);
			}
		}
	});

module.exports = SpotifyPlayer;
