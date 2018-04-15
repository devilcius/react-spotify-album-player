'use strict';
import React from 'react';
import Track from './Track';
class TrackList extends React.Component {

    constructor(props) {
        super(props);

        this.trackChangedStatus = this.trackChangedStatus.bind(this);
    }

    trackChangedStatus(isPlaying, audioTrack, spotifyTrack) {
        this.props.updateTrackPlayingStatus(isPlaying, audioTrack, spotifyTrack);
    }
    render() {
        var trackNodesData = this.props.tracks.map(function (track, index) {
            return(
                    <Track
                        key={index}
                        listGroupItemBadgeClassName={this.props.listGroupItemBadgeClassName}
                        listGroupItemClassName={this.props.listGroupItemClassName}
                        onPlayingStatusChange={this.trackChangedStatus}
                        tooltip={this.props.previewWarningText}
                        track={track}
                        />
                    );
        }.bind(this));
        return (
                <div className={this.props.listGroupClassName}>
                    {trackNodesData}
                </div>
                );
    }
}
;

TrackList.propTypes = {
    listGroupItemBadgeClassName: React.PropTypes.string,
    listGroupClassName: React.PropTypes.string,
    listGroupItemClassName: React.PropTypes.string,
    previewWarningText: React.PropTypes.string,
    tracks: React.PropTypes.array,
    updateTrackPlayingStatus: React.PropTypes.func
};

TrackList.defaultProps = {    
    tracks: [],
    updateTrackPlayingStatus: undefined
};
module.exports = TrackList;
