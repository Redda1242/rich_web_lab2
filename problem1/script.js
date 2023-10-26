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

// Validation functions
function isValidName(name) {
    const regex = /^[A-Za-z\s]{1,20}$/;
    return regex.test(name);
}

function isValidMobile(mobile) {
    const regex = /^\d{10}$/;
    return regex.test(mobile);
}

function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email) && email.length <= 40;
}


// Event listener for Add Contact button
document.getElementById("add_contact").addEventListener("click", () => {
    const name = document.getElementById("name").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const email = document.getElementById("email").value.trim();

    let errorMessage = "";

    if (!isValidName(name)) {
        errorMessage += "Name should contain only alphabets, spaces and be less than or equal to 20 characters. ";
    }

    if (!isValidMobile(mobile)) {
        errorMessage += "Mobile should contain exactly 10 numbers. ";
    }

    if (!isValidEmail(email)) {
        errorMessage += "Email should be valid and less than 40 characters in length. ";
    }

    if (errorMessage) {
        errorDiv.textContent = errorMessage;
        errorDiv.style.display = "block";
        return;
    } else {
        errorDiv.style.display = "none";
    }

    addContacts(name, mobile, email);

    // Reset input fields
    document.getElementById("name").value = "";
    document.getElementById("mobile").value = "";
    document.getElementById("email").value = "";
});

// Sort the table by name on header click
let nameSortOrder = 1;
nameHeader.addEventListener("click", () => {

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