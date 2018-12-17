(() => {
  let toastElement;
  let toastTimeout;
  const toast = (text) => {
    if (!toastElement) {
      toastElement = document.createElement('div');
      toastElement.style.backgroundColor = '#33333333';
      toastElement.style.position = 'fixed';
      toastElement.style.color = 'white';
      toastElement.style.zIndex = '20000';
      toastElement.style.top = '30px';
      toastElement.style.left = '50%';
      toastElement.style.fontSize = '30px';
      toastElement.style.padding = '2px 4px';
      toastElement.append('ha');
      toastElement.appendChild(document.createTextNode(''));
      document.body.appendChild(toastElement);
    }

    toastTimeout && clearTimeout(toastTimeout);
    toastElement.firstChild.textContent = text;
    toastElement.style.visibility = 'visible';
    toastTimeout = setTimeout(() => {
      toastElement.style.visibility = 'hidden';
    }, 1000);

    chrome.runtime.sendMessage('anfhlgmaegobggmeggdmpiegnfgkcack', {
      action: 'setBadgeText',
      content: { text: text.toString() },
    });
  };

  // keep playback rate
  let playbackRate = undefined;
  setInterval(() => {
    if (playbackRate) {
      document.getElementsByTagName('video')[0].playbackRate = playbackRate;
    }
  }, 100);

  const setPlaybackRate = (pr) => {
    playbackRate = pr;
    toast(pr);
    console.log('video.playbackRate', playbackRate);
  }

  // add keyboard listener to video player element
  const interval = setInterval(() => {
    const ele = document.getElementsByClassName('player-mnc')[0];
    if (!ele) {
      return;
    }
    clearInterval(interval);
    ele.addEventListener('keyup', (event) => {
      if (!event) {
        return;
      }
      if (['ArrowDown', 'ArrowUp'].includes(event.key)) {
        playbackRate = playbackRate || 1;
        if (event.key === 'ArrowDown') {
          setPlaybackRate(playbackRate - 0.5);
        } else if (event.key === 'ArrowUp') {
          setPlaybackRate(playbackRate + 0.5);
        }
      }
    });

    document.body.addEventListener('keyup', (event) => {
      const nn = parseInt(event.key, 10);
      if (!isNaN(nn)) {
        setPlaybackRate(nn);
      }
    });
    console.log('[starfish] mounted on', ele);
  }, 1000);
})();
