'use strict';
import React from 'react';
import { Track } from './Track';
import PropTypes from 'prop-types';

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
                        listGroupItemLink={this.props.listGroupItemLink}
                        onPlayingStatusChange={this.trackChangedStatus}
                        tooltip={this.props.previewWarningText}
                        track={track}
                        />
                    );
        }.bind(this));
        return (
                <ul className={this.props.listGroupClassName}>
                    {trackNodesData}
                </ul>
                );
    }
}

TrackList.propTypes = {
    listGroupItemBadgeClassName: PropTypes.string,
    listGroupClassName: PropTypes.string,
    listGroupItemClassName: PropTypes.string,
    listGroupItemLink: PropTypes.string,
    previewWarningText: PropTypes.string,
    tracks: PropTypes.array,
    updateTrackPlayingStatus: PropTypes.func
};

TrackList.defaultProps = {
    tracks: [],
    updateTrackPlayingStatus: undefined
};
export { TrackList };
