import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function Track({
    listGroupItemBadgeClassName,
    listGroupItemClassName,
    listGroupItemLink,
    onPlayingStatusChange,
    tooltip,
    track
}) {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(new Audio());

    const getDuration = (ms) => {
        var min = Math.floor(ms / 1000 / 60);
        var sec = Math.floor((ms / 1000) % 60);
        return `${min}:${sec < 10 ? `0${sec}` : sec}`;
    }

    useEffect(() => {
        audioRef.current.src = track.preview_url;
        audioRef.current.load();

        return () => {
            audioRef.current.pause();
            audioRef.current.src = '';
        };
    }, [track]);

    useEffect(() => {
        const handleEnd = () => {
            setIsPlaying(false);
            if (onPlayingStatusChange) {
                onPlayingStatusChange(false, audioRef.current, track);
            }
        };

        audioRef.current.addEventListener('ended', handleEnd);

        return () => {
            audioRef.current.removeEventListener('ended', handleEnd);
        };
    }, [track, onPlayingStatusChange]);

    const playTrack = (event) => {
        event.preventDefault();

        if (audioRef.current.paused) {
            setIsPlaying(true);
            audioRef.current.play();
            if (onPlayingStatusChange) {
                onPlayingStatusChange(true, audioRef.current, track);
            }
        } else {
            audioRef.current.pause();
            setIsPlaying(false);
            if (onPlayingStatusChange) {
                onPlayingStatusChange(false, audioRef.current, track);
            }
        }
    };

    const playButtonClassNames = isPlaying ? 'fa fa-pause' : 'fa fa-play';
    const playButtonStyle = { cursor: 'default' };

    return (
        <li className={listGroupItemClassName} onClick={playTrack} >
            <a
                href="#"
                className={listGroupItemLink}
                style={playButtonStyle}
                title={tooltip}
            >
                {`${track.track_number}. ${track.name} (${getDuration(track.duration_ms)})`}
            </a>
            <span className={listGroupItemBadgeClassName}>
                <i className={playButtonClassNames}></i>
            </span>
        </li>
    );
}

Track.propTypes = {
    listGroupItemBadgeClassName: PropTypes.string,
    listGroupItemClassName: PropTypes.string,
    listGroupItemLink: PropTypes.string,
    onPlayingStatusChange: PropTypes.func,
    tooltip: PropTypes.string.isRequired,
    track: PropTypes.object.isRequired
};

Track.defaultProps = {
    onPlayingStatusChange: undefined
};

export { Track };