export async function fetchTransactions() {
  return await fetch("http://localhost:3000/transactions").then(res => res.json())
}