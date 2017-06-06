const itemForm = document.querySelector('#itemForm')

function renderItem(item) {
    const newItem = document.createElement('p')
    newItem.innerHTML = `${item}`
    
    return newItem
}

function handleAdd(e) {
  e.preventDefault()
  const listItem = e.target

  const div = document.querySelector('#enterItem')

  div.appendChild(renderItem(listItem.groceryItem.value))
  
}

itemForm.addEventListener('submit', handleAdd)