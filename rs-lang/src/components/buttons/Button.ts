export class Button {
  callback: (event: MouseEvent) => void;
  buttonClass: string;
  text: string;
  constructor(
    buttonClass: string,
    text: string,
    callback: (event: MouseEvent) => void
  ) {
    this.buttonClass = buttonClass;
    this.text = text;
    this.callback = callback;
  }
  render() {
    const button: HTMLButtonElement = document.createElement('button');
    button.classList.add('button');
    button.classList.add(`${this.buttonClass}`);
    button.type = 'button';
    button.textContent = this.text;
    button.addEventListener('click', this.callback);
    return button;
  }
}
