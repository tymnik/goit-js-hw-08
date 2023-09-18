import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player', {
  width: 640,
});

player.on('play', function () {
  console.log('played the video!');
});

const iframe = document.querySelector('iframe');
const iframePlayer = new Player(iframe);

iframePlayer.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

function onPlay(data) {}

iframePlayer.on('play', onPlay);

const savedPlaybackTime = localStorage.getItem('videoplayer-current-time');
if (savedPlaybackTime !== null) {
  iframePlayer.setCurrentTime(JSON.parse(savedPlaybackTime));
}

const savePlaybackTimeThrottled = throttle(function (data) {
  localStorage.setItem(
    'videoplayer-current-time',
    JSON.stringify(data.seconds)
  );
}, 1000);

iframePlayer.on('timeupdate', savePlaybackTimeThrottled);
