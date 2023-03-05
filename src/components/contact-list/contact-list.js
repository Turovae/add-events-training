/* eslint-disable no-underscore-dangle */
import './contact-list.css';
import data from './contact-list.json';
import { containsPhone, containsText, filterBy } from '../../js/filter';

const filterCb = (search, contact) => containsPhone(contact.phone_number, search)
  || containsText(`${contact.first_name} ${contact.last_name}`, search);

// console.log(data);

export default class ContactList {
  constructor(element) {
    if (typeof element === 'string') {
      // eslint-disable-next-line no-param-reassign
      element = document.querySelector(element);
    }

    this.filter = this.filter.bind(this);
    this.onListItemClick = this.onListItemClick.bind(this);
    this.onHtmlClick = this.onHtmlClick.bind(this);

    this._element = element;

    this._users = data;

    this._element.addEventListener('click', this.onListItemClick);
    document.documentElement.addEventListener('click', this.onHtmlClick, true);
  }

  // eslint-disable-next-line class-methods-use-this
  renederItem(contact) {
    return `
      <li class="contact-list-item">
        <div class="contact-main">
          <img src="https://raw.githubusercontent.com/pixelastic/fakeusers/master/pictures/${contact.picture}" alt="" class="contact-list-item-img">
          <span class="contact-list-item-name">${contact.first_name} ${contact.last_name}</span>
          <span class="contact-list-item-phone">${contact.phone_number}</span>
          <a href="tel:${contact.phone_number}" class="contact-list-item-action">Звонок</a>
        </div>
        <div class="contact-list-item-details hidden">Подробная информация о клиенте: ${contact.username}</div>
      </li>
    `;
  }

  _clear() {
    // Вариант не рабочий, от автора ролика
    for (const child of this._element.children) {
      child.remove();
    }

    // Рабочие варианты
    // for (const child of Array.from(this._element.children)) {
    //   child.remove();
    // }
    // this._element.innerHTML = '';
  }

  _renderItems(items) {
    this._clear();
    items.forEach((user) => {
      const itemHtml = this.renederItem(user);

      this._element.insertAdjacentHTML('beforeend', itemHtml);
    });
  }

  renderUsers() {
    this._renderItems(this._users);
  }

  filter(text) {
    const filterCallback = filterCb.bind(null, text);

    // console.log(filterBy(this._users, filterCallback));
    this._renderItems(filterBy(this._users, filterCallback));
  }

  // eslint-disable-next-line class-methods-use-this
  onListItemClick(e) {
    e.stopPropagation();

    const target = e.target;

    if (target.classList.contains('contact-list-item-action')) {
      return;
    }

    const listItem = e.target.closest('.contact-list-item');

    const details = listItem.querySelector('.contact-list-item-details');
    details.classList.toggle('hidden');
  }

  onHtmlClick(e) {
    console.log(e);
    console.log('html click!');
  }
}
