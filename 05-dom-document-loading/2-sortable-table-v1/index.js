export default class SortableTable {
  constructor(headerConfig = [], data = []) {  
    this.data = data;
    this.headerConfig = headerConfig;
    this.subElements = {};

    this.createElement();
    this.initSubElements();
  }

  createElement() {
    const element = document.createElement('div');
    element.innerHTML = this.createTemplate();
    this.element = element.firstElementChild;
  }

  initSubElements() {
    const elements = this.element.querySelectorAll('[data-element]');
    for (const element of elements) {
      this.subElements[element.dataset.element] = element;
    }
  }

  createHeaderRow({id, title, sortable, sortType} = {}) {
    /*
      {
      id: 'title',
      title: 'Name',
      sortable: true,
      sortType: 'string'
    },
    */
    return `
      <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}" data-order="" data-sort-type="${sortType || ''}">
        <span>${title}</span>
        ${sortable ? '<span data-element="arrow" class="sortable-table__sort-arrow"><span class="sort-arrow"></span></span>' : ''}
      </div>
    `;
  }

  createTableHeaderTemplate() {
    return `
      <div data-element="header" class="sortable-table__header sortable-table__row">
        ${this.headerConfig.map(item => this.createHeaderRow(item)).join('')}
      </div>
    `;
  }

  getTableRow(item) {
    return this.headerConfig.map(({id, template}) => {
      if (template) {
        return template(item[id]);
      }
      return `<div class="sortable-table__cell">${item[id]}</div>`;
    }).join('');
  }

  createTableRows(data) {
    return data.map(item => {
      return `
        <a href="/products/${item.id}" class="sortable-table__row">
          ${this.getTableRow(item)}
        </a>
      `;
    }).join('');
  }

  createTableBodyTemplate() {
    return `
      <div data-element="body" class="sortable-table__body">
        ${this.createTableRows(this.data)}
      </div>
    `;
  }

  createTemplate() {
    return `
      <div class="sortable-table">
        ${this.createTableHeaderTemplate()}
        ${this.createTableBodyTemplate()}
        <div data-element="loading" class="loading-line sortable-table__loading-line"></div>
        <div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
          <div>
            <p>No products satisfies your filter criteria</p>
            <button type="button" class="button-primary-outline">Reset all filters</button>
          </div>
        </div>
      </div>
    `;
  }

  sort(field, order) {
    const columnToSort = this.headerConfig.find(column => column.id === field);
    
    if (!columnToSort || !columnToSort.sortable) {
      return;
    }

    const sortType = columnToSort.sortType || 'string';
    
    const sortDirection = order === 'asc' ? 1 : -1;

    this.data.sort((itemA, itemB) => {

      const valueA = itemA[field];
      const valueB = itemB[field];

      if (sortType === 'number') {
        return sortDirection * (valueA - valueB);
      } 
      else if (sortType === 'string') {
        if (sortDirection === 1) {
          return valueA.localeCompare(valueB, ['ru', 'en'], {caseFirst: 'upper'});
        } else {
          return valueB.localeCompare(valueA, ['ru', 'en'], {caseFirst: 'upper'});
        }
      }
      else {
        return sortDirection * (valueA - valueB);
      }
    });

    this.updateTableBody();
    this.updateHeaderSortArrow(field, order);
  }

  updateTableBody() {
    this.subElements.body.innerHTML = this.createTableRows(this.data);
  }

  updateHeaderSortArrow(field, order) {
    const columns = this.element.querySelectorAll('.sortable-table__cell[data-id]');
    
    columns.forEach(column => {
      column.dataset.order = '';
      
      if (column.dataset.id === field) {
        column.dataset.order = order;
      }
    });
  }

  destroy() {
    if (this.element) {
      this.element.remove();
    }
    this.element = null;
    this.subElements = {};
  }
}