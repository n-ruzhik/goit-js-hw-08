import throttle from 'lodash.throttle';
import vimeoPlayer from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new vimeoPlayer(iframe);
const STORAGE_KEY = 'videoplayer-current-time';

const getCurrentTime = ({ seconds }) => {
  localStorage.setItem(STORAGE_KEY, seconds);
};

player.on('timeupdate', throttle(getCurrentTime, 1000));

player.setCurrentTime(localStorage.getItem(STORAGE_KEY) || 0);
