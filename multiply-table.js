((multiplyBy = 1) => {
    const tableCells = document.querySelectorAll('.content tbody td');
    console.log(tableCells);
    for (tableCell of tableCells) {
        tableCell.innerText = tableCell.innerText.match(/[0-9]/g) ? parseInt(parseInt(tableCell.textContent.replace(/[^0-9\.]/g, "")) * multiplyBy) : "";
    }
})(/* this changes the factor used: */ 1.3333)