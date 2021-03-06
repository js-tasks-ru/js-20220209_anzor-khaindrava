export default class SortableTable {
  element;
  subElements = {};

  onSortClick = event => {
    const col = event.target.closest('[data-sortable="true"]')
    const togglerOrder = order => {
      const orders = {
        asc: 'asc',
        desc: 'desc'
      };
      return orders[order];
    };
    if(col) {
      const {id, order} = col.dataset;
      const newOrder = togglerOrder(order);
      const sortedData = this.sortData();
    }
  }



  constructor(headerConfig, {...data}) {
    this.isSortLocally = isSortLocally;
    this.config = headerConfig;
    this.data = data;
    this.render();
  }

  getTableHeader() {
    return `
        <div data-element="header" class="sortable-table__header sortable-table__row">
            ${this.config.map((element) => {
      return this.getTableHeaderRow(element)
    }).join('')}
        </div>
    `
  }

  getTableHeaderRow({id, title, sortable}) {
    return `
      <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}">
        <span>${title}</span>
        <span data-element="arrow" class="sortable-table__sort-arrow">
          <span class="sort-arrow"></span>
        </span>
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
      return `<a href="/products/${element.id})" class="sortable-table__row">${this.getTableRow(element)}</a>`
    }).join('');
  }

  getTableRow(element){
    const cells = this.config.map(({id, template})=>{
      return {
        id,
        template
      };
    });

    return cells.map(({id, template}) => {
      return template ? template(element[id]) : `<div class="sortable-table__cell">${element[id]}</div>`}).join('');
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
    console.log(this.subElements)
    document.querySelector('.root').append()
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

  sortOnClient(field, order) {
    const sortedData = this.sortData(field, order);
    const allColumns = this.element.querySelectorAll('.sortable-table__cell[data-id]');
    const curColumn = this.element.querySelector(`.sortable-table__cell[data-id="${field}"]`);

    allColumns.forEach((col) => {
      col.dataset.order = '';
    });

    curColumn.dataset.order = order;

    this.subElements.body.innerHTML = this.getTableRows(sortedData);
  }

  sortOnServer() {

  }

  sort() {
    if (this.isSortLocally) {
      this.sortOnClient();
    } else {
      this.sortOnServer();
    }
  }

  sortData(field, order) {
    const arr = [...this.data]
    const col = this.config.find(item => item.id === field)

    const { sortType } = col;
    const directions = {
      asc: 1,
      desc: -1,
    };

    const direction = directions[order];
    return arr.sort((a, b) => {
      switch (sortType) {
        case 'string':
          return direction * a[field].localeCompare(b[field],['ru', 'en']);
        case 'number':
          return direction * (a[field] - b[field]);
        default:
          return direction * (a[field] - b[field]);
      }
    });
  }
}

