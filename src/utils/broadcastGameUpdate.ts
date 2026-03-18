// Utility to broadcast game state updates to Socket.IO clients
export async function broadcastGameUpdate(gameState: any) {
  try {
    // Send update request to backend server which has Socket.IO instance
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_BACKEND_URL}/api/continuous-game/broadcast`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gameState })
    })
  } catch (error) {
    console.error('Error broadcasting game update:', error)
  }
}
