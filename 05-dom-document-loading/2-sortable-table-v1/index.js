export default class SortableTable {
  constructor(headerConfig = [], data = []) {

  }


  createTemplate() {
    return `

    `;
  }

  createElement() {
    const element = document.createElement('div');
    element.innerHTML = this.createTemplate();
    this.element = element.firstElementChild;
  }
}

