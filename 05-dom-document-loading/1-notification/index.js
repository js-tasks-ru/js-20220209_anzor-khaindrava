export default class NotificationMessage {
  static activeNotification;
  element;
  timerId;

  constructor(phrase = '', {duration= 0, type = 'success'} = {}) {
    this.phrase = phrase;
    this.duration = duration;
    this.type = type;
    this.render();

  }
  show(parent = document.body) {
    if (NotificationMessage.activeNotification) {
      NotificationMessage.activeNotification.remove();
    }
    parent.append(this.element);
    this.timerId = setTimeout(()=>{
      this.remove();
    },this.duration)

    NotificationMessage.activeNotification = this;
  }

  get template() {
    return `
      <div class="notification ${this.type}" style="--value:${this.duration/1000}s">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">${this.type}</div>
          <div class="notification-body">
            ${this.phrase}
          </div>
        </div>
      </div>
    `
  }

  render() {
    const notif = document.createElement('div');
    notif.innerHTML = this.template;
    this.element = notif.firstElementChild;
  }
  destroy() {
    this.remove();
    this.element = null;
    NotificationMessage.activeNotification = null;
  }
  remove() {
    clearTimeout(this.timerId);
    if(this.element) {
      this.element.remove();
    }
  }
}
