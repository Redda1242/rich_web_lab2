const contactForm = document.getElementById("contacts_form");
const contactTable = document.getElementById("contacts_table");
const nameHeader = document.getElementById("name_header");
const searchInput = document.getElementById("search");
const errorDiv = document.getElementById("error");

let contacts = [];

function addContactToTable(name, mobile, email) {
    const newRow = contactTable.getElementsByTagName('tbody')[0].insertRow();
    const nameCell = newRow.insertCell(0);
    const mobileCell = newRow.insertCell(1);
    const emailCell = newRow.insertCell(2);

    nameCell.textContent = name;
    mobileCell.textContent = mobile;
    emailCell.textContent = email;
}

function addContacts(name, mobile, email) {
    contacts.push({ name, mobile, email });
    addContactToTable(name, mobile, email);
}


// Event listener for Add Contact button
document.getElementById("add_contact").addEventListener("click", () => {
    const name = document.getElementById("name").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const email = document.getElementById("email").value.trim();


    addContacts(name, mobile, email);

    // Reset input fields
    document.getElementById("name").value = "";
    document.getElementById("mobile").value = "";
    document.getElementById("email").value = "";
});

// Sort the table by name on header click
let nameSortOrder = 1;
nameHeader.addEventListener("click", () => {.
    contacts.forEach(contact => {
        addContactToTable(contact.name, contact.mobile, contact.email);
    });
});

// Filter contacts by mobile number as the user types
searchInput.addEventListener("input", () => {
    const searchValue = searchInput.value.trim();
    const filteredContacts = contacts.filter(contact => contact.mobile.includes(searchValue));
    while (contactTable.rows.length > 1) {
        contactTable.deleteRow(1);
    }
    filteredContacts.forEach(contact => {
        addContactToTable(contact.name, contact.mobile, contact.email);
    });

    const noResultDiv = document.getElementById("noResult");
    if (filteredContacts.length === 0) {
        noResultDiv.style.display = "block";
    } else {
        noResultDiv.style.display = "none";
    }
});