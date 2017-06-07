const itemForm = document.querySelector('#itemForm')

let itemArray = []

let favoriteArray = []

//Create List Item and Buttons
function renderItem(item) {
    const newItem = document.createElement('li')

    //Removes Spaces
    const noSpace = item.replace(/\s/g, '');
    //Make Label the Entered Item
    newItem.innerHTML = `${item}`
    newItem.setAttribute(`class`, `${noSpace}`)

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

//Create unordered list to put list items into 
function renderList(item) {
    const list = document.createElement('ul')

    for (let i = 0; i < itemArray.length; i++) {
        const x = renderItem(itemArray[i])
        list.appendChild(x)
    }
    console.log(favoriteArray)
    return list
}

//Check Item isn't already in the list 
function validateNewItem(value) {
    for(let i = 0; i < itemArray.length; i++) {
        if(itemArray[i] == value)   {
            alert('That item is already in the list!')
            return false
        }
    }
    return true
}

//Checks if input string is only A-Z, a-z, 0-9, or ' '
function isValid(str) {
    return !/[^a-zA-Z0-9\s]/g.test(str)
}

//Remove deleted item from array
function findItemToRemove(value) {
    for(let i = 0; i < itemArray.length; i++) {
        if(itemArray[i] == value)   {
            itemArray.splice(i, 1)
            //favoriteArray.splice(i , 1)
            return false
        }
    }
    return true
}

//Make sure all favorites stay highlighted
function resetFavorites() {
    const listTag = document.querySelectorAll('li')

    for(let i = 0; i < listTag.length; i++) {
        listTag[i].style.backgroundColor = 'whitesmoke'
    }

    for(let i = 0; i < listTag.length; i++) {
        for(let j = 0; j < favoriteArray.length; j++) {
            if(listTag[i].getAttribute('class') == favoriteArray[j]) {
                listTag[i].style.backgroundColor = 'lightgreen'
            }
        }
    }  
}

//Handle new item
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
    const fullList = renderList(listItem.groceryItem.value)
    const x = itemForm.appendChild(renderList(fullList))
    listItem.reset()

    resetFavorites()   
}

//Handle Favorite Click
function handleFavorite(e) {
    e.preventDefault()
        
    const background = document.querySelector(`#${e.target.id}`)
    const parent = background.parentElement

    if (parent.style.backgroundColor == 'lightgreen') {
        parent.style.backgroundColor = 'whitesmoke'
        //favoriteArray.pop(e.target.id)
    } else {            
        parent.style.backgroundColor = 'lightgreen'
        favoriteArray.push(e.target.id)
    }
}

//Handle Delete Click
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

    resetFavorites()  
}



itemForm.addEventListener('submit', handleAdd)





