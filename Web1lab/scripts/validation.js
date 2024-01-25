const form = document.querySelector("form");
const x_select = document.getElementById("x-select");
const r_select = document.getElementById("r-select");
const y_checkboxes = document.querySelectorAll('input[name="y-select"]');

const x_error = x_select.nextElementSibling;
const r_error = r_select.nextElementSibling;

window.addEventListener("load", () => {
    const isValidX = x_select.value.length === 0 || !Number.isNaN(+x_select.value);
    x_select.className = isValidX ? "valid" : "invalid";

    const isValidR = x_select.value.length === 0 || !Number.isNaN(+r_select.value);
    r_select.className = isValidR ? "valid" : "invalid";
});

x_select.addEventListener("input", () => {
    const x = +x_select.value;

    const isValid =
        x_select.value.length === 0 ||
        x_select.value === "-" ||
        (!Number.isNaN(x) && x >= -3 && x <= 5);

    if (isValid) {
        x_select.className = "valid";
        x_error.textContent = "";
        x_error.className = "error";

    } else {
        x_select.className = "invalid";
    }
});

r_select.addEventListener("input", () => {
    const r = +r_select.value;

    const isValid =
        r_select.value.length === 0 ||
        x_select.value === "-" ||
        (!Number.isNaN(r) && r >= 1 && r <= 4);

    if (isValid) {
        r_select.className = "valid";
        r_error.textContent = "";
        r_error.className = "error";

        drawShapesByR(r);
    } else {
        r_select.className = "invalid";
    }
});

function getSelectedCheckboxValue() {
    const selectedCheckbox = document.querySelector(
        'input[name="y-select"]:checked'
    );
    return selectedCheckbox ? selectedCheckbox.value : null;
}


form.addEventListener("submit", (event) => {
    event.preventDefault();

    const x = +x_select.value;
    const r = +r_select.value;
    const y = getSelectedCheckboxValue();

    const isValidX = x_select.value.length === 0 || !Number.isNaN(x);
    const isAcceptableX = x >= -3 && x <= 5;

    if (y === null){
        event.preventDefault();
        alert("Выберите значение для Y")
    }
    if (!isValidX) {
        x_select.className = "invalid";
        x_error.textContent = "Введите число!";
        x_error.className = "error active";
    } else if (!isAcceptableX) {
        x_select.className = "invalid";
        x_error.textContent = "Значение должно быть в диапазоне [-3; 5]";
        x_error.className = "error active";
    } else {
        x_select.className = "valid";
        x_error.textContent = "";
        x_error.className = "error";
    }

    const isValidR = r_select.value.length === 0 || !Number.isNaN(r);
    const isAcceptableR = r >= 1 && r <= 4;

    if (!isValidR) {
        r_select.className = "invalid";
        r_error.textContent = "Введите число!";
        r_error.className = "error active";
    } else if (!isAcceptableR) {
        r_select.className = "invalid";
        r_error.textContent = "Значение должно быть в диапазоне [1; 4]";
        r_error.className = "error active";
    } else {
        r_select.className = "valid";
        r_error.textContent = "";
        r_error.className = "error";
    }


    if (
        isValidX &&
        isValidR &&
        isAcceptableX &&
        isAcceptableR &&
        y !== null
    ) {
        drawPoint(x, y, r);
        postData(x_select.value, y, r_select.value);
    }
});
y_checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
        y_checkboxes.forEach((checkbox) => {
            if (checkbox !== event.target) {
                checkbox.checked = false;
            }
        });
    });
});