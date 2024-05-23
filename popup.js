const generatebutton = document.getElementById("generatebutton");
const passwordfield = document.getElementById("passwordfield");
const passwordlengthrange = document.getElementById("passwordlengthrange");
const passwordlengthtext = document.getElementById("passwordlengthtext");
const copypassword = document.getElementById("copypassword");
const copypasswordtext = document.getElementById("copypasswordtext");
const copypasswordicon = document.getElementById("copypasswordicon");

console.log(localStorage.getItem("lastpassword"))
if (localStorage.getItem("lastpassword")) {
    passwordfield.textContent = localStorage.getItem("lastpassword");
    copypassword.style.visibility = "visible";
    passwordfield.style.visibility = "visible";
} else {
    copypassword.style.visibility = "hidden";
    passwordfield.style.visibility = "hidden";
}

if (localStorage.getItem("passwordLength")) {
    passwordlengthrange.value = localStorage.getItem("passwordLength");
} else {
    passwordlengthrange.value = 12;
}

ChangeLengthText();

generatebutton.addEventListener("click", function() {
    NewPassword();
});

copypassword.addEventListener("click", function() {
    CopyPassword();
});

passwordlengthrange.addEventListener("change", function() {
    ChangeLengthText();
})

function NewPassword() {
    copypassword.style.visibility = "visible";
    passwordfield.style.visibility = "visible";
    copypasswordicon.className = "fa-regular fa-copy";
    copypasswordtext.textContent = "Copy";

    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numericChars = '0123456789';
    const specialChars = '!@#$%^&*()-_';

    const allChars = lowercaseChars + uppercaseChars + numericChars + specialChars;

    let password = '';

    for (let i = 0; i < passwordlengthtext.textContent; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
    }
    localStorage.setItem("lastpassword", password);
    passwordfield.textContent = password;
}

function CopyPassword() {
    navigator.clipboard.writeText(passwordfield.textContent)
    .then(() => {
        copypasswordicon.className = "fa-solid fa-copy";
        copypasswordtext.textContent = "Copied";
        
        setTimeout(function() {
            copypasswordicon.className = "fa-regular fa-copy";
            copypasswordtext.textContent = "Copy";
        }, 3000);
    })
    .catch(err => {
        console.error("Fehler beim Kopieren in die Zwischenablage:", err);
    });
}

function ChangeLengthText() {
    passwordlengthtext.textContent = passwordlengthrange.value;
    localStorage.setItem("passwordLength", passwordlengthrange.value);
}
