(() => {
  "use strict";
  var e = {
      983: (e, t, s) => {
        s.r(t);
      },
      843: (e, t, s) => {
        Object.defineProperty(t, "__esModule", { value: !0 });
        const n = s(686),
          a = s(918),
          i = s(112),
          r = s(890);
        new (class {
          start() {
            n.startingPage.render(),
              i.storage.isAuthorised &&
                (a.bookPage.getAllDifficult(),
                a.bookPage.getAllLearned(),
                r.storageStatistic.getStatisticData());
          }
        })().start();
      },
      122: (e, t) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.Button = void 0),
          (t.Button = class {
            constructor(e, t, s) {
              (this.buttonClass = e), (this.text = t), (this.callback = s);
            }
            render() {
              const e = document.createElement("button");
              return (
                e.classList.add("button"),
                e.classList.add(`${this.buttonClass}`),
                (e.type = "button"),
                (e.textContent = this.text),
                e.addEventListener("click", this.callback),
                e
              );
            }
          });
      },
      645: (e, t, s) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.difficultyButtons = void 0);
        const n = s(918),
          a = s(388),
          i = s(122);
        t.difficultyButtons = new (class {
          render() {
            const e = document.createElement("div");
            return (
              e.classList.add("nav-book__difficulties"),
              [
                ["a1", this.changeDifficulty.bind(this, 0, "green")],
                ["a2", this.changeDifficulty.bind(this, 1, "yellow")],
                ["b1", this.changeDifficulty.bind(this, 2, "blue")],
                ["b2", this.changeDifficulty.bind(this, 3, "purple")],
                ["c1", this.changeDifficulty.bind(this, 4, "pink")],
                ["c2", this.changeDifficulty.bind(this, 5, "brown")],
              ].forEach((t) =>
                e.append(new i.Button("button-difficulty", ...t).render())
              ),
              e
            );
          }
          async changeDifficulty(e, t) {
            (a.state.difficultyColor = t),
              (a.state.group = e),
              await n.bookPage.render(),
              document
                .querySelectorAll(".add-difficults__button")
                .forEach((e) => e.classList.add(`${t}`)),
              document
                .querySelectorAll(".add-learned__button")
                .forEach((e) => e.classList.add(`${t}`));
          }
        })();
      },
      232: function (e, t, s) {
        var n =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.gamesNavButtons = void 0);
        const a = s(824),
          i = s(754),
          r = n(s(94)),
          o = s(474),
          d = s(161),
          l = s(112),
          c = s(388),
          u = s(122);
        t.gamesNavButtons = new (class {
          renderSprint() {
            const e = new u.Button(
                "bookpage-sprint__button",
                "Спринт",
                this.startSprint.bind(this)
              ).render(),
              t = document.createElement("span");
            return e.prepend(t), e;
          }
          renderAudioChallenge() {
            const e = new u.Button(
                "bookpage-audiochallenge__button",
                "Аудиовызов",
                this.startAudioChallenge.bind(this)
              ).render(),
              t = document.createElement("span");
            return e.prepend(t), e;
          }
          async startSprint() {
            o.startGameDelay.awaitStartGameRender(this.sprint.bind(this)),
              l.storage.isAuthorised
                ? ((r.default.sprintView.sprint.id = "_id"),
                  r.default.sprintView.sprint.getWordsArrForUser(
                    await this.getNoLearnedWords()
                  ))
                : ((r.default.sprintView.sprint.id = "id"),
                  r.default.sprintView.sprint.getWordsArrForBook(
                    c.state.group,
                    c.state.page
                  ));
          }
          async startAudioChallenge() {
            o.startGameDelay.awaitStartGameRender(this.audioCall.bind(this)),
              l.storage.isAuthorised
                ? ((a.audioCallViewWrapper.audioCallView.audioCall.id = "_id"),
                  a.audioCallViewWrapper.audioCallView.audioCall.getWordsArrForUser(
                    await this.getNoLearnedWords()
                  ))
                : ((a.audioCallViewWrapper.audioCallView.audioCall.id = "id"),
                  a.audioCallViewWrapper.audioCallView.audioCall.getWordsArrForBook(
                    c.state.group,
                    c.state.page
                  ));
          }
          sprint() {
            r.default.sprintView.sprint.wordsArr.length <= 4
              ? i.notEnoughWordsPopup.render()
              : r.default.render();
          }
          audioCall() {
            a.audioCallViewWrapper.audioCallView.audioCall.wordsArr.length <= 4
              ? i.notEnoughWordsPopup.render()
              : a.audioCallViewWrapper.render();
          }
          async getNoLearnedWords() {
            const e = await d.difficultWordsService.getAllUserNoLearnedWords();
            if ("number" != typeof e)
              return e
                .filter(
                  (e) =>
                    !c.state.learnedWords.includes(e._id) &&
                    e.page <= c.state.page
                )
                .slice(-20);
          }
        })();
      },
      443: (e, t, s) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.startingLoginButton = void 0);
        const n = s(122),
          a = s(193),
          i = s(112),
          r = s(119),
          o = s(686);
        t.startingLoginButton = new (class {
          render() {
            const e = i.storage.isAuthorised
              ? ["Выйти", this.logout.bind(this)]
              : ["Войти", this.openLoginPopup.bind(this)];
            return new n.Button("starting-page__login", ...e).render();
          }
          openLoginPopup() {
            var e;
            null === (e = document.querySelector(".popup-login")) ||
              void 0 === e ||
              e.remove(),
              a.renderLoginPopup.renderLoginForm(document.body);
          }
          logout() {
            r.authorisation.logout(), o.startingPage.render();
          }
        })();
      },
      105: function (e, t, s) {
        var n =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.gamePreload = void 0);
        const a = s(122),
          i = s(824),
          r = n(s(94)),
          o = s(474),
          d = s(686);
        t.gamePreload = new (class {
          render(e) {
            document.body.innerHTML = "";
            const t = document.createElement("main"),
              s = document.createElement("div");
            s.classList.add("game-wrapper");
            const n = document.createElement("h2");
            n.classList.add("game__title"),
              (n.textContent = "sprint" === e ? "спринт" : "аудиовызов");
            const i = document.createElement("p");
            i.classList.add("game-lvl__subtitle"),
              (i.textContent = "Выберите уровень игры");
            const r = document.createElement("div");
            r.classList.add("game-lvl__buttons-container");
            for (let t = 0; t < 6; t++) {
              const s = new a.Button(
                "game-lvl__button",
                `${t + 1}`,
                this.selectGroupGame.bind(this, t, e)
              ).render();
              r.append(s);
            }
            const o = new a.Button(
              "game__button-back",
              "Вернутся на главную",
              this.backGame.bind(this)
            ).render();
            document.body.append(t),
              t.append(s),
              s.append(n),
              s.append(i),
              s.append(r),
              s.append(o);
          }
          async selectGroupGame(e, t) {
            "sprint" === t
              ? (o.startGameDelay.awaitStartGameRender(
                  this.startSprintGame.bind(this)
                ),
                r.default.sprintView.sprint.getWordsArr(e))
              : (o.startGameDelay.awaitStartGameRender(
                  this.startAudioCallGame.bind(this)
                ),
                i.audioCallViewWrapper.audioCallView.audioCall.getWordsArr(e));
          }
          backGame() {
            d.startingPage.render();
          }
          startSprintGame() {
            r.default.render();
          }
          startAudioCallGame() {
            i.audioCallViewWrapper.render();
          }
        })();
      },
      805: (e, t, s) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.gamesStatistic = void 0);
        const n = s(48),
          a = s(112),
          i = s(388);
        t.gamesStatistic = new (class {
          setStatistic(e, t) {
            const s = (0, n.getTodayDate)();
            if (localStorage.getItem(`${a.storage.idUser}-gamesStatistic`)) {
              const e = JSON.parse(
                localStorage.getItem(`${a.storage.idUser}-gamesStatistic`)
              );
              i.state.gamesStatistic = Object.assign({}, e);
            }
            i.state.gamesStatistic.hasOwnProperty(s)
              ? i.state.gamesStatistic[s].hasOwnProperty(e)
                ? ((i.state.gamesStatistic[s][e].newWords += t.newWords),
                  (i.state.gamesStatistic[s][e].numberAllAnswer =
                    t.numberAllAnswer),
                  (i.state.gamesStatistic[s][e].numberCorrectAnswer =
                    t.numberCorrectAnswer),
                  (i.state.gamesStatistic[s][e].chain =
                    i.state.gamesStatistic[s][e].chain > t.chain
                      ? i.state.gamesStatistic[s][e].chain
                      : t.chain))
                : (i.state.gamesStatistic[s][e] = t)
              : (i.state.gamesStatistic[s] =
                  "sprint" === e
                    ? { sprint: Object.assign({}, t) }
                    : { audioCall: Object.assign({}, t) }),
              localStorage.setItem(
                `${a.storage.idUser}-gamesStatistic`,
                JSON.stringify(i.state.gamesStatistic)
              );
          }
          setNewWordsGame(e, t) {
            "Sprint" === t
              ? i.state.newSprintWords.add(e)
              : i.state.newAudioCallWords.add(e);
          }
        })();
      },
      107: function (e, t, s) {
        var n =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, "__esModule", { value: !0 });
        const a = n(s(94)),
          i = s(122),
          r = s(927),
          o = s(824),
          d = s(232);
        t.default = class {
          constructor(e) {
            this.typeGame = e;
          }
          render(e, t) {
            const s = document.createElement("div");
            s.classList.add("game__result-wrapper");
            const n = document.createElement("div");
            n.classList.add("game__result-container");
            const a = document.createElement("div");
            a.classList.add("game__result-score"),
              (a.textContent = `Общий балл: ${t}`);
            const o = document.createElement("div"),
              d = document.createElement("div");
            o.classList.add("answer-title"), d.classList.add("answer-title");
            const l = document.createElement("div"),
              c = document.createElement("div");
            l.classList.add("result-container__answers"),
              c.classList.add("result-container__answers");
            const u = document.createElement("div");
            u.classList.add("game__result-buttons");
            const p = new i.Button(
                "button__game-over",
                "выйти в меню",
                this.gameOver.bind(this)
              ).render(),
              h = new i.Button(
                "button__try-again",
                "играть снова",
                this.tryAgain.bind(this)
              ).render();
            u.append(p, h);
            let g = 0,
              m = 0;
            return (
              e.forEach((e, t) => {
                const s = new Audio();
                s.src = `https://rsslang.herokuapp.com/${e.audio}`;
                const n = e.isAnswer ? l : c;
                e.isAnswer ? (g += 1) : (m += 1);
                const a = document.createElement("div");
                a.classList.add("answer__result");
                const i = document.createElement("div");
                i.classList.add("result-word__play"),
                  i.addEventListener("click", () => {
                    (0, r.soundPlay)(s);
                  });
                const o = document.createElement("p");
                (o.textContent = `${e.word.toUpperCase()} - ${
                  e.wordTranslate
                }`),
                  n.append(a),
                  a.append(i, o);
              }),
              (o.textContent = `Знаю: ${g}`),
              (d.textContent = `Ошибок: ${m}`),
              n.append(o, l, d, c),
              s.append(a, n, u),
              s
            );
          }
          gameOver() {
            "sprint" === this.typeGame
              ? a.default.closeGame()
              : o.audioCallViewWrapper.closeGame();
          }
          tryAgain() {
            "sprint" === this.typeGame
              ? d.gamesNavButtons.startSprint()
              : d.gamesNavButtons.startAudioChallenge();
          }
        };
      },
      474: (e, t) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.startGameDelay = void 0),
          (t.startGameDelay = new (class {
            awaitStartGameRender(e) {
              let t = 3;
              document.body.innerHTML = "";
              const s = document.createElement("main"),
                n = document.createElement("div");
              n.classList.add("timer-preload__container"),
                s.append(n),
                document.body.append(s);
              const a = setInterval(() => {
                0 === t && (e(), clearInterval(a)),
                  (n.textContent = `${t}`),
                  (t -= 1);
              }, 1e3);
            }
          })());
      },
      890: (e, t, s) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.storageStatistic = void 0);
        const n = s(48),
          a = s(112),
          i = s(388);
        t.storageStatistic = new (class {
          getStatisticData() {
            var e, t;
            const s = JSON.parse(
                localStorage.getItem(`${a.storage.idUser}-gamesStatistic`)
              ),
              r = JSON.parse(
                localStorage.getItem(`${a.storage.idUser}-wordsStatistic`)
              );
            (i.state.gamesStatistic = Object.assign({}, s)),
              (i.state.wordsStatistic = Object.assign({}, r)),
              i.state.gamesStatistic.hasOwnProperty((0, n.getTodayDate)())
                ? ((i.state.newSprintWords = (
                    null === (e = s[(0, n.getTodayDate)()]) || void 0 === e
                      ? void 0
                      : e.sprint
                  )
                    ? new Set(
                        Array.isArray(s[(0, n.getTodayDate)()].sprint.newWords)
                          ? s[(0, n.getTodayDate)()].sprint.newWords
                          : s[(0, n.getTodayDate)()].sprint.newWords.split(",")
                      )
                    : new Set()),
                  (i.state.newAudioCallWords = (
                    null === (t = s[(0, n.getTodayDate)()]) || void 0 === t
                      ? void 0
                      : t.audioCall
                  )
                    ? new Set(
                        Array.isArray(
                          s[(0, n.getTodayDate)()].audioCall.newWords
                        )
                          ? s[(0, n.getTodayDate)()].audioCall.newWords
                          : s[(0, n.getTodayDate)()].audioCall.newWords.split(
                              ","
                            )
                      )
                    : new Set()))
                : ((i.state.newSprintWords = new Set()),
                  (i.state.newAudioCallWords = new Set()));
          }
        })();
      },
      941: (e, t, s) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.wordsStatistic = void 0);
        const n = s(112),
          a = s(388);
        t.wordsStatistic = new (class {
          setAnswerWords(e, t) {
            if (a.state.wordsStatistic.hasOwnProperty(e))
              t
                ? (a.state.wordsStatistic[e].correct += 1)
                : (a.state.wordsStatistic[e].inCorrect += 1);
            else {
              const s = { correct: 0, inCorrect: 0 };
              t ? (s.correct += 1) : (s.inCorrect += 1),
                (a.state.wordsStatistic[e] = Object.assign({}, s));
            }
            localStorage.setItem(
              `${n.storage.idUser}-wordsStatistic`,
              JSON.stringify(a.state.wordsStatistic)
            );
          }
        })();
      },
      458: function (e, t, s) {
        var n =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, "__esModule", { value: !0 });
        const a = s(48),
          i = s(927),
          r = s(559),
          o = s(112),
          d = s(388),
          l = s(805),
          c = n(s(107)),
          u = s(941);
        t.default = class {
          constructor() {
            (this.id = "id"),
              (this.wordsArr = []),
              (this.learnWords = []),
              (this.answerRight = ""),
              (this.answers = []),
              (this.currentQuestion = 0),
              (this.numberOfCorrectAnswers = 0),
              (this.numberAllAnswers = 0),
              (this.longestChain = 0),
              (this.currentLongestChain = 0),
              (this.isAnswer = !1);
          }
          async getWordsArr(e) {
            const t = (0, a.getRandomInRange)(0, 29),
              s = await r.worldsRepository.all(t, e);
            this.wordsArr = [...s];
          }
          async getWordsArrForBook(e, t) {
            const s = await r.worldsRepository.all(t, e);
            this.wordsArr = [...s];
          }
          async getWordsArrForUser(e) {
            this.wordsArr = [...e];
          }
          setLongestChain(e) {
            e
              ? (this.currentLongestChain += 1)
              : this.currentLongestChain > this.longestChain
              ? ((this.longestChain = this.currentLongestChain),
                (this.currentLongestChain = 0))
              : (this.currentLongestChain = 0);
          }
          isEndQuestionsGame() {
            if (this.currentQuestion === this.wordsArr.length) {
              o.storage.isAuthorised &&
                l.gamesStatistic.setStatistic("audioCall", {
                  newWords: [...d.state.newAudioCallWords],
                  numberAllAnswer: this.numberAllAnswers,
                  numberCorrectAnswer: this.numberOfCorrectAnswers,
                  chain: this.longestChain,
                });
              const e = new c.default("audioCall").render(this.learnWords, 0);
              return (
                document.querySelector(".audio-call-wrapper").append(e),
                (this.learnWords = []),
                (this.currentQuestion = 0),
                (this.currentLongestChain = 0),
                (this.longestChain = 0),
                (this.numberAllAnswers = 0),
                (this.numberOfCorrectAnswers = 0),
                i.victoryGameSound.play(),
                !0
              );
            }
            return !1;
          }
          getQuestion() {
            return (
              (this.question = new Audio()),
              (this.question.src = `https://rsslang.herokuapp.com/${
                this.wordsArr[this.currentQuestion].audio
              }`),
              this.question.play(),
              this.question
            );
          }
          getAnswers() {
            (this.answers = []),
              (this.answerRight =
                this.wordsArr[this.currentQuestion].wordTranslate),
              this.answers.push(this.answerRight);
            for (let e = 0; e < 4; e++) this.getWrongAnswers();
            return (
              this.answers.sort(() => Math.round(100 * Math.random()) - 50),
              this.answers
            );
          }
          getWrongAnswers() {
            const e = (0, a.getRandomInRange)(0, this.wordsArr.length - 1);
            let t = this.wordsArr[e].wordTranslate;
            this.answers.includes(t)
              ? this.getWrongAnswers()
              : this.answers.push(t);
          }
          isAnswerRight(e) {
            const t = "id" !== this.id ? "_id" : "id";
            e === this.answerRight
              ? ((0, i.soundPlay)(i.rightAnswerSound),
                (this.isAnswer = !0),
                (this.numberOfCorrectAnswers += 1))
              : ((0, i.soundPlay)(i.wrongAnswerSound), (this.isAnswer = !1)),
              (this.numberAllAnswers += 1),
              this.setLongestChain(this.isAnswer),
              o.storage.isAuthorised &&
                (l.gamesStatistic.setNewWordsGame(
                  this.wordsArr[this.currentQuestion][t],
                  "AudioCall"
                ),
                u.wordsStatistic.setAnswerWords(
                  this.wordsArr[this.currentQuestion][t],
                  this.isAnswer
                )),
              this.learnWords.push({
                id: this.wordsArr[this.currentQuestion][t],
                word: this.wordsArr[this.currentQuestion].word,
                audio: this.wordsArr[this.currentQuestion].audio,
                wordTranslate:
                  this.wordsArr[this.currentQuestion].wordTranslate,
                isAnswer: this.isAnswer,
              });
          }
        };
      },
      130: function (e, t, s) {
        var n =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, "__esModule", { value: !0 });
        const a = s(122),
          i = s(927),
          r = n(s(458));
        t.default = class {
          constructor() {
            (this.audioCall = new r.default()), (this.isAnswer = !1);
          }
          render() {
            const e = document.createElement("div");
            e.classList.add("audio-call__container");
            const t = document.createElement("div");
            t.classList.add("audio-call__question-container");
            const s = document.createElement("div");
            s.classList.add("audio-call__question"),
              s.addEventListener("click", () => {
                (0, i.soundPlay)(this.audioCall.getQuestion());
              }),
              this.audioCall.getQuestion().play();
            const n = document.createElement("div");
            n.classList.add("audio-call__answers-container"),
              this.audioCall.getAnswers().forEach((e, t) => {
                const s = new a.Button(
                  "audio-call__answer",
                  e,
                  this.isAnswerRight.bind(this, e)
                ).render();
                n.append(s),
                  document.addEventListener(
                    "keydown",
                    (s) => {
                      s.code === `Digit${t + 1}` && this.isAnswerRight(e);
                    },
                    { once: !0 }
                  );
              });
            const r = document.createElement("div");
            r.classList.add("buttons-nav__container");
            const o = new a.Button(
              "button__dont-know",
              "не знаю",
              this.nextQuestion.bind(this)
            ).render();
            (document.onkeydown = (e) => {
              "Space" === e.code && this.nextQuestion();
            }),
              document.querySelector(".audio-call-wrapper").append(e),
              t.append(s),
              r.append(o),
              e.append(t, n, r);
          }
          renderPopupQuestion() {
            const e = this.audioCall.wordsArr[this.audioCall.currentQuestion],
              t = document.querySelector(".audio-call__question-container");
            (t.innerHTML = ""),
              t.insertAdjacentHTML(
                "beforeend",
                `\n      <img class="audio-call__question-img" src="https://rsslang.herokuapp.com/${e.image}" alt="word">\n      <div class="audio-call__question-text">${e.word}</div>\n      <div class="audio-call__question-translate">${e.wordTranslate}</div>\n      `
              );
          }
          isAnswerRight(e) {
            this.audioCall.isAnswerRight(e),
              (this.isAnswer = !0),
              document.querySelectorAll(".audio-call__answer").forEach((e) => {
                e instanceof HTMLButtonElement && (e.disabled = !0);
              }),
              (document.querySelector(".button__dont-know").textContent =
                "следующий"),
              this.renderPopupQuestion();
          }
          nextQuestion() {
            this.isAnswer
              ? ((this.isAnswer = !1),
                document.querySelector(".audio-call__container").remove(),
                (this.audioCall.currentQuestion += 1),
                this.audioCall.isEndQuestionsGame() || this.render())
              : ((this.isAnswer = !0), this.isAnswerRight(" "));
          }
        };
      },
      824: function (e, t, s) {
        var n =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.audioCallViewWrapper = void 0);
        const a = s(686),
          i = n(s(130));
        t.audioCallViewWrapper = new (class {
          constructor() {
            this.audioCallView = new i.default();
          }
          render() {
            document.body.innerHTML = "";
            const e = document.createElement("main"),
              t = document.createElement("div");
            t.classList.add("audio-call-wrapper");
            const s = document.createElement("h2");
            s.classList.add("audio-call__title"),
              (s.textContent = "Аудиовызов");
            const n = document.createElement("div");
            n.classList.add("settings-buttons__container");
            const a = document.createElement("div");
            a.classList.add("settings-buttons__fullscreen"),
              a.addEventListener("click", () => this.fullScreen());
            const i = document.createElement("div");
            i.classList.add("sprint__close-game"),
              i.addEventListener("click", () => {
                this.closeGame();
              }),
              document.body.append(e),
              e.append(s, n),
              n.append(a),
              e.append(i, t),
              this.audioCallView.render();
          }
          fullScreen() {
            document.fullscreenElement
              ? document.exitFullscreen()
              : document.querySelector("main").requestFullscreen();
          }
          closeGame() {
            a.startingPage.render(),
              (this.audioCallView.audioCall.learnWords = []),
              (this.audioCallView.audioCall.currentQuestion = 0),
              (this.audioCallView.audioCall.currentLongestChain = 0),
              (this.audioCallView.audioCall.longestChain = 0),
              (this.audioCallView.audioCall.numberAllAnswers = 0),
              (this.audioCallView.audioCall.numberOfCorrectAnswers = 0);
          }
        })();
      },
      754: (e, t, s) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.notEnoughWordsPopup = void 0);
        const n = s(122),
          a = s(918),
          i = s(388);
        t.notEnoughWordsPopup = new (class {
          render() {
            const e = document.querySelector("main");
            e.innerHTML = "";
            const t = document.createElement("div");
            t.classList.add("popup-container__not-enough");
            const s = document.createElement("div");
            s.classList.add("popup__text"),
              (s.textContent = "Недостаточно слов!");
            const a = new n.Button(
              "popup__button-back",
              "Назад",
              this.backBookPage.bind(this)
            ).render();
            t.append(s, a), e.append(t);
          }
          backBookPage() {
            (i.state.currentPage = "book"), a.bookPage.render();
          }
        })();
      },
      20: function (e, t, s) {
        var n =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, "__esModule", { value: !0 });
        const a = s(48),
          i = s(927),
          r = n(s(107)),
          o = s(559),
          d = s(388),
          l = s(941),
          c = s(805),
          u = s(112);
        t.default = class {
          constructor() {
            (this.id = "id"),
              (this.wordsArr = []),
              (this.learnWords = []),
              (this.idLearnWords = []),
              (this.currentQuestion = 0),
              (this.numberOfCorrectAnswers = 0),
              (this.numberAllAnswers = 0),
              (this.longestChain = 0),
              (this.currentLongestChain = 0),
              (this.score = 0),
              (this.generalScore = 0),
              (this.countTimerGame = 59),
              (this.currentPage = 0),
              (this.currentLvl = 0),
              (this.question = ""),
              (this.answerRight = ""),
              (this.answer = ""),
              (this.isAnswer = !1);
          }
          async getWordsArr(e) {
            const t = (0, a.getRandomInRange)(0, 29),
              s = await o.worldsRepository.all(t, e);
            this.wordsArr = [...s];
          }
          async getWordsArrForBook(e, t) {
            const s = await o.worldsRepository.all(t, e);
            this.wordsArr = [...s];
          }
          async getWordsArrForUser(e) {
            this.wordsArr = [...e];
          }
          getCurrentQuestion() {
            return (
              (this.question = this.wordsArr[this.currentQuestion].word),
              (this.answerRight =
                this.wordsArr[this.currentQuestion].wordTranslate),
              this.question
            );
          }
          isEndQuestionsGame() {
            this.currentQuestion === this.wordsArr.length &&
              (this.currentQuestion = 0);
          }
          randomAnswer() {
            return (0, a.getRandomInRange)(0, 1)
              ? (this.answer = this.answerRight)
              : ((this.answer =
                  this.wordsArr[
                    (0, a.getRandomInRange)(0, this.wordsArr.length - 1)
                  ].wordTranslate),
                this.answer);
          }
          setScore() {
            this.generalScore += 10;
          }
          setLongestChain(e) {
            e
              ? (this.currentLongestChain += 1)
              : this.currentLongestChain > this.longestChain
              ? ((this.longestChain = this.currentLongestChain),
                (this.currentLongestChain = 0))
              : (this.currentLongestChain = 0);
          }
          isAnswerRight(e) {
            const t = "id" !== this.id ? "_id" : "id";
            (this.answer === this.answerRight && e) ||
            (this.answer !== this.answerRight && !e)
              ? ((this.score += 1),
                this.setScore(),
                (0, i.soundPlay)(i.rightAnswerSound),
                (this.isAnswer = !0),
                (this.numberOfCorrectAnswers += 1))
              : ((0, i.soundPlay)(i.wrongAnswerSound),
                (this.score = 0),
                (this.isAnswer = !1)),
              this.setLongestChain(this.isAnswer),
              this.score > 3 && ((this.generalScore += 40), (this.score = 0)),
              (this.numberAllAnswers += 1),
              u.storage.isAuthorised &&
                (c.gamesStatistic.setNewWordsGame(
                  this.wordsArr[this.currentQuestion][t],
                  "Sprint"
                ),
                l.wordsStatistic.setAnswerWords(
                  this.wordsArr[this.currentQuestion][t],
                  this.isAnswer
                ));
            const s = {
              id: this.wordsArr[this.currentQuestion][t],
              word: this.wordsArr[this.currentQuestion].word,
              audio: this.wordsArr[this.currentQuestion].audio,
              wordTranslate: this.wordsArr[this.currentQuestion].wordTranslate,
              isAnswer: this.isAnswer,
            };
            this.idLearnWords.includes(this.wordsArr[this.currentQuestion][t])
              ? this.learnWords.forEach((e, s, n) => {
                  e.id === this.wordsArr[this.currentQuestion][t] &&
                    (e.isAnswer = this.isAnswer);
                })
              : (this.idLearnWords.push(this.wordsArr[this.currentQuestion][t]),
                this.learnWords.push(s)),
              (this.currentQuestion += 1);
          }
          startGameTimer() {
            const e = setInterval(() => {
              const t = document.querySelector(".timer-container");
              if (0 === this.countTimerGame) {
                document.querySelector(".sprint-wrapper").innerHTML = "";
                const t = new r.default("sprint").render(
                  this.learnWords,
                  this.generalScore
                );
                document.querySelector(".sprint-wrapper").append(t),
                  clearInterval(e),
                  u.storage.isAuthorised &&
                    c.gamesStatistic.setStatistic("sprint", {
                      newWords: [...d.state.newSprintWords],
                      numberAllAnswer: this.numberAllAnswers,
                      numberCorrectAnswer: this.numberOfCorrectAnswers,
                      chain: this.longestChain,
                    }),
                  (this.generalScore = 0),
                  (this.countTimerGame = 59),
                  (this.score = 0),
                  (this.numberAllAnswers = 0),
                  (this.numberOfCorrectAnswers = 0),
                  (this.longestChain = 0),
                  (this.learnWords = []),
                  i.victoryGameSound.play();
              }
              t && (t.textContent = `${this.countTimerGame}`),
                (this.countTimerGame -= 1);
            }, 1e3);
            return () => clearInterval(e);
          }
        };
      },
      723: function (e, t, s) {
        var n =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, "__esModule", { value: !0 });
        const a = s(122),
          i = n(s(20));
        t.default = class {
          constructor() {
            this.sprint = new i.default();
          }
          async runGame() {
            this.stopGameTimer = this.sprint.startGameTimer();
          }
          render() {
            const e = document.createElement("div");
            e.classList.add("sprint-container");
            const t = document.createElement("div");
            (t.textContent = `${this.sprint.generalScore}`),
              t.classList.add("sprint__score");
            const s = document.createElement("div");
            s.classList.add("sprint__pagination-container");
            for (let e = 0; e < 3; e++) {
              const e = document.createElement("div");
              e.classList.add("sprint__answer-pagination"), s.append(e);
            }
            const n = document.createElement("div");
            n.classList.add("sprint__question");
            const i = document.createElement("div");
            i.classList.add("sprint__answer");
            const r = document.createElement("div");
            r.classList.add("answer-buttons__container");
            const o = new a.Button(
                "false-answer",
                "неверно",
                this.isCorrectAnswer.bind(this, !1)
              ).render(),
              d = new a.Button(
                "true-answer",
                "верно",
                this.isCorrectAnswer.bind(this, !0)
              ).render();
            (document.onkeydown = (e) => {
              if ("ArrowLeft" === e.code) this.isCorrectAnswer(!1);
              else {
                if ("ArrowRight" !== e.code) return;
                this.isCorrectAnswer(!0);
              }
            }),
              (n.textContent = `${this.sprint.getCurrentQuestion()}`),
              (i.textContent = `${this.sprint.randomAnswer()}`),
              e.append(t, s, n, i, r),
              r.append(o, d),
              document.querySelector(".sprint-wrapper").append(e),
              document
                .querySelectorAll(".sprint__answer-pagination")
                .forEach((e, t) => {
                  t < this.sprint.score &&
                    e instanceof HTMLElement &&
                    (e.style.background = "#60bee4");
                });
          }
          isCorrectAnswer(e) {
            this.sprint.isAnswerRight(e),
              document.querySelector(".sprint-container").remove(),
              this.sprint.isEndQuestionsGame(),
              this.render();
          }
        };
      },
      257: function (e, t, s) {
        var n =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.sprintViewWrapper = void 0);
        const a = s(927),
          i = s(686),
          r = n(s(723));
        t.sprintViewWrapper = new (class {
          constructor() {
            this.sprintView = new r.default();
          }
          render() {
            document.body.innerHTML = "";
            const e = document.createElement("main"),
              t = document.createElement("div");
            t.classList.add("sprint-wrapper");
            const s = document.createElement("h2");
            s.classList.add("sprint__title"), (s.textContent = "Спринт");
            const n = document.createElement("div");
            n.classList.add("timer-container"), (n.textContent = "60");
            const a = document.createElement("div");
            a.classList.add("settings-buttons__container");
            const i = document.createElement("div");
            i.classList.add("settings-buttons__fullscreen"),
              i.addEventListener("click", () => this.fullScreen());
            const r = document.createElement("div");
            r.classList.add("settings-buttons__volume"),
              r.addEventListener("click", () => {
                this.muteVolume(), r.classList.toggle("active-volume");
              });
            const o = document.createElement("div");
            o.classList.add("sprint__close-game"),
              o.addEventListener("click", () => {
                this.closeGame();
              }),
              document.body.append(e),
              e.append(s, a),
              a.append(i, r),
              e.append(o, t),
              t.append(n),
              this.sprintView.runGame(),
              this.sprintView.render();
          }
          closeGame() {
            this.sprintView.stopGameTimer &&
              (this.sprintView.stopGameTimer(),
              (this.sprintView.sprint.countTimerGame = 59),
              (this.sprintView.sprint.score = 0),
              (this.sprintView.sprint.currentQuestion = 0),
              (this.sprintView.sprint.generalScore = 0),
              (this.sprintView.sprint.numberAllAnswers = 0),
              (this.sprintView.sprint.numberOfCorrectAnswers = 0),
              (this.sprintView.sprint.longestChain = 0),
              (this.sprintView.sprint.idLearnWords = []),
              (this.sprintView.sprint.learnWords = [])),
              i.startingPage.render();
          }
          fullScreen() {
            document
              .querySelector(".settings-buttons__fullscreen")
              .classList.toggle("active-fullscreen"),
              document.fullscreenElement
                ? document.exitFullscreen()
                : document.querySelector("main").requestFullscreen();
          }
          muteVolume() {
            (0, a.soundMute)(
              a.rightAnswerSound,
              a.wrongAnswerSound,
              a.victoryGameSound
            );
          }
        })();
      },
      94: (e, t, s) => {
        Object.defineProperty(t, "__esModule", { value: !0 });
        const n = s(257);
        t.default = n.sprintViewWrapper;
      },
      985: (e, t) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.constants = void 0),
          (t.constants = { TOKEN_EXPIRE_TIME: 144e5 });
      },
      48: (e, t) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.getTodayDate = t.removeFromArray = t.getRandomInRange = void 0),
          (t.getRandomInRange = (e = 0, t) =>
            Math.floor(Math.random() * (t - e + 1)) + e),
          (t.removeFromArray = function (e, t) {
            const s = e.indexOf(t);
            -1 != s && e.splice(s, 1);
          }),
          (t.getTodayDate = () => {
            const e = new Date();
            return `${e.getDate()} ${e.getMonth()} ${e.getFullYear()}`;
          });
      },
      927: (e, t) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.soundMute =
            t.soundPlay =
            t.exampleAudio =
            t.meaningAudio =
            t.wordAudio =
            t.victoryGameSound =
            t.wrongAnswerSound =
            t.rightAnswerSound =
              void 0),
          (t.rightAnswerSound = new Audio()),
          (t.wrongAnswerSound = new Audio()),
          (t.victoryGameSound = new Audio()),
          (t.wordAudio = new Audio()),
          (t.meaningAudio = new Audio()),
          (t.exampleAudio = new Audio()),
          (t.rightAnswerSound.src = "../../audio/correct-answer-sound.mp3"),
          (t.wrongAnswerSound.src = "../../audio/incorrect-answer-sound.mp3"),
          (t.victoryGameSound.src =
            "../../audio/pravil-nyy-otvet-krasavchiki.mp3"),
          (t.soundPlay = (e) => {
            e.paused || (e.pause(), (e.currentTime = 0)), e.play();
          }),
          (t.soundMute = (...e) => {
            e.forEach((e) => {
              e.muted ? (e.muted = !1) : (e.muted = !0);
            });
          });
      },
      918: (e, t, s) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.bookPage = void 0);
        const n = s(10),
          a = s(443),
          i = s(470),
          r = s(232),
          o = s(645),
          d = s(187),
          l = s(559),
          c = s(388),
          u = s(161),
          p = s(529);
        t.bookPage = new (class {
          async render() {
            var e, t;
            (document.body.innerHTML = ""),
              document.body.append(n.header.render()),
              n.header.addlisteners(),
              null === (e = document.querySelector(".header__wrapper")) ||
                void 0 === e ||
                e.append(a.startingLoginButton.render()),
              null === (t = document.querySelector(".book-page__link")) ||
                void 0 === t ||
                t.classList.add("active-page");
            const s = document.createElement("main");
            s.classList.add("main");
            const u = document.createElement("div");
            u.classList.add("wrapper"),
              u.classList.add("bookpage-wrapper"),
              s.append(u),
              document.body.append(s);
            const h = document.createElement("div");
            h.classList.add("nav-book");
            const g = document.createElement("div");
            g.classList.add("games-buttons_wrapper"),
              h.append(o.difficultyButtons.render(), i.pagination.render(), g),
              g.append(
                r.gamesNavButtons.renderSprint(),
                r.gamesNavButtons.renderAudioChallenge()
              ),
              u.append(h);
            const m = document.createElement("div");
            m.classList.add("cards-wrapper"),
              u.append(m),
              (
                await l.worldsRepository.all(c.state.page, c.state.group)
              ).forEach((e) => {
                var t, s, n, a, i;
                const r = new d.CardWord(e).render();
                if (c.state.difficultWords.includes(e.id)) {
                  const e = document.createElement("p");
                  null === (t = r.querySelector(".add-difficults__button")) ||
                    void 0 === t ||
                    t.remove(),
                    null ===
                      (s = r.querySelector(".difficult-learned__wrapper")) ||
                      void 0 === s ||
                      s.prepend(e),
                    e.classList.add("difficult-stamp"),
                    (e.textContent = "difficult");
                }
                if (c.state.learnedWords.includes(e.id)) {
                  const e = document.createElement("p");
                  null === (n = r.querySelector(".add-learned__button")) ||
                    void 0 === n ||
                    n.remove(),
                    null ===
                      (a = r.querySelector(".difficult-learned__wrapper")) ||
                      void 0 === a ||
                      a.append(e),
                    e.classList.add("learned-stamp"),
                    (e.textContent = "learned");
                }
                null === (i = r.querySelector(".delete-difficults__button")) ||
                  void 0 === i ||
                  i.remove(),
                  m.append(r);
              }),
              document.body.append(p.footer.render()),
              i.pagination.addListeners();
          }
          async getAllDifficult() {
            const [e] = await u.difficultWordsService.getAllDifficultWords(),
              t = e.paginatedResults.map((e) => e._id);
            return (c.state.difficultWords = [...t]), t;
          }
          async getAllLearned() {
            const [e] = await u.difficultWordsService.getAllLearnedWords(),
              t = e.paginatedResults.map((e) => e._id);
            return (c.state.learnedWords = [...t]), t;
          }
        })();
      },
      187: (e, t, s) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.CardWord = void 0);
        const n = s(161),
          a = s(927),
          i = s(388),
          r = s(122),
          o = s(112),
          d = s(918),
          l = s(48),
          c = s(48);
        t.CardWord = class {
          constructor(e) {
            (this.id = e.id),
              (this.group = e.group),
              (this.page = e.page),
              (this.word = e.word),
              (this.urlImage = e.image),
              (this.urlAudio = e.audio),
              (this.urlAudioMeaning = e.audioMeaning),
              (this.urlAudioExample = e.audioExample),
              (this.textMeaning = e.textMeaning),
              (this.textExample = e.textExample),
              (this.transcription = e.transcription),
              (this.wordTranslate = e.wordTranslate),
              (this.textMeaningTranslate = e.textMeaningTranslate),
              (this.textExampleTranslate = e.textExampleTranslate);
          }
          render() {
            var e, t, s, n;
            const a = document.createElement("div");
            a.classList.add("card-word"),
              a.insertAdjacentHTML(
                "beforeend",
                `\n    <div class="card-word__image">\n      <img src='https://rsslang.herokuapp.com/${this.urlImage}' alt="${this.word} image" >\n    </div>\n    `
              );
            const c = document.createElement("div");
            c.classList.add("card-word__content");
            const u = document.createElement("div");
            u.insertAdjacentHTML(
              "beforeend",
              `\n<p class="word__english">${this.word}</p>\n<p class="word__transcription">${this.transcription}</p>\n<p class="word__russian">${this.wordTranslate}</p>\n`
            ),
              u.classList.add("word-wrapper");
            const p = document.createElement("div");
            p.insertAdjacentHTML(
              "beforeend",
              `\n    <p class="meaning__english">${this.textMeaning}</p>\n        <p class="meaning__russian">${this.textMeaningTranslate}</p>\n`
            ),
              p.classList.add("meaning-wrapper");
            const h = document.createElement("div");
            h.insertAdjacentHTML(
              "beforeend",
              `\n<p class="example__english">${this.textExample}</p>\n<p class="example__russian">${this.textExampleTranslate}</p>\n`
            ),
              h.classList.add("example-wrapper"),
              c.append(u, p, h),
              a.append(c);
            const g = document.createElement("span");
            if (
              (u.append(g),
              g.classList.add("word__audio"),
              g.addEventListener("click", () => this.playAudio()),
              o.storage.isAuthorised)
            ) {
              const a = document.createElement("div");
              a.classList.add("difficult-learned__wrapper");
              const o = new r.Button(
                "add-difficults__button",
                "Сложные",
                () => {
                  this.addToDifficulties(),
                    (0, l.removeFromArray)(i.state.learnedWords, this.id),
                    d.bookPage.render();
                }
              ).render();
              o.classList.add(`${i.state.difficultyColor}`), a.append(o);
              const p = new r.Button("add-learned__button", "Изученные", () => {
                this.addToLearned(),
                  (0, l.removeFromArray)(i.state.difficultWords, this.id),
                  d.bookPage.render();
              }).render();
              p.classList.add(`${i.state.difficultyColor}`),
                a.append(p),
                c.append(a);
              const h = document.createElement("div");
              h.classList.add("correct-answers");
              const g =
                null !==
                  (t =
                    null ===
                      (e =
                        null === i.state || void 0 === i.state
                          ? void 0
                          : i.state.wordsStatistic[this.id]) || void 0 === e
                      ? void 0
                      : e.correct) && void 0 !== t
                  ? t
                  : 0;
              (h.textContent = `${g}`), (h.title = "Верные ответы");
              const m = document.createElement("div");
              m.classList.add("wrong-answers");
              const v =
                null !==
                  (n =
                    null ===
                      (s =
                        null === i.state || void 0 === i.state
                          ? void 0
                          : i.state.wordsStatistic[this.id]) || void 0 === s
                      ? void 0
                      : s.inCorrect) && void 0 !== n
                  ? n
                  : 0;
              (m.textContent = `${v}`),
                (m.title = "Неверные ответы"),
                u.append(h, m);
            }
            return a;
          }
          playAudio() {
            (a.wordAudio.src = `https://rsslang.herokuapp.com/${this.urlAudio}`),
              (a.meaningAudio.src = `https://rsslang.herokuapp.com/${this.urlAudioMeaning}`),
              (a.exampleAudio.src = `https://rsslang.herokuapp.com/${this.urlAudioExample}`),
              (0, a.soundPlay)(a.wordAudio),
              (a.wordAudio.onended = function () {
                (0, a.soundPlay)(a.meaningAudio);
              }),
              (a.meaningAudio.onended = function () {
                (0, a.soundPlay)(a.exampleAudio);
              });
          }
          async addToDifficulties() {
            n.difficultWordsService.createWord(this.id, {
              optional: { isDifficult: "true" },
            }),
              i.state.difficultWords.push(this.id);
          }
          async addToLearned() {
            n.difficultWordsService.createWord(this.id, {
              optional: {
                isLearned: "true",
                dateOfAdding: `${(0, c.getTodayDate)()}`,
              },
            }),
              i.state.learnedWords.push(this.id);
          }
        };
      },
      529: (e, t) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.footer = void 0),
          (t.footer = new (class {
            render() {
              const e = document.createElement("footer");
              return (
                e.insertAdjacentHTML(
                  "beforeend",
                  '\n      <div class="wrapper footer__wrapper">\n        <div class="footer__links">\n            <a href="https://github.com/pavelguest" target="blank" class="github-logo">Павел</a>\n            <a href="https://github.com/DeGusar" target="blank" class="github-logo">Денис</a>\n        </div>\n        <p>2022</p>\n        <a href="https://rs.school/js/" target="blank" class="rss-logo"></a> \n      </div> \n      '
                ),
                e.classList.add("footer"),
                e
              );
            }
          })());
      },
      10: function (e, t, s) {
        var n =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.header = void 0);
        const a = s(388),
          i = s(686),
          r = s(918),
          o = s(745),
          d = s(105),
          l = s(674),
          c = s(112),
          u = s(474),
          p = n(s(94)),
          h = s(824);
        t.header = new (class {
          render() {
            const e = document.createElement("header");
            return (
              e.classList.add("header"),
              e.insertAdjacentHTML(
                "beforeend",
                '\n          <div class="wrapper header__wrapper">\n           \n            <nav class="header__navigation">\n              <ul class="navigation">\n                <li class="navigation__link main-page__link"><a href="#">Главная</a></li>\n                <li class="navigation__link book-page__link"><a href="#">Учебник</a></li>\n                <li class="navigation__link vocabulary-page__link"><a href="#">Словарь</a></li>\n                <li class="navigation__link stats-page__link"><a href="#">Статистика</a></li>\n                <li class="navigation__link games-list">\n                  <a href="#">Игры</a>\n                  <span class="navigation__arrow arrow"></span>\n                  <ul class="sub-menu__list">\n                    <li class="audio-call__link"><a class="sub-menu__link" href="#">Аудиовызов</a></li>\n                    <li class="sprint__link"><a class="sub-menu__link" href="#">Спринт</a></li>\n                  </ul>\n                </li>\n              </ul>\n            </nav>\n          </div>\n          '
              ),
              e
            );
          }
          addlisteners() {
            var e, t, s, n;
            null === (e = document.querySelector(".main-page__link")) ||
              void 0 === e ||
              e.addEventListener("click", () => {
                this.deleteActiveClass(),
                  (a.state.currentPage = "main"),
                  i.startingPage.render();
              }),
              null === (t = document.querySelector(".book-page__link")) ||
                void 0 === t ||
                t.addEventListener("click", () => {
                  this.deleteActiveClass(),
                    (a.state.currentPage = "book"),
                    r.bookPage.render();
                });
            const g = document.querySelector(".vocabulary-page__link"),
              m = document.querySelector(".stats-page__link");
            c.storage.isAuthorised ||
              (null == g || g.classList.add("hidden"),
              null == m || m.classList.add("hidden")),
              null == g ||
                g.addEventListener("click", () => {
                  this.deleteActiveClass(),
                    (a.state.currentPage = "vocabulary"),
                    l.vocabularyPage.render();
                }),
              null == m ||
                m.addEventListener("click", () => {
                  this.deleteActiveClass(),
                    (a.state.currentPage = "stats"),
                    o.statsPage.render();
                }),
              null === (s = document.querySelector(".sprint__link")) ||
                void 0 === s ||
                s.addEventListener("click", () => {
                  "book" === a.state.currentPage
                    ? (u.startGameDelay.awaitStartGameRender(
                        this.sprint.bind(this)
                      ),
                      (p.default.sprintView.sprint.id = "id"),
                      p.default.sprintView.sprint.getWordsArrForBook(
                        a.state.group,
                        a.state.page
                      ))
                    : d.gamePreload.render("sprint");
                }),
              null === (n = document.querySelector(".audio-call__link")) ||
                void 0 === n ||
                n.addEventListener("click", () => {
                  "book" === a.state.currentPage
                    ? (u.startGameDelay.awaitStartGameRender(
                        this.audioCall.bind(this)
                      ),
                      (h.audioCallViewWrapper.audioCallView.audioCall.id =
                        "id"),
                      h.audioCallViewWrapper.audioCallView.audioCall.getWordsArrForBook(
                        a.state.group,
                        a.state.page
                      ))
                    : d.gamePreload.render("audiocall");
                });
          }
          sprint() {
            p.default.render();
          }
          audioCall() {
            h.audioCallViewWrapper.render();
          }
          deleteActiveClass() {
            document
              .querySelectorAll(".navigation__link")
              .forEach((e) => e.classList.remove("active-page"));
          }
        })();
      },
      470: (e, t, s) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.pagination = void 0);
        const n = s(388),
          a = s(918);
        let i = 0;
        t.pagination = new (class {
          render() {
            const e = document.createElement("div");
            return (
              e.classList.add("pagination-wrapper"),
              e.insertAdjacentHTML(
                "beforeend",
                '\n    <button class="paginate left"><i></i><i></i></button>\n    <div class="counter"></div>\n    <button class="paginate right"><i></i><i></i></button>\n    '
              ),
              e
            );
          }
          addListeners() {
            let e = document.querySelector(".paginate.left"),
              t = document.querySelector(".paginate.right");
            null == e ||
              e.addEventListener("click", () => {
                this.slide.bind(this, e, t, -1),
                  n.state.page > 0 && (n.state.page--, a.bookPage.render());
              }),
              t.addEventListener("click", () => {
                this.slide.bind(this, e, t, 1),
                  n.state.page < 29 && (n.state.page++, a.bookPage.render());
              }),
              this.slide(e, t, 0);
          }
          slide(e, t, s) {
            (i = Math.min(Math.max(i + s, 0), 29)),
              (document.querySelector(".counter").innerHTML =
                "Страница  &nbsp" + (n.state.page + 1) + " / 30"),
              e.setAttribute(
                "data-state",
                0 === n.state.page ? "disabled" : ""
              ),
              t.setAttribute(
                "data-state",
                29 === n.state.page ? "disabled" : ""
              );
          }
        })();
      },
      193: (e, t, s) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.renderLoginPopup = void 0);
        const n = s(122),
          a = s(119),
          i = s(112),
          r = s(686),
          o = s(985),
          d = s(918),
          l = s(388),
          c = s(890);
        t.renderLoginPopup = new (class {
          renderLoginForm(e) {
            const t = document.createElement("div");
            t.classList.add("popup-login");
            const s = document.createElement("div");
            s.classList.add("close-popup"),
              t.append(s),
              s.addEventListener("click", () => t.remove());
            const a = document.createElement("div");
            a.classList.add("popup-wrapper"), t.append(a);
            const i = document.createElement("form");
            (i.action = "#"),
              a.append(i),
              i.classList.add("form-login"),
              i.insertAdjacentHTML(
                "beforeend",
                '<input type="email" class="login-email" placeholder="e-mail" required/>\n        <input type="password" class="login-password" pattern="^[a-zA-Z0-9]*$" title="Минимум 8 символов" placeholder="password" minlength="8" required/>\n        <p class="login-error"></p>\n       \n        '
              );
            const r = new n.Button(
              "login-button",
              "login",
              this.login.bind(this)
            ).render();
            i.append(r);
            const o = document.createElement("p");
            o.classList.add("login-text"), (o.textContent = "Not registered?");
            const d = document.createElement("a");
            d.classList.add(".link-login"),
              (d.textContent = "Create an account"),
              o.append(d),
              i.append(o),
              d.addEventListener("click", () => {
                t.remove(), document.body.append(this.RenderCreateForm());
              }),
              e.append(t);
          }
          RenderCreateForm() {
            const e = document.createElement("div");
            e.classList.add("popup-login");
            const t = document.createElement("div");
            t.classList.add("close-popup"),
              e.append(t),
              t.addEventListener("click", () => e.remove());
            const s = document.createElement("div");
            s.classList.add("popup-wrapper"), e.append(s);
            const a = document.createElement("form");
            (a.action = "#"),
              s.append(a),
              a.classList.add("form-create"),
              a.insertAdjacentHTML(
                "beforeend",
                '\n        <input type="text" class="create-name" placeholder="name" required/>\n        <input type="email" class="create-email" placeholder="e-mail" required/>\n        <input type="password" class="create-password" pattern="^[a-zA-Z0-9]*$" placeholder="password" minlength="8" required/>\n        <p class="create-error"></p>\n     '
              );
            const i = new n.Button(
              "create-button",
              "create",
              this.create.bind(this)
            ).render();
            (i.type = "submit"), a.append(i);
            const r = document.createElement("p");
            r.classList.add("login-text"),
              (r.textContent = "Already registered?");
            const o = document.createElement("a");
            return (
              o.classList.add(".link-create"),
              (o.textContent = "Sign In"),
              r.append(o),
              a.append(r),
              o.addEventListener("click", () => {
                e.remove(), this.renderLoginForm(document.body);
              }),
              e
            );
          }
          async login() {
            const e = document.querySelector(".login-email"),
              t = e.value,
              s = document.querySelector(".login-password"),
              n = s.value;
            if (e.checkValidity() && s.checkValidity()) {
              null === event || void 0 === event || event.preventDefault();
              const e = await a.authorisation.login(t, n);
              if (200 === e.status) {
                const t = await e.json();
                (i.storage.token = t.token),
                  (i.storage.refreshToken = t.refreshToken),
                  (i.storage.idUser = t.userId),
                  (i.storage.name = t.name),
                  (i.storage.isAuthorised = !0),
                  (i.storage.tokenExpirationDate =
                    Date.now() + o.constants.TOKEN_EXPIRE_TIME),
                  i.storage.save(),
                  (l.state.gamesStatistic = {}),
                  c.storageStatistic.getStatisticData(),
                  r.startingPage.render(),
                  await d.bookPage.getAllDifficult(),
                  d.bookPage.getAllLearned();
              } else
                (404 !== e.status && 403 !== e.status) ||
                  ((document.querySelector(".login-error").innerHTML =
                    "Wrong e-mail or password"),
                  window.setTimeout(
                    () =>
                      (document.querySelector(".login-error").innerHTML = ""),
                    3e3
                  ));
            }
          }
          async create() {
            var e;
            const t = document.querySelector(".create-name"),
              s = t.value,
              n = document.querySelector(".create-email"),
              i = n.value,
              r = document.querySelector(".create-password"),
              o = r.value;
            if (t.checkValidity() && n.checkValidity() && r.checkValidity()) {
              const t = await a.authorisation.createUser(s, i, o);
              200 === t.status
                ? (null === (e = document.querySelector(".popup-login")) ||
                    void 0 === e ||
                    e.remove(),
                  this.renderLoginForm(document.body))
                : 417 === t.status &&
                  ((document.querySelector(".create-error").innerHTML =
                    "User with this e-mail exists"),
                  window.setTimeout(
                    () =>
                      (document.querySelector(".create-error").innerHTML = ""),
                    3e3
                  ));
            }
          }
        })();
      },
      686: (e, t, s) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.startingPage = void 0);
        const n = s(443),
          a = s(10),
          i = s(529);
        t.startingPage = new (class {
          constructor() {
            this.body = document.body;
          }
          render() {
            var e, t;
            (this.body.innerHTML = ""),
              this.body.append(a.header.render()),
              a.header.addlisteners(),
              null === (e = document.querySelector(".header__wrapper")) ||
                void 0 === e ||
                e.append(n.startingLoginButton.render()),
              null === (t = document.querySelector(".main-page__link")) ||
                void 0 === t ||
                t.classList.add("active-page");
            const s = document.createElement("main");
            s.classList.add("main");
            const r = document.createElement("div");
            r.classList.add("wrapper"), s.append(r), document.body.append(s);
            const o = document.createElement("div"),
              d = document.createElement("div"),
              l = document.createElement("div");
            r.append(o),
              r.append(d),
              r.append(l),
              o.insertAdjacentHTML(
                "beforeend",
                '\n    <div class="app-main__container">\n    <h1>RS LANG</h1>\n    <p>Маленькими шагами мы достигаем больших результатов. Присоединяйся к обучению</p>\n    </div>\n    '
              ),
              d.insertAdjacentHTML(
                "beforeend",
                '\n      <div class="app-info__container">\n      <h2 class="team-title">О приложении</h2>\n      <div class="app-info__wrapper">\n      <div class="app-info__chapter">\n      <div class="pavel-photo">\n          <img src="./images/textbook1.jpg" alt="Pavel photo" />\n        </div>\n        <div class="pavel-content">\n          <h3 class="pavel-title">Учебник</h3>\n          <div class="pavel-responsibilities">\n          Учебник состоит из шести разделов. В каждом разделе 30 страниц по 20 слов. Представлены перевод слова, тематическое изображение, а также произношение как слова отдельно, так и в составе словосочетания.\n          </div>\n        </div>\n      </div>\n      <div class="app-info__chapter">\n      <div class="pavel-photo">\n          <img src="./images/dictionary1.jpg" alt="Pavel photo" />\n        </div>\n        <div class="pavel-content">\n          <h3 class="pavel-title">Словарь</h3>\n          <div class="pavel-responsibilities">\n          Словарь содержит списки изучаемых слов, которые вызывают затруднения.\n          </div>\n        </div>\n      </div>\n      <div class="app-info__chapter">\n      <div class="pavel-photo">\n          <img src="./images/games1.jpg" alt="Pavel photo" />\n        </div>\n        <div class="pavel-content">\n          <h3 class="pavel-title">Игры</h3>\n          <div class="pavel-responsibilities">\n          В этом разделе есть 2 игры: Спринт и Аудиовызов, которые помогут вам в игровой форме закрепить знания и пополнить словарный запас.\n          </div>\n        </div>\n      </div>\n      <div class="app-info__chapter">\n      <div class="pavel-photo">\n          <img src="./images/statistic1.jpg" alt="Pavel photo" />\n        </div>\n        <div class="pavel-content">\n          <h3 class="pavel-title">Статистика</h3>\n          <div class="pavel-responsibilities">\n            В этом разделе можно увидеть весь прогресс обучения, где представлены данные за текущий день. Краткосрочная информация о мини-играх и о словах.\n        </div>\n      </div>\n      </div>\n      \n      </div>\n    '
              ),
              l.insertAdjacentHTML(
                "beforeend",
                '\n    <div class="team-container">\n    <h2 class="team-title">О команде</h2>\n    <div class="team-wrapper">\n      <div class="team-pavel">\n        <div class="pavel-photo">\n          <img src="./images/Pavel.jpg" alt="Pavel photo" />\n        </div>\n        <div class="pavel-content">\n          <h3 class="pavel-title">Пучинский Павел</h3>\n          <div class="pavel-link">\n            <span class="pavel-github"></span\n            ><a href="https://github.com/pavelguest">pavelguest</a>\n          </div>\n          <p class="pavel-position">Разработчик</p>\n          <div class="pavel-responsibilities">\n            Создал игры Спринт и Аудиовызов, реализовал логику новых слов,\n            изученных слов, статистики. Принимал участие в создании стартовой\n            страницы\n          </div>\n        </div>\n      </div>\n      <div class="team-denis">\n        <div class="denis-photo">\n          <img src="./images/Denis.jpg" alt="Denis photo" />\n        </div>\n        <div class="denis-content">\n          <h3 class="denis-title">Гусарь Денис</h3>\n          <div class="denis-link">\n            <a class="denis-link" href="https://github.com/DeGusar"><span class="denis-github"></span>DeGusar</a>\n          </div>\n          <p class="pavel-position">Разработчик</p>\n          <div class="pavel-responsibilities">\n            Отвечал за создание электронного учебника, сложных слов, за\n            навигацию по разделам, страницам учебника. Реализовал регистрацию\n            и авторизацию пользователя. Автор дизайна страницы со статистикой,\n            принимал участие в создании стартовой страницы\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n    '
              ),
              this.body.append(i.footer.render());
          }
        })();
      },
      745: (e, t, s) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.statsPage = void 0);
        const n = s(10),
          a = s(443),
          i = s(529),
          r = s(388),
          o = s(48),
          d = s(161);
        t.statsPage = new (class {
          async render() {
            var e, t, s, d, l, c, u, p;
            const h = await this.getAllLearnedDaily();
            (document.body.innerHTML = ""),
              document.body.append(n.header.render()),
              n.header.addlisteners(),
              null === (e = document.querySelector(".header__wrapper")) ||
                void 0 === e ||
                e.append(a.startingLoginButton.render()),
              null === (t = document.querySelector(".stats-page__link")) ||
                void 0 === t ||
                t.classList.add("active-page");
            const g = document.createElement("main");
            g.classList.add("main"), g.classList.add("stats-main");
            const m = document.createElement("div");
            m.classList.add("wrapper"), g.append(m), document.body.append(g);
            const v = document.createElement("h2");
            v.classList.add("stats-title"),
              (v.textContent = "Статистика за сегодня"),
              m.append(v);
            const w = document.createElement("div");
            w.classList.add("stats-content__wrapper"),
              w.insertAdjacentHTML(
                "beforeend",
                `\n      <div class="stats-global">\n      <div class="stats-global__learned">\n        <h3>\n          <b>${h}</b>\n        </h3>\n        <p>Изученных слов</p>\n      </div>\n      <div class="stats-global__new">\n        <h3>\n          <b>${
                  (r.state.newAudioCallWords.size
                    ? r.state.newAudioCallWords.size
                    : 0) +
                  (r.state.newSprintWords.size
                    ? r.state.newSprintWords.size
                    : 0)
                }</b>\n        </h3>\n        <p>Новых слов</p>\n      </div>\n      <div class="stats-global__accuracy">\n        <p>Правильных ответов</p>\n        <div class="progress-circle p${this.getAllStatAccuracy()} ${
                  +this.getAllStatAccuracy() > 50 ? "over50" : ""
                }">\n          <span>${this.getAllStatAccuracy()}%</span>\n          <div class="left-half-clipper">\n            <div class="first50-bar"></div>\n            <div class="value-bar"></div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class="stats-games__wrapper">\n    <h2>Спринт</h2>\n      <div class="stats-sprint">\n      \n        <div class="stats-sprint__new">\n          <h3>\n            <b>${
                  r.state.newSprintWords.size ? r.state.newSprintWords.size : 0
                }</b>\n          </h3>\n          <p>Новых слов</p>\n        </div>\n        <div class="stats-sprint__streak">\n          <h3>\n            <b>${
                  null !==
                    (l =
                      null ===
                        (d =
                          null ===
                            (s =
                              r.state.gamesStatistic[(0, o.getTodayDate)()]) ||
                          void 0 === s
                            ? void 0
                            : s.sprint) || void 0 === d
                        ? void 0
                        : d.chain) && void 0 !== l
                    ? l
                    : 0
                }</b>\n          </h3>\n          <p>Серия правильных ответов</p>\n        </div>\n        <div class="stats-sprint__accuracy">\n          <p>Правильных ответов</p>\n          <div class="progress-circle p${this.getSprintAccuracyStat()} ${
                  +this.getSprintAccuracyStat() > 50 ? "over50" : ""
                }">\n            <span>${this.getSprintAccuracyStat()}%</span>\n            <div class="left-half-clipper">\n              <div class="first50-bar"></div>\n              <div class="value-bar"></div>\n            </div>\n          </div>\n        </div>\n      </div>\n      <h2>Аудиовызов</h2>\n        <div class="stats-audiochallenge">\n        \n          <div class="stats-audiochallenge__new">\n            <h3>\n              <b>${
                  r.state.newAudioCallWords.size
                    ? r.state.newAudioCallWords.size
                    : 0
                }</b>\n            </h3>\n            <p>Новых слов</p>\n          </div>\n          <div class="stats-audiochallenge__streak">\n            <h3>\n              <b>${
                  null !==
                    (p =
                      null ===
                        (u =
                          null ===
                            (c =
                              r.state.gamesStatistic[(0, o.getTodayDate)()]) ||
                          void 0 === c
                            ? void 0
                            : c.audioCall) || void 0 === u
                        ? void 0
                        : u.chain) && void 0 !== p
                    ? p
                    : 0
                }</b>\n            </h3>\n            <p>Серия правильных ответов</p>\n          </div>\n          <div class="stats-audiochallenge__accuracy">\n            <p>Правильных ответов</p>\n            <div class="progress-circle p${this.getAudioCallAccuracyStat()} ${
                  +this.getAudioCallAccuracyStat() > 50 ? "over50" : ""
                }">\n              <span>${this.getAudioCallAccuracyStat()}%</span>\n              <div class="left-half-clipper">\n                <div class="first50-bar"></div>\n                <div class="value-bar"></div>\n              </div>\n            </div>\n          </div>\n      </div>\n    </div>\n    `
              ),
              m.append(w),
              document.body.append(i.footer.render());
          }
          getSprintAccuracyStat() {
            var e, t, s, n, a, i;
            const d =
                null !==
                  (s =
                    null ===
                      (t =
                        null ===
                          (e = r.state.gamesStatistic[(0, o.getTodayDate)()]) ||
                        void 0 === e
                          ? void 0
                          : e.sprint) || void 0 === t
                      ? void 0
                      : t.numberCorrectAnswer) && void 0 !== s
                  ? s
                  : 0,
              l =
                null !==
                  (i =
                    null ===
                      (a =
                        null ===
                          (n = r.state.gamesStatistic[(0, o.getTodayDate)()]) ||
                        void 0 === n
                          ? void 0
                          : n.sprint) || void 0 === a
                      ? void 0
                      : a.numberAllAnswer) && void 0 !== i
                  ? i
                  : 0;
            return 0 === d ? 0 : ((d / l) * 100).toFixed();
          }
          getAudioCallAccuracyStat() {
            var e, t, s, n, a, i;
            const d =
                null !==
                  (s =
                    null ===
                      (t =
                        null ===
                          (e = r.state.gamesStatistic[(0, o.getTodayDate)()]) ||
                        void 0 === e
                          ? void 0
                          : e.audioCall) || void 0 === t
                      ? void 0
                      : t.numberCorrectAnswer) && void 0 !== s
                  ? s
                  : 0,
              l =
                null !==
                  (i =
                    null ===
                      (a =
                        null ===
                          (n = r.state.gamesStatistic[(0, o.getTodayDate)()]) ||
                        void 0 === n
                          ? void 0
                          : n.audioCall) || void 0 === a
                      ? void 0
                      : a.numberAllAnswer) && void 0 !== i
                  ? i
                  : 0;
            return 0 === d ? 0 : ((d / l) * 100).toFixed();
          }
          getAllStatAccuracy() {
            var e, t, s, n, a, i, d, l, c, u, p, h;
            const g =
                null !==
                  (s =
                    null ===
                      (t =
                        null ===
                          (e = r.state.gamesStatistic[(0, o.getTodayDate)()]) ||
                        void 0 === e
                          ? void 0
                          : e.sprint) || void 0 === t
                      ? void 0
                      : t.numberCorrectAnswer) && void 0 !== s
                  ? s
                  : 0,
              m =
                null !==
                  (i =
                    null ===
                      (a =
                        null ===
                          (n = r.state.gamesStatistic[(0, o.getTodayDate)()]) ||
                        void 0 === n
                          ? void 0
                          : n.sprint) || void 0 === a
                      ? void 0
                      : a.numberAllAnswer) && void 0 !== i
                  ? i
                  : 0,
              v =
                null !==
                  (c =
                    null ===
                      (l =
                        null ===
                          (d = r.state.gamesStatistic[(0, o.getTodayDate)()]) ||
                        void 0 === d
                          ? void 0
                          : d.audioCall) || void 0 === l
                      ? void 0
                      : l.numberCorrectAnswer) && void 0 !== c
                  ? c
                  : 0,
              w =
                null !==
                  (h =
                    null ===
                      (p =
                        null ===
                          (u = r.state.gamesStatistic[(0, o.getTodayDate)()]) ||
                        void 0 === u
                          ? void 0
                          : u.audioCall) || void 0 === p
                      ? void 0
                      : p.numberAllAnswer) && void 0 !== h
                  ? h
                  : 0;
            let _;
            return (
              (_ =
                w && m
                  ? (((v + g) / (w + m)) * 100).toFixed()
                  : w
                  ? ((v / w) * 100).toFixed()
                  : m
                  ? ((g / m) * 100).toFixed()
                  : 0),
              _
            );
          }
          async getAllLearnedDaily() {
            const [e] = await d.difficultWordsService.getAllLearnedWordsDaily();
            return e.paginatedResults.map((e) => e._id).length;
          }
        })();
      },
      674: (e, t, s) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.vocabularyPage = void 0);
        const n = s(10),
          a = s(443),
          i = s(161),
          r = s(187),
          o = s(388),
          d = s(48),
          l = s(122),
          c = s(529);
        t.vocabularyPage = new (class {
          async render() {
            var e, t;
            (document.body.innerHTML = ""),
              document.body.append(n.header.render()),
              n.header.addlisteners(),
              null === (e = document.querySelector(".header__wrapper")) ||
                void 0 === e ||
                e.append(a.startingLoginButton.render()),
              null === (t = document.querySelector(".vocabulary-page__link")) ||
                void 0 === t ||
                t.classList.add("active-page");
            const s = document.createElement("main");
            s.classList.add("main");
            const i = document.createElement("div");
            i.classList.add("wrapper"), s.append(i), document.body.append(s);
            const o = document.createElement("div");
            o.classList.add("cards-wrapper"),
              i.append(o),
              (await this.getAllDifficult()).forEach((e) => {
                var t, s, n;
                const a = new r.CardWord(e).render();
                null === (t = a.querySelector(".add-difficults__button")) ||
                  void 0 === t ||
                  t.remove(),
                  null === (s = a.querySelector(".add-learned__button")) ||
                    void 0 === s ||
                    s.remove();
                const i = new l.Button(
                  "delete-difficults__button",
                  "Удалить",
                  () => {
                    this.removeFromDifficult(e._id);
                  }
                ).render();
                null === (n = a.querySelector(".difficult-learned__wrapper")) ||
                  void 0 === n ||
                  n.append(i),
                  o.append(a);
              }),
              document.body.append(c.footer.render());
          }
          async getAllDifficult() {
            const [e] = await i.difficultWordsService.getAllDifficultWords();
            return e.paginatedResults;
          }
          async removeFromDifficult(e) {
            await i.difficultWordsService.deleteFromDifficult(e),
              (0, d.removeFromArray)(o.state.difficultWords, e),
              this.render();
          }
        })();
      },
      119: (e, t, s) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.authorisation = void 0);
        const n = s(112),
          a = s(985),
          i = s(443);
        t.authorisation = new (class {
          constructor() {
            (this.baseUrl = "https://rsslang.herokuapp.com"),
              (this.usersUrl = `${this.baseUrl}/users`);
          }
          async createUser(e, t, s) {
            return fetch(`${this.usersUrl}`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ name: e, email: t, password: s }),
            });
          }
          async login(e, t) {
            return fetch(`${this.baseUrl}/signin`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email: e, password: t }),
            });
          }
          logout() {
            n.storage.logout();
          }
          async fetchWithRefreshingToken(e, t) {
            if (Date.now() < n.storage.tokenExpirationDate) return fetch(e, t);
            try {
              const e = await fetch(
                  `${this.usersUrl}/${n.storage.idUser}/tokens`,
                  {
                    method: "GET",
                    headers: {
                      Authorization: `Bearer ${n.storage.refreshToken}`,
                    },
                  }
                ),
                { token: t, refreshToken: s } = await e.json();
              (n.storage.token = t),
                (n.storage.refreshToken = s),
                (n.storage.tokenExpirationDate =
                  Date.now() + a.constants.TOKEN_EXPIRE_TIME),
                n.storage.save();
            } catch (e) {
              i.startingLoginButton.logout();
            }
            return fetch(e, t);
          }
        })();
      },
      161: (e, t, s) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.difficultWordsService = void 0);
        const n = s(112),
          a = s(119),
          i = s(388),
          r = s(48);
        t.difficultWordsService = new (class {
          constructor() {
            this.baseUrl = "https://rsslang.herokuapp.com";
          }
          async createWord(e, t) {
            try {
              const s = await a.authorisation.fetchWithRefreshingToken(
                `${this.baseUrl}/users/${n.storage.idUser}/words/${e}`,
                {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${n.storage.token}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(t),
                }
              );
              throw new Error(String(s.status));
            } catch (s) {
              await a.authorisation.fetchWithRefreshingToken(
                `${this.baseUrl}/users/${n.storage.idUser}/words/${e}`,
                {
                  method: "PUT",
                  headers: {
                    Authorization: `Bearer ${n.storage.token}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(t),
                }
              );
            }
          }
          async getAllDifficultWords() {
            const e = await a.authorisation.fetchWithRefreshingToken(
              `${this.baseUrl}/users/${n.storage.idUser}/aggregatedWords?wordsPerPage=4000&filter={"userWord.optional.isDifficult": "true"}`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${n.storage.token}`,
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              }
            );
            return await e.json();
          }
          async getAllLearnedWords() {
            const e = await a.authorisation.fetchWithRefreshingToken(
              `${this.baseUrl}/users/${n.storage.idUser}/aggregatedWords?wordsPerPage=4000&filter={"userWord.optional.isLearned": "true"}`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${n.storage.token}`,
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              }
            );
            return await e.json();
          }
          async getAllUserNoLearnedWords() {
            const e = await a.authorisation.fetchWithRefreshingToken(
              `${this.baseUrl}/users/${n.storage.idUser}/aggregatedWords?wordsPerPage=1000&filter={"$and":[{"group": ${i.state.group}}]}`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${n.storage.token}`,
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              }
            );
            return (await e.json())[0].paginatedResults;
          }
          async getAllLearnedWordsDaily() {
            const e = await a.authorisation.fetchWithRefreshingToken(
              `${this.baseUrl}/users/${
                n.storage.idUser
              }/aggregatedWords?wordsPerPage=4000&filter={"$and":[{"userWord.optional.isLearned": "true"},{"userWord.optional.dateOfAdding": "${(0,
              r.getTodayDate)()}"}]}`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${n.storage.token}`,
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              }
            );
            return await e.json();
          }
          async deleteFromDifficult(e) {
            await a.authorisation.fetchWithRefreshingToken(
              `${this.baseUrl}/users/${n.storage.idUser}/words/${e}`,
              {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${n.storage.token}`,
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              }
            );
          }
        })();
      },
      559: (e, t, s) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.worldsRepository = void 0);
        const n = s(112),
          a = s(119);
        t.worldsRepository = new (class {
          constructor() {
            (this.baseUrl = "https://rsslang.herokuapp.com"),
              (this.words = `${this.baseUrl}/words`);
          }
          async all(e = 0, t = 0) {
            return await (
              await fetch(`${this.words}?page=${e}&group=${t}`)
            ).json();
          }
          async get(e) {
            return await (await fetch(`${this.words}/${e}`)).json();
          }
          async allWordsAuthorised(e, t) {
            const s = await a.authorisation.fetchWithRefreshingToken(
              `${this.baseUrl}/users/${n.storage.idUser}/aggregatedWords?group=${t}&page=${e}&wordsPerPage=20`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${n.storage.token}`,
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              }
            );
            return await s.json();
          }
        })();
      },
      112: (e, t) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.storage = void 0),
          (t.storage = new (class {
            constructor(e) {
              var t, s, n, a, i, r;
              (this.idUser =
                null !== (t = null == e ? void 0 : e.idUser) && void 0 !== t
                  ? t
                  : null),
                (this.name =
                  null !== (s = null == e ? void 0 : e.name) && void 0 !== s
                    ? s
                    : null),
                (this.token =
                  null !== (n = null == e ? void 0 : e.token) && void 0 !== n
                    ? n
                    : null),
                (this.refreshToken =
                  null !== (a = null == e ? void 0 : e.refreshToken) &&
                  void 0 !== a
                    ? a
                    : null),
                (this.isAuthorised =
                  null !== (i = null == e ? void 0 : e.isAuthorised) &&
                  void 0 !== i &&
                  i),
                (this.tokenExpirationDate =
                  null !== (r = e.tokenExpirationDate) && void 0 !== r ? r : 0);
            }
            save() {
              localStorage.setItem("rsLangTeam26", JSON.stringify(this));
            }
            logout() {
              delete this.idUser,
                delete this.name,
                delete this.token,
                delete this.refreshToken,
                (this.tokenExpirationDate = 0),
                (this.isAuthorised = !1),
                this.save();
            }
          })(JSON.parse(localStorage.getItem("rsLangTeam26") || "{}")));
      },
      388: (e, t) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.state = void 0),
          (t.state = {
            currentPage: "main",
            group: 0,
            page: 0,
            difficultyColor: "green",
            wordsArr: [],
            difficultWords: [],
            learnedWords: [],
            gamesStatistic: {},
            wordsStatistic: {},
          });
      },
      708: (e, t) => {
        Object.defineProperty(t, "__esModule", { value: !0 });
      },
    },
    t = {};
  function s(n) {
    var a = t[n];
    if (void 0 !== a) return a.exports;
    var i = (t[n] = { exports: {} });
    return e[n].call(i.exports, i, i.exports, s), i.exports;
  }
  (s.r = (e) => {
    "undefined" != typeof Symbol &&
      Symbol.toStringTag &&
      Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
      Object.defineProperty(e, "__esModule", { value: !0 });
  }),
    s(983),
    s(708),
    s(388),
    s(985),
    s(94),
    s(843),
    s(559),
    s(119),
    s(161),
    s(112),
    s(122),
    s(193),
    s(686),
    s(529),
    s(443),
    s(232),
    s(645),
    s(187),
    s(458),
    s(130),
    s(824),
    s(474),
    s(805);
})();
