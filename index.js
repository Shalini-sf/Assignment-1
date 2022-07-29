const data = [
    {
        firstName: "John",
        lastName: "Dean",
        role: "Developer",
        contact: 1111111112,
        email: "jdean@gmail.com"

    },
    {
        firstName: "Jack",
        lastName: "Samuel",
        role: "Developer",
        contact: 2222222221,
        email: "jsam@gmail.com"
    },
    {
        firstName: "Ishita",
        lastName: "verma",
        role: "Developer",
        contact: 1111111113,
        email: "iverma@gmail.com"
    }
]
const HEADERS = ['firstName', 'lastName', 'role', 'contact', 'email'];

const createCell = (element, text, rowIndex, id) => {
    let cell = document.createElement(element);
    let textNode = document.createTextNode(text);
    if (rowIndex && id) {
        cell.id = `${id}_${rowIndex}`
    }
    cell.appendChild(textNode);
    return cell;
}

const createBtn = (prefix, rowIndex, text, onClickMethod) => {
    const btn = document.createElement('button');
    btn.id = `${prefix}_${rowIndex}`;
    btn.innerHTML = text;
    btn.onclick = onClickMethod
    return btn;
}

function deleteBtnOnClick(rowIndex) {
    const row = document.getElementById(rowIndex);
    row.remove();
}

function saveOrCancelBtnOnClick(rowIndex, isCancel) {
    const row = document.getElementById(rowIndex);
    row.contentEditable = 'false';
    if (isCancel) {
        const index = rowIndex.split('_')[1];
        const initialData = data[index];
        HEADERS.forEach(header => {
            const cell = document.getElementById(`${header}_${rowIndex}`);
            console.log(`${initialData[header]} --> ${cell.innerHTML}`);
            cell.innerHTML = initialData[header];
        });
    }
    const editBtn = document.getElementById(`edit_${rowIndex}`);
    const deleteBtn = document.getElementById(`delete_${rowIndex}`);
    editBtn.innerHTML = 'Edit';
    editBtn.onclick = () => {
        editBtnOnClick(rowIndex)
    }
    deleteBtn.innerHTML = 'Delete';
    deleteBtn.onclick = () => {
        deleteBtnOnClick(rowIndex)
    }
}

function editBtnOnClick(rowIndex) {
    const row = document.getElementById(rowIndex);
    row.contentEditable = 'true';
    const editBtn = document.getElementById(`edit_${rowIndex}`);
    const deleteBtn = document.getElementById(`delete_${rowIndex}`);
    editBtn.innerHTML = 'Save';
    editBtn.onclick = () => {
        saveOrCancelBtnOnClick(rowIndex)
    }
    deleteBtn.innerHTML = 'Cancel';
    deleteBtn.onclick = () => {
        saveOrCancelBtnOnClick(rowIndex, true)
    }
}
function newDeleteBtnOnClick(newRowIndex) {
    const row = document.getElementById(newRowIndex);
    row.remove();
}

const createNewCell = (element,text,newRowIndex,id) => {

    let newCell = document.createElement(element);
    let textNode = document.createTextNode(text);
    if (newRowIndex && id) {
        newCell.id = `${id}_${newRowIndex}`
    }
    newCell.appendChild(textNode);
    return newCell;
}
const createNewBtn = (prefix, newRowIndex, text, onClickMethod) => {
    const newBtn = document.createElement('button');
    if(newRowIndex && prefix){
        newBtn.id = `${prefix}_${newRowIndex}`;
    }
    newBtn.innerHTML = text;
    newBtn.onclick = onClickMethod
    return newBtn;
}

function newEditBtnOnClick(newRowIndex) {
    const newRow = document.getElementById(newRowIndex);
    newRow.contentEditable = 'true';
    const newEditBtn = document.getElementById(`edit_${newRowIndex}`);
    const newDeleteBtn = document.getElementById(`delete_${newRowIndex}`);
    newEditBtn.innerHTML = 'Save';
    newEditBtn.onclick = () => {
        newSaveOrCancelBtnOnClick(newRowIndex)
    }
    newDeleteBtn.innerHTML = 'Cancel';
    newDeleteBtn.onclick = () => {
        newSaveOrCancelBtnOnClick(newRowIndex, true)
    }
}
function newSaveOrCancelBtnOnClick(newRowIndex, isCancel) {
    const row = document.getElementById(newRowIndex);
    row.contentEditable = 'false';
    if (isCancel) {

        const initialData = newData;
        HEADERS.forEach(header => {
            const cell = document.getElementById(`${header}_${newRowIndex}`);
            console.log(`${initialData[header]} --> ${cell.innerHTML}`);
            cell.innerHTML = initialData[header];
        });
    }
    const newEditBtn = document.getElementById(`edit_${newRowIndex}`);
    const newDeleteBtn = document.getElementById(`delete_${newRowIndex}`);
    newEditBtn.innerHTML = 'Edit';
    newEditBtn.onclick = () => {
        newEditBtnOnClick(newRowIndex)
    }
    newDeleteBtn.innerHTML = 'Delete';
    newDeleteBtn.onclick = () => {
        newDeleteBtnOnClick(newRowIndex)
    }
}

var index=0;

function addBtnOnClick(){
    newData=[
    {firstName: " ", lastName: " ", role: " ", contact: " " , email: " " }
]

    
    newData.forEach(newData => {

    const newRow= document.createElement('tr');
    const newRowIndex= `newRow_${index}`;
    newRow.id= newRowIndex;
    index++;
    const tableById=document.getElementById('tableId');
    tableById.appendChild(newRow);
    document.body.appendChild(tableById);

    Object.entries(newData).forEach(value => {

     newRow.appendChild(createNewCell('td',value[1],newRowIndex, value[0]));

    })
    const editCell= document.createElement('td');
        editCell.appendChild(createNewBtn('edit', newRowIndex, 'Edit', () => {
            newEditBtnOnClick(newRowIndex)
        }))
        newRow.appendChild(editCell);

    const deleteCell = document.createElement('td');
        deleteCell.appendChild(createNewBtn('delete', newRowIndex, 'Delete', () => {
            newDeleteBtnOnClick(newRowIndex)
        }))
        newRow.appendChild(deleteCell);

})
}
function refreshBtnOnClick(){

    document.getElementById('tableId').remove();
    loadBtnOnClick();
    
}

function loadBtnOnClick() {
    
    const table = document.createElement("table");
    table.id= 'tableId';

    // Create Header Row
    const headerRow = document.createElement("tr");
    HEADERS.forEach(header => {
        headerRow.appendChild(createCell('th', header));
    })
    table.appendChild(headerRow);
    // Process Data
    data.forEach((data, index) => {
        const rowIndex = `row_${index}`;
        const row = document.createElement('tr');
        row.id = rowIndex;

        Object.entries(data).forEach(value => {
            row.appendChild(createCell('td', value[1], rowIndex, value[0]));
        })



        const firstCell = document.createElement('td');
        firstCell.appendChild(createBtn('edit', rowIndex, 'Edit', () => {
            editBtnOnClick(rowIndex)
        }))
        row.appendChild(firstCell);

        const secondCell = document.createElement('td');
        secondCell.appendChild(createBtn('delete', rowIndex, 'Delete', () => {
            deleteBtnOnClick(rowIndex)
        }))
        row.appendChild(secondCell);

        table.appendChild(row);
    })

    document.body.appendChild(table);
}
function loadTable(){

    const loadButton= document.getElementById('loadBtn');
    loadButton.remove();
    
    RefreshBtn=document.createElement('button');
    RefreshBtn.innerHTML= 'Refresh';
    RefreshBtn.addEventListener('click', refreshBtnOnClick);
    document.body.appendChild(RefreshBtn);

    addBtn=document.createElement('button');
    addBtn.innerHTML= 'AddRow';
    addBtn.addEventListener('click', addBtnOnClick);
    document.body.appendChild(addBtn);

    loadBtnOnClick();

}

const loadBtn = document.getElementById("loadBtn");
if (loadBtn) {
    loadBtn.addEventListener("click", loadTable);
}
