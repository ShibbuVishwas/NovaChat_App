// Talks to Spring Boot backend
const API_URL = 'http://localhost:8080/api/chat'

export async function sendMessage(message) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  })

  if (!response.ok) {
    throw new Error('Server error')
  }

  return response.json()
}
