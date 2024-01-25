function postData(select_x, select_y, select_r) {
    const formData = new FormData();
    formData.append("x-select", select_x);
    formData.append("y-select", select_y);
    formData.append("r-select", select_r);

    fetch("./actions/check-hit.php", {
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            addToTable(data.x, data.y, data.r, data.result, data.executed_at, data.execution_time);
        })
        .catch(error => {
            console.error("Error loading page / " + error);
        });
}