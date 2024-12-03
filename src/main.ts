import './style.css'
import FullList from './model/FullList'
import ListItem from './model/ListItem'
import ListTemplate from './templates/ListTemplate'

const initApp = (): void => {
  const fullList = FullList.instance
  const template = ListTemplate.instance

  // Load list from localStorage
  fullList.load()

  // Set up the item entry form submission
  const itemEntryForm = document.getElementById("itemEntryForm") as HTMLFormElement
  itemEntryForm.addEventListener("submit", (event: SubmitEvent): void => {
    event.preventDefault()

    const input = document.getElementById("newItem") as HTMLInputElement
    const newEntryText: string = input.value.trim()
    if (!newEntryText.length) return

    // Generate the new item's ID based on current list size
    const itemId: number = fullList.list.length
      ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
      : 1

    const newItem = new ListItem(itemId.toString(), newEntryText)
    fullList.addItem(newItem)
    template.render(fullList)
  })

  // Set up the clear button
  const clearItems = document.getElementById("clearItemsButton") as HTMLButtonElement
  clearItems.addEventListener('click', (): void => {
    fullList.clearList()
    template.clear()
  })

  // Render the list initially
  template.render(fullList)
}

// Use the correct event name
document.addEventListener("DOMContentLoaded", initApp)