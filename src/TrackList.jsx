'use strict';
import React from 'react';
import Track from './Track';
var TrackList = React.createClass({
  getDefaultProps: function() {
    return {
      tracks: []
    }
  },
  propTypes: {
    tracks: React.PropTypes.array
  },
  render: function () {
    var that = this;
    var trackNodesData = this.props.tracks.map(function(track, index) {
      return(
        <Track
          key={index}
          tooltip={that.props.previewWarningText}
          track={track}
          />
      )
    });
    return (
      <ul className="list-group">
        {trackNodesData}
      </ul>
    );
  }
});
module.exports = TrackList;
