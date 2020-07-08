(() => {
  let minutes = 10;
  let seconds = 0;
  let interval;

  run();

  function getWithZero(value) {
    if (value < 10) return `0${value}`;
    return value;
  }

  function setDOMValue() {
    const element = document.getElementsByClassName('count');
    element[0].textContent = `${getWithZero(minutes)}:${getWithZero(seconds)}`;
  }

  function getMinutesByParam() {
    const reg = /minutes=(\d+)/;
    const search = document.location.search;
    if (!search) return;
    const value = reg.exec(search);
    if (!value) return;
    const [_, time] = value;
    return +time;
  }

  function getSecondsByParam() {
    const reg = /seconds=(\d+)/;
    const search = document.location.search;
    if (!search) return;
    const value = reg.exec(search);
    if (!value) return;
    const [_, time] = value;
    return +time;
  }
  
  function sub() {
    // Se minutos e segundos chegaram ao zero, retorna.
    if (minutes == 0 && seconds == 0) return clearInterval(interval);
    // Controla os segundos
    if (seconds == 0) {
      seconds = 59;
      minutes--;
    } else {
      seconds--;
    }
    setDOMValue();
  }

  function run() {
    const minutesParam = getMinutesByParam();
    if (Number.isInteger(minutesParam)) {
      minutes = minutesParam;
    }
    const secondsParam = getSecondsByParam();

    if (Number.isInteger(secondsParam)) {
      seconds = secondsParam;
    }

    interval = setInterval(() => {
      sub();
    }, 1000);
  }

})();