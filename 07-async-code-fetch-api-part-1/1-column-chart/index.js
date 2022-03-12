import fetchJson from './utils/fetch-json.js';


const BACKEND_URL = 'https://course-js.javascript.ru';

export default class ColumnChart {
  element;
  subElements = {};
  chartHeight = 50;

  constructor({label = '', url = '', link= '', value = 0, range = {from: new Date, to: new Date} , formatHeading = data => data} = {}) {
    this.url = new URL(url, BACKEND_URL);
    this.range = range;
    this.label = label;
    this.link = link;
    this.formatHeading = formatHeading;

    this.render();
    this.update(this.range.from, this.range.to).then();
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = this.template;
    this.element = wrapper.firstElementChild;
    this.subElements = this.getSubElements(this.element);
  }

  getHeaderValue(data) {
    return this.formatHeading(Object.values(data).reduce((acc, item)=>(acc + item),0))
  }

  async update(from, to) {
    this.element.classList.add('column-chart__loading');

    const data = await this.loadData(from, to);
    this.setNewRange(from, to);

    if(data && Object.values(data).length){

      this.subElements.header.textContent = this.getHeaderValue(data);
      this.subElements.body.innerHTML = this.getColumnBody(data);
      this.element.classList.remove('column-chart__loading');
    }

    this.data = data;


    return this.data;

  }
  async loadData(from, to) {
    this.url.searchParams.set('from', from.toISOString());
    this.url.searchParams.set('to', to.toISOString());
    return await fetchJson(this.url);
  }

  get template() {
    return `
        <div class="column-chart" style="--chart-height: ${this.chartHeight}">
          <div class="column-chart__title">
            Total orders ${this.label}
            ${this.getLink()}
          </div>
          <div class="column-chart__container">
            <div data-element="header" class="column-chart__header">${this.value}</div>
            <div data-element="body" class="column-chart__chart">
            </div>
          </div>
        </div>
    `
  }

  getColumnBody(data) {

    const maxValue = Math.max(...Object.values(data));

    return Object.entries(data).map(([key,value]) => {
      const scale = this.chartHeight / maxValue;
      const percent = (value / maxValue * 100).toFixed(0);
      return `<div style="--value: ${Math.floor(value * scale)}" data-tooltip="${percent}%"></div>`})
      .join('');
  }

  getLink() {
    return this.link ? `<a class="column-chart__link" href="${this.link}">View all</a>` : '';
  }

  getSubElements() {
    const elements = this.element.querySelectorAll('[data-element]');

    return [...elements].reduce((acc, item) => {
      acc[item.dataset.element] = item;
      return acc;
    },{})
  }

  setNewRange(from, to) {
    this.range.from = from;
    this.range.to = to;
  }

  remove() {
    this.element.remove()
  }

  destroy() {
    this.remove()
  }
}
