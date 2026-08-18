class Footer {
  render() {
    const footer = document.createElement('footer');
    footer.insertAdjacentHTML(
      'beforeend',
      `
      <div class="wrapper footer__wrapper">
        <div class="footer__links">
            <a href="https://github.com/pavelguest" target="blank" class="github-logo">Павел</a>
            <a href="https://github.com/DeGusar" target="blank" class="github-logo">Денис</a>
        </div>
        <p>2022</p>
        <a href="https://rs.school/js/" target="blank" class="rss-logo"></a> 
      </div> 
      `
    );
    footer.classList.add('footer');
    return footer;
  }
}
export const footer = new Footer();
