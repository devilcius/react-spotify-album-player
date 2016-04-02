import React from 'react';
import ReactDOM from 'react-dom';
import SpotifyPlayer from '../dist-modules/index.js';

export default class Demo extends React.Component {

	constructor(props) {
		super(props);
		this.updateRecord = this.updateRecord.bind(this);
		this.state = {
			albumName: 'Milo Goes to College',
			artistName: 'Descendents',
			spotifyUri: null
		};
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
			<div className="demo-container">
				<SpotifyPlayer
					albumName={this.state.albumName}
					artistName={this.state.artistName}
					noDataFoundText="No data found"
					onTrackPaused={this.clearTrackInfo.bind(this)}
					onTrackPlayed={this.setTrackInfo.bind(this)}
					previewWarningText="Only 20 seconds preview"
					showHeader />
				<div className="form-container">
					<form onSubmit={this.updateRecord}>
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
						<button >Update</button>
					</form>
					<div className="extra-info">
						<hr/>
						<h5>On playing event:</h5>
						Spotify URI: <strong>{this.state.spotifyUri}</strong>
					</div>
				</div>
			</div>
		);
	}
}
