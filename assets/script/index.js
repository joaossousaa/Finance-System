import { renderTransactions } from "../functions/elements.js"
import { newTransaction } from "../functions/newTransaction.js"
import { fetchTransactions } from "../functions/fetchTransaction.js"
import { updateBalance } from "../functions/updateBalance.js"

export let transactions = []

async function setup() {
  const results = await fetchTransactions()
  transactions.push(...results)
  transactions.forEach(renderTransactions)
  updateBalance()
}

document.addEventListener("DOMContentLoaded", setup)
document.querySelector("form").addEventListener("submit", newTransaction)