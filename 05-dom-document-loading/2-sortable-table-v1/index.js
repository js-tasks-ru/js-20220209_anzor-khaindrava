export default class SortableTable {
  element;
  subElements = {};

  constructor(headerConfig = [], data = []) {
    this.config = headerConfig;
    this.data = data;
    this.render();
  }


  getTableHeaderRow({id, tittle, sortable}) {
    return `
      <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}" data-order="asc">
        <span>${tittle}</span>
        <span data-element="arrow" class="sortable-table__sort-arrow">
          <span class="sort-arrow"></span>
        </span>
      </div>
    `
  }

  getTableHeader() {
    return `
        <div data-element="header" class="sortable-table__header sortable-table__row">
            ${this.config.map((element) => {this.getTableHeaderRow(element)}).join('')}
        </div>
    `
  }

  getTableBody() {
    return `
        <div data-element="body" class="sortable-table__body">
            ${this.getTableRows(this.data)}
        </div>
    `
  }
  getTableRows(data){
    return data.map((element)=>{
      `
        <a href="/products/${element.id})" class="sortable-table__row">
            ${this.getTableRow(element)}
        </a>
      `
    })
  }

  getTableRow(element){
    const cells = this.config.map(({id, template})=>{
      return {
        id,
        template
      };
    });

    return cells.map(({id, template}) => {
        return template
          ? template(element[id])
          : `<div class="sortable-table__cell">${element[id]}</div>`
    }).join('');
  }

  getTable() {
    return `
      <div class="sortable-table">
        ${this.getTableHeader()}
        ${this.getTableBody()}
      </div>
    `
  }



  render() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = this.getTable();
    const element = wrapper.firstElementChild;
    this.element = element;
    this.subElements = this.getSubElements(element)
  }
  remove() {
    if(this.element){
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
    this.subElements = {};

  }

  getSubElements(element) {
    const result = {};
    const elements = element.querySelectorAll(`[data-element]`);
    elements.forEach((subElement)=>{
      const name = subElement.dataset.element;
      result[name] = subElement;
    })
    return result;
  }

  sort(field, order) {
    const sortedData = this.sortData(field, order);
    const allColumns = this.element.querySelectorAll('.sortable-table__cell[data-id]')
    const curColumn = this.element.querySelectorAll(`.sortable-table__cell[data-id=${field}]`)
  }

  sortData(field, order) {
    const arr = [...this.data]
    const col = this.config.find(item => item.id === field)

  }

}

