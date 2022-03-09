class Tooltip {
  static instance;
  element;

  onPointerOver = (event) => {
    const element = event.target.closest('[data-tooltip]');

    if(element) {
      this.render(element.dataset.tooltip);
      document.addEventListener('pointermove', this.onPointerMove);
    }
  }

  onPointerMove = (event) => {
    this.moveToolTip(event);
  }

  onPointerOut = () => {
    this.remove();
    removeEventListener('pointermove', this.onPointerMove);
  }

  constructor() {
    if(Tooltip.instance){
      return Tooltip.instance;
    }
    Tooltip.instance = this;
  }

  initialize () {
    return this.initEventListener();
  }

  initEventListener() {
    document.addEventListener('pointerover', this.onPointerOver);
    document.addEventListener('pointerout', this.onPointerOut);
  }

  moveToolTip(event) {
    const margin = 10;
    const left = event.clientX + margin;
    const top = event.clientY + margin;

    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;
  }

  remove() {
    if(this.element) {
      this.element.remove();
    }
  }

  render(html) {
    this.element = document.createElement('div');
    this.element.className = "tooltip";
    this.element.innerHTML = html;
    document.body.append(this.element)
  }

  destroy() {
    document.removeEventListener('pointerover', this.onPointerOver);
    document.removeEventListener('pointerout', this.onPointerOut);
    document.removeEventListener('pointermove', this.onPointerMove);
    this.remove();
    this.element = null;
  }
}

export default Tooltip;
