'use strict';
import React from 'react';
import Track from './Track';
var TrackList = React.createClass({
  getDefaultProps: function() {
    return {
      tracks: [],
      updateTrackPlayingStatus: undefined
    }
  },
  propTypes: {
    tracks: React.PropTypes.array,
    updateTrackPlayingStatus: React.PropTypes.func
  },
  trackChangedStatus: function(isPlaying, audioTrack, spotifyTrack) {
    this.props.updateTrackPlayingStatus(isPlaying, audioTrack, spotifyTrack);
  },
  render: function () {
    var that = this;
    var trackNodesData = this.props.tracks.map(function(track, index) {
      return(
        <Track
          key={index}
          onPlayingStatusChange={that.trackChangedStatus}
          tooltip={that.props.previewWarningText}
          track={track}
          />
      )
    });
    return (
      <div className="list-group">
        {trackNodesData}
      </div>
    );
  }
});
module.exports = TrackList;
