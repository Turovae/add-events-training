import ContactList from '../components/contact-list/contact-list';
import FilterWidget from '../components/filter-widget/filter-widget';

const contactList = new ContactList('.contact-list');
// eslint-disable-next-line no-unused-vars
const filterWidget = new FilterWidget('.filter-widget', contactList.filter);

contactList.renderUsers();
