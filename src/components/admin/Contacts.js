import React, { useEffect, useState } from "react";
import AdminContent from "./AdminContent";
import timeAgo from "../../classes/TimeAgo";
import styled from "styled-components";
import ContactsFilter from "./ContactsFilter";

const ContactsTable = styled.table`
  border: 1px solid #f5f5f5;
  border-radius: 3px;
  width: 100%;
  padding: 3px;
`;

const ContactRow = styled.tr`
  background-color: ${prop => prop.index % 2 === 0 ? "#f6f6f6" : "#ffffff"};
`;

function Contacts({ setLoaderStatus, setOverlayModal }) {

  const [contactList, setContactList] = useState([])
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('signupDateDesc');

  useEffect(() => {
    setLoaderStatus(true);
    // Fetch Contacts
    fetch(`${process.env.REACT_APP_JSON_API}/contacts`)
      .then(res => res.json())
      .then(json => {
        setContactList(json);
        setLoaderStatus(false);
      })
      .catch(err => console.log(err))
  }, [setLoaderStatus])

  function renderContacts() {

    function sortContacts(data, method) {

      switch(method) {
        case 'firstNameAsc':
          return data.sort((a, b) => {
            let nameA = a.firstName.toLowerCase();
            let nameB = b.firstName.toLowerCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          })
    
        case 'firstNameDesc':
          return data.sort((a, b) => {
            let nameA = a.firstName.toLowerCase();
            let nameB = b.firstName.toLowerCase();
            if (nameA < nameB) {
              return 1;
            }
            if (nameA > nameB) {
              return -1;
            }
            return 0;
          })

          case 'lastNameAsc':
            return data.sort((a, b) => {
              let nameA = a.lastName.toLowerCase();
              let nameB = b.lastName.toLowerCase();
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }
              return 0;
            })
      
          case 'lastNameDesc':
            return data.sort((a, b) => {
              let nameA = a.lastName.toLowerCase();
              let nameB = b.lastName.toLowerCase();
              if (nameA < nameB) {
                return 1;
              }
              if (nameA > nameB) {
                return -1;
              }
              return 0;
            })
    
        case 'signupDateDesc':
          return data.sort((a, b) => b.signupDate - a.signupDate)
    
        case 'signupDateAsc':
          return data.sort((a, b) => a.signupDate - b.signupDate)
    
        default:
          return data;
      }
    }
    
    function contactMap(contact, index) {
      return (
        <ContactRow key={contact.id} index={index}>
          <td>{contact.id}</td>
          <td>{contact.firstName}</td>
          <td>{contact.lastName}</td>
          <td>{contact.phone}</td>
          <td>{contact.addressStreet} {contact.addressCity}, {contact.addressState} {contact.addressZip}, {contact.addressCountry}</td>
          <td>{timeAgo(contact.signupDate)}</td>
        </ContactRow>
      )
    }

    // Sort Contacts
    let sortedContacts = sortContacts(contactList, sort);

    if (search.length > 0) {
      const results = sortedContacts.filter(contact => {
        const fullName = `${contact.firstName} ${contact.lastName}`;
        return fullName.toLowerCase().includes(search.toLowerCase());
      }).map((contact, index) => contactMap(contact, index))

      if (results.length > 0) {
        return results;
      } else {
        return <tr><td colSpan="6" style={{ textAlign: "center" }}>No results found for "{search}"</td></tr>;
      }
    }

    return sortedContacts.map((contact, index) => contactMap(contact, index));

  }


  return (
    <AdminContent title="View Contacts">
      <ContactsFilter search={search} setSearch={setSearch} sort={sort} setSort={setSort} />
      <ContactsTable cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {renderContacts()}
        </tbody>
      </ContactsTable>
    </AdminContent>
  )
}

export default Contacts;