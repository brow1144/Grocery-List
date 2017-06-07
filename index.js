const itemForm = document.querySelector('#itemForm')

let itemArray = []

function renderItem(item) {
    const newItem = document.createElement('li')
    newItem.innerHTML = `${item}`

    return newItem
}

function renderList(item) {
    const list = document.createElement('ul')

    for (let i = 0; i < itemArray.length; i++) {
        list.appendChild(renderItem(itemArray[i]))
    }
    return list
}

function handleAdd(e) {
    e.preventDefault()
    const listItem = e.target

    if(itemArray.length > 0) {
        const x = document.querySelector('ul')
        x.remove() 
    }

    itemArray.unshift(listItem.groceryItem.value)
    itemForm.appendChild(renderList(listItem.groceryItem.value))
    listItem.reset()
}

itemForm.addEventListener('submit', handleAdd)