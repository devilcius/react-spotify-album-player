import React from 'react';
import { Track } from './Track';
import PropTypes from 'prop-types';

function TrackList({
    listGroupItemBadgeClassName,
    listGroupClassName,
    listGroupItemClassName,
    listGroupItemLink,
    previewWarningText,
    tracks,
    updateTrackPlayingStatus
}) {

    const trackChangedStatus = (isPlaying, audioTrack, spotifyTrack) => {
        if (updateTrackPlayingStatus) {
            updateTrackPlayingStatus(isPlaying, audioTrack, spotifyTrack);
        }
    };

    const trackNodesData = tracks.map((track, index) => (
        <Track
            key={index}
            listGroupItemBadgeClassName={listGroupItemBadgeClassName}
            listGroupItemClassName={listGroupItemClassName}
            listGroupItemLink={listGroupItemLink}
            onPlayingStatusChange={trackChangedStatus}
            tooltip={previewWarningText}
            track={track}
        />
    ));

    return (
        <ul className={listGroupClassName}>
            {trackNodesData}
        </ul>
    );
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