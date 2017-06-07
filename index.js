const itemForm = document.querySelector('#itemForm')

let itemArray = []

function renderItem(item) {
    const newItem = document.createElement('li')
    //Removes Spaces
    const noSpace = item.replace(/\s/g, '');
    //Make Label the Entered Item
    newItem.innerHTML = `${item}`
    const favoriteButton = document.createElement('button')
    favoriteButton.setAttribute('type', 'button')
    //Give button id with no spaces to find which to highlight 
    favoriteButton.setAttribute(`id`, `${noSpace}`)
    favoriteButton.textContent = 'Favorite'
    newItem.appendChild(favoriteButton)

    favoriteButton.addEventListener('click', handleFavorite)

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

function handleAdd(e) {
    e.preventDefault()
    const listItem = e.target

    //TODO Check if item is already in list 
    if(validateNewItem(listItem.groceryItem.value) == false) {
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
    } else {            
        parent.style.backgroundColor = 'lightgreen'
    }
}

itemForm.addEventListener('submit', handleAdd)