const generatebutton = document.getElementById("generatebutton");
const passwordfield = document.getElementById("passwordfield");
const passwordlengthrange = document.getElementById("passwordlengthrange");
const passwordlengthtext = document.getElementById("passwordlengthtext");
const copypassword = document.getElementById("copypassword");

copypassword.style.visibility = "hidden";
passwordfield.style.visibility = "hidden";

passwordlengthrange.value = document.cookie;
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
    console.log(password);
    passwordfield.textContent = password;
}

function CopyPassword() {
    navigator.clipboard.writeText(passwordfield.textContent)
    .then(() => {
        console.log("Passwort wurde in die Zwischenablage kopiert.");
    })
    .catch(err => {
        console.error("Fehler beim Kopieren in die Zwischenablage:", err);
    });
}

function ChangeLengthText() {
    passwordlengthtext.textContent = passwordlengthrange.value;
    document.cookie = passwordlengthtext.textContent;
}