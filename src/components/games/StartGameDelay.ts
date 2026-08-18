class StartGameDelay {
  awaitStartGameRender(render: () => void) {
    let timeToStartGame: number = 3;
    document.body.innerHTML = '';
    const main = document.createElement('main');
    const timerPreloadContainer = document.createElement('div') as HTMLElement;
    timerPreloadContainer.classList.add('timer-preload__container');
    main.append(timerPreloadContainer!);
    document.body.append(main);
    const inter = setInterval(() => {
      if (timeToStartGame === 0) {
        render();
        clearInterval(inter);
      }
      timerPreloadContainer.textContent = `${timeToStartGame}`;
      timeToStartGame -= 1;
    }, 1000);
  }
}

export const startGameDelay = new StartGameDelay();
