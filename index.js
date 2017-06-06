const itemForm = document.querySelector('#itemForm')
let c = 0
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

    if(c == 1) {
    const x = document.querySelector('ul')
    x.remove() 
    }

    const listItem = e.target

    itemArray.unshift(listItem.groceryItem.value)

    itemForm.appendChild(renderList(listItem.groceryItem.value))

    //itemForm.appendChild(renderItem(listItem.groceryItem.value))
    listItem.reset()
    c = 1
}

itemForm.addEventListener('submit', handleAdd)