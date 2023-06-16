import React from 'react';
import { GlobalStyle } from './GlobalStyle';
import { Container } from './Container';
import initialContacts from '../contacts.json';
import { BookForm } from './BookForm/BookForm';
import { Wrapper } from './BookForm/BookForm.styled';
import { ContactList } from './ContactList/ContactList';
import { ContactListItem } from './ContactList/ContactListItem';
import { Filter } from './Filter/Filter';


export class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    localStorage.getItem('contacts') !== null
      ? this.setState({
          contacts: JSON.parse(localStorage.getItem('contacts')),
        })
      : this.setState({ contacts: initialContacts });
    
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts)
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  addContact = newContact => {
    if (
      this.state.contacts.find(contact =>
        contact.name.toLowerCase().includes(newContact.name.toLowerCase())
      )
    ) {
      window.alert(`${newContact.name} is already in contacts!`);
    } else {
      this.setState(prevState => {
        return { contacts: [...prevState.contacts, newContact] };
      });
    }
  };

  deleteContact = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  changeFilter = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };

  getFilteredContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const filteredContacts = this.getFilteredContacts();

    return (
      <Container>
        <GlobalStyle />
        <h1>Phonebook</h1>
        <Wrapper>
          <BookForm onAddContact={this.addContact} />
          <ContactList>
            <Filter value={this.state.filter} onChange={this.changeFilter} />
            <ContactListItem
              contacts={filteredContacts}
              onDelete={this.deleteContact}
            />
          </ContactList>
        </Wrapper>
      </Container>
    );
  }
}
