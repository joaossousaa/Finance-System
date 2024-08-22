import { updateBalance } from "./updateBalance.js"
import { transactions } from "../script/index.js"

export function createTransactionContainter(id) {
  const containter = document.createElement("div")
  containter.id = `transaction-${id}`
  containter.classList.add("transaction")
  return containter
}

export function createTransactionTitle(name) {
  const title = document.createElement("span")
  title.classList.add(`transaction-title`)
  title.textContent = `${name} `
  return title
}

export function createTransactionAmount(amount) {
  const span = document.createElement('span')

  const formater = Intl.NumberFormat('pt-BR', {
    compactDisplay: "long",
    currency: "BRL",
    style: "currency"
  })
  const formattedAmount = formater.format(amount)

  if (amount > 0) {
    span.textContent = `${formattedAmount} C`
    span.classList.add('transaction-amount', 'credit')
  } else {
    span.textContent = `${formattedAmount} D`
    span.classList.add('transaction-amount', 'debit')
  }
  return span
}

export function createDeleteBtnTransaction(id) {
  const deleteBtn = document.createElement("button")
  deleteBtn.classList.add(`delete-btn`)
  deleteBtn.textContent = "Remove"
  deleteBtn.addEventListener("click", async () => {
    await fetch(`http://localhost:3000/transactions/${id}`, { method: "DELETE" })
    deleteBtn.parentElement.remove() // É a div
    const indexToRemove = transactions.findIndex((t) => t.id === id)
    transactions.splice(indexToRemove, 1)
    updateBalance()
  })
  return deleteBtn
}

export function createEditBtnTransaction(transaction) {
  const editBtn = document.createElement("button")
  editBtn.classList.add('edit-btn')
  editBtn.textContent = "Edit"
  editBtn.addEventListener("click", () => {
    document.querySelector("#id").value = transaction.id
    document.querySelector("#name").value = transaction.name
    document.querySelector("#amount").value = transaction.amount
  })
  return editBtn
}

export function renderTransactions(transaction) {
  const container = createTransactionContainter(transaction.id)
  const title = createTransactionTitle(transaction.name)
  const amount = createTransactionAmount(transaction.amount)
  const editButton = createEditBtnTransaction(transaction)
  const deleteButton = createDeleteBtnTransaction(transaction.id)
  const section = document.getElementById("transactions")

  section.append(container)
  container.append(title, amount, editButton, deleteButton)
}
