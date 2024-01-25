const result_table = document.getElementById("result-table")

function addToTable(x, y, r, result, exAt, exTime) {
    let row = result_table.insertRow(1);
    let x_cell = row.insertCell(0);
    let y_cell = row.insertCell(1);
    let r_cell = row.insertCell(2);
    let res_cell = row.insertCell(3);
    let execAt_cell = row.insertCell(4);
    let execTime_cell = row.insertCell(5);

    x_cell.innerHTML = x;
    y_cell.innerHTML = y;
    r_cell.innerHTML = r;
    res_cell.innerHTML = result;
    const formattedDate = new Date(exAt).toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    });

    execAt_cell.innerHTML = formattedDate;

    // Преобразование времени выполнения в миллисекунды
    const executionTimeMs = parseFloat(exTime) * 1000;
    execTime_cell.innerHTML = executionTimeMs.toFixed(2);
}