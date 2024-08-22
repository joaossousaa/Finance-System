import { renderTransactions } from "./elements.js"
import { transactions } from "../script/index.js"
import { getDataForm } from "./getDataForm.js"
import { updateBalance } from "./updateBalance.js"

export async function newTransaction(ev) {
  ev.preventDefault()

  const id = document.querySelector("#id").value
  const form = ev.target
  const data = getDataForm(form)

  if (id) {
    const res = await fetch(`http://localhost:3000/transactions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    const transaction = await res.json()
    const indexToRemove = transactions.findIndex((t) => t.id === id)
    transactions.splice(indexToRemove, 1, transaction)
    document.querySelector(`#transaction-${id}`).remove
    renderTransactions(transaction)
  } else {
    const res = await fetch(`http://localhost:3000/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    const transaction = await res.json()
    transactions.push(transaction)
    renderTransactions(transaction)
  }

  form.reset()
  updateBalance()
}