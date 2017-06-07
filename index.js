const itemForm = document.querySelector('#itemForm')

let itemArray = []

function renderItem(item) {
    const newItem = document.createElement('li')

    //Removes Spaces
    const noSpace = item.replace(/\s/g, '');
    //Make Label the Entered Item
    newItem.innerHTML = `${item}`
    newItem.setAttribute('data-favorite', 'false')

    const favoriteButton = document.createElement('button')
    favoriteButton.setAttribute('type', 'button')
    //Give button id with no spaces to find which to highlight 
    favoriteButton.setAttribute(`id`, `${noSpace}`)
    favoriteButton.textContent = 'Favorite'
    newItem.appendChild(favoriteButton)

    favoriteButton.addEventListener('click', handleFavorite)

    const deleteButton = document.createElement('button')
    deleteButton.setAttribute('type', 'button')
    deleteButton.setAttribute('id', `${noSpace}`)
    deleteButton.setAttribute('class', `${item}`)
    deleteButton.textContent = 'Delete'
    newItem.appendChild(deleteButton)

    deleteButton.addEventListener('click', handleDelete)


    return newItem
}

function renderList(item) {
    const list = document.createElement('ul')

    for (let i = 0; i < itemArray.length; i++) {
        list.appendChild(renderItem(itemArray[i]))
    }

    return list
}

function validateNewItem(value) {
    for(let i = 0; i < itemArray.length; i++) {
        if(itemArray[i] == value)   {
            alert('That item is already in the list!')
            return false
        }
    }
    return true
}

function findItemToRemove(value) {
    for(let i = 0; i < itemArray.length; i++) {
        if(itemArray[i] == value)   {
            itemArray.splice(i, 1)
            return false
        }
    }
    return true
}

//Checks if input string is only A-Z, a-z, 0-9
function isValid(str) {
    return !/[^a-zA-Z0-9]S/g.test(str)
}

function handleAdd(e) {
    e.preventDefault()
    const listItem = e.target

    //TODO Check if item is already in list 
    if(validateNewItem(listItem.groceryItem.value) == false) return false

    if (isValid(listItem.groceryItem.value) == false) {
        alert('Please input an item that includes only letters(A-Z, a-z) and numbers(0-9)')
        listItem.reset()
        return false
    }

    if(itemArray.length > 0) {
        const x = document.querySelector('ul')
        x.remove() 
    }
    
    itemArray.unshift(listItem.groceryItem.value)
    itemForm.appendChild(renderList(listItem.groceryItem.value))
    listItem.reset()
}

function handleFavorite(e) {
    e.preventDefault()
        
    const background = document.querySelector(`#${e.target.id}`)
    const parent = background.parentElement

    if (parent.style.backgroundColor == 'lightgreen') {
        parent.style.backgroundColor = 'whitesmoke'
        parent.setAttribute('data-favorite', 'false')
    } else {            
        parent.style.backgroundColor = 'lightgreen'
        parent.setAttribute('data-favorite', 'true')
    }
}

function handleDelete(e) {
    e.preventDefault()

    const item = document.querySelector(`#${e.target.id}`)
    const parent = item.parentElement

    findItemToRemove(e.target.className)

    if(itemArray.length > 0) {
        const x = document.querySelector('ul')
        x.remove() 
    }

    if (itemArray.length > 0) {
        itemForm.appendChild(renderList(e.target.className))
    } else {
        const x = document.querySelector('ul')
        x.remove() 
    }

}


itemForm.addEventListener('submit', handleAdd)





