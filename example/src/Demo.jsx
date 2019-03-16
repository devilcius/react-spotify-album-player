import React from 'react';
import ReactDOM from 'react-dom';
import { SpotifyPlayer } from 'react-spotify-album-player';

export default class Demo extends React.Component {

	constructor(props) {
		super(props);
		this.clientId = '0454e14b019d4236b4cf5fd4fd9525ee';
		this.scopes = 'user-top-read';
		this.redirectUri = 'http://localhost:3000/';
		this.login = this.login.bind(this);
		this.updateRecord = this.updateRecord.bind(this);
		this.state = {
			albumName: 'Milo Goes to College',
			artistName: 'Descendents',
			spotifyToken: null,
			spotifyUri: null,
			spotifyUser: null
		};
	}
	componentDidMount() {
		let spotifyToken = window.location.hash.substr(1).split('&')[0].split("=")[1];
		if (spotifyToken) {
	      window.opener.spotifyCallback(spotifyToken)
	  }
	}

	login() {
		const popup = window.open(`https://accounts.spotify.com/authorize?client_id=${this.clientId}&response_type=token&redirect_uri=${this.redirectUri}&scope=${this.scopes}&show_dialog=true`, 'Login with Spotify', 'width=800,height=600')

		window.spotifyCallback = (payload) => {
			popup.close()

			fetch('https://api.spotify.com/v1/me', {
				headers: {
					'Authorization': `Bearer ${payload}`
				}
			}).then(response => {
				return response.json()
			}).then(data => {
				this.setState({
					spotifyToken: payload,
					spotifyUser: data
				});
			})
		}
	}

	updateRecord(event) {
		event.preventDefault();
		var artist = ReactDOM.findDOMNode(this.refs.artist).value;
		var release = ReactDOM.findDOMNode(this.refs.release).value;
		this.setState({artistName: artist, albumName: release});
	}
	setTrackInfo(audioTrack, spotifyTrack) {
		this.setState({spotifyUri: spotifyTrack.uri});
	}
	clearTrackInfo() {
		this.setState({spotifyUri: null});
	}
	render() {
		return	(
			<div>
			{this.state.spotifyToken !== null &&
				<div className="demo-container">
					<p>Click on a song to preview it</p>					
				 <SpotifyPlayer
					albumName={this.state.albumName}
					artistName={this.state.artistName}
					listGroupClassName="pure-menu-list"
					listGroupItemClassName="pure-menu-item"
					listGroupItemLink="pure-menu-link"
					noDataFoundText="No data found"
					onTrackPaused={this.clearTrackInfo.bind(this)}
					onTrackPlayed={this.setTrackInfo.bind(this)}
					previewWarningText="Only 30 seconds preview"
					showHeader
					token={this.state.spotifyToken}
					/>
				<div className="form-container">
					<form className="pure-form" onSubmit={this.updateRecord}>
						<fieldset>
							<legend>Find another album</legend>
							<input
								placeholder="artist name"
								ref="artist"
								required
								type="text"
								/>
							<input
								placeholder="release name"
								ref="release"
								required
								type="text"
								/>
							<button className="pure-button" >Search</button>
						</fieldset>
					</form>
					<div className="extra-info">
						<hr/>
						<h5>
							On playing event:
						</h5>
						Spotify URI: <strong>
						{this.state.spotifyUri}
					</strong>

				</div>
			</div>
		</div>}
		{this.state.spotifyToken === null &&
			<div>
				<p><strong>You must authorize this app</strong></p>
				<button className="pure-button" onClick={this.login}>authorize</button>
			</div>
		}
		</div>
	);
}
}
