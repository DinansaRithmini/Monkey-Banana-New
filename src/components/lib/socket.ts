"use client"

import { io, type Socket } from "socket.io-client"

class SocketManager {
  private socket: Socket | null = null
  private gameId: string | null = null

  connect() {
    if (!this.socket) {
      this.socket = io(process.env.NEXT_PUBLIC_SERVER_BACKEND_URL, {
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 5
      })

      this.socket.on("connect", () => {
        console.log("✅ Socket connected:", this.socket?.id)
        // Rejoin the game if we were in one
        if (this.gameId) {
          console.log("🔄 Reconnecting to game:", this.gameId)
          this.socket?.emit("joinGame", this.gameId)
        }
      })

      this.socket.on("disconnect", () => {
        console.log("❌ Socket disconnected")
      })
    }
    return this.socket
  }

  joinGame(gameId: string) {
    if (this.socket) {
      // Always emit joinGame to ensure we get the current state
      // Even if we're rejoining the same game (e.g., after page refresh)
      if (this.gameId && this.gameId !== gameId) {
        this.socket.emit("leaveGame", this.gameId)
      }
      this.socket.emit("joinGame", gameId)
      this.gameId = gameId
      console.log(`📤 Emitted joinGame event for: ${gameId}`)
    } else {
      console.error("❌ Socket not connected when trying to join game")
    }
  }

  addPlayer(gameId: string, playerName: string, betAmount: number) {
    if (this.socket) {
      this.socket.emit("addPlayer", { gameId, playerName, betAmount })
    }
  }

  onGameUpdated(callback: (game: any) => void) {
    if (this.socket) {
      // Remove any existing listener to prevent duplicates
      this.socket.off("gameUpdated")
      this.socket.on("gameUpdated", callback)
      console.log("📥 Listening for gameUpdated events")
    }
  }

  onPlayerAdded(callback: (result: any) => void) {
    if (this.socket) {
      this.socket.on("playerAdded", callback)
    }
  }

  disconnect() {
    if (this.socket) {
      if (this.gameId) {
        this.socket.emit("leaveGame", this.gameId)
      }
      this.socket.disconnect()
      this.socket = null
      this.gameId = null
    }
  }
}

export const socketManager = new SocketManager()
