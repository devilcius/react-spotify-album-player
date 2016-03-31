import React from 'react';
import SpotifyPlayer from '../dist-modules/SpotifyPlayer.js';

export default class Demo extends React.Component {

	constructor(props) {
		super(props);
		this.updateRecord = this.updateRecord.bind(this);
		this.state = {
			albumName: 'Reign in blood',
			artistName: 'Slayer'
		};
	}
	updateRecord(event) {
		event.preventDefault();
		var artist = React.findDOMNode(this.refs.artist).value;
		var release = React.findDOMNode(this.refs.release).value;
		this.setState({artistName: artist, albumName: release});
	}
	render() {
		return	(
			<div className="demo-container">
				<SpotifyPlayer
					albumName={this.state.albumName}
					artistName={this.state.artistName}
					noDataFoundText="No data found"
					previewWarningText="Only 20 seconds preview"
					showHeader />
				<form onSubmit={this.updateRecord}>
					<input
						placeholder="artist name"
						ref="artist"
						type="text"
						/>
					<input
						placeholder="release name"
						ref="release"
						type="text"
						/>
					<button >Update</button>
				</form>
			</div>
		);
	}
}
