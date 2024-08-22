import { transactions } from "../script/index.js"

export function updateBalance() {
  const balanceSpan = document.getElementById("balance")
  const balance = transactions.reduce((sum, transaction) => sum + transaction.amount, 0)
  const formater = Intl.NumberFormat('pt-BR', {
    compactDisplay: "long",
    currency: "BRL",
    style: "currency"
  })
  balanceSpan.textContent = formater.format(balance)
}