import FullList from "../model/FullList"

interface DOMList {
    ul: HTMLUListElement,
    clear(): void,
    render(fullList: FullList): void,
}

export default class ListTemplate implements DOMList {

    ul: HTMLUListElement
    static instance: ListTemplate = new ListTemplate()

    private constructor() {
        this.ul = document.getElementById("listItems") as HTMLUListElement
    }

    clear(): void {
        this.ul.innerHTML = ''
    }

    render(fullList: FullList): void {
        this.clear()

        fullList.list.forEach(item => {
            const li = document.createElement("li") as HTMLLIElement
            li.className = "item"

            const check = document.createElement("input") as HTMLInputElement
            check.type = "checkbox"
            check.id = item.id
            check.checked = item.checked
            li.append(check)

            check.addEventListener('change', () => {
                item.checked = check.checked  // Sync checkbox state with item
                fullList.save()
            })

            const label = document.createElement("label") as HTMLLabelElement
            label.htmlFor = item.id
            label.textContent = item.item
            li.append(label)

            // Add Remove button
            const removeButton = document.createElement("button") as HTMLButtonElement
            removeButton.className = 'button'
            removeButton.textContent = 'X'
            li.append(removeButton)

            removeButton.addEventListener('click', () => {
                fullList.removeItem(item.id)
                this.render(fullList)
            })

            // Add Edit button
            const editButton = document.createElement("button") as HTMLButtonElement
            editButton.className = 'button'
            editButton.textContent = 'Edit'
            li.append(editButton)

            editButton.addEventListener('click', () => {
                const newText = prompt('Edit your item:', item.item)
                if (newText !== null && newText.trim() !== '') {
                    item.editItem(newText)
                    fullList.save()
                    this.render(fullList)  // Re-render the list to show updated text
                }
            })

            this.ul.append(li)
        })
    }
}