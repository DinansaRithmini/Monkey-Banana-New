"use client"

import { io, type Socket } from "socket.io-client"

class SocketManager {
  private socket: Socket | null = null
  private gameId: string | null = null

  connect() {
    if (!this.socket) {
      this.socket = io(process.env.NEXT_PUBLIC_SERVER_BACKEND_URL)

      this.socket.on("connect", () => {
      })

      this.socket.on("disconnect", () => {
      })
    }
    return this.socket
  }

  joinGame(gameId: string) {
    if (this.socket && gameId !== this.gameId) {
      if (this.gameId) {
        this.socket.emit("leaveGame", this.gameId)
      }
      this.socket.emit("joinGame", gameId)
      this.gameId = gameId
    }
  }

  addPlayer(gameId: string, playerName: string, betAmount: number) {
    if (this.socket) {
      this.socket.emit("addPlayer", { gameId, playerName, betAmount })
    }
  }

  onGameUpdated(callback: (game: any) => void) {
    if (this.socket) {
      this.socket.on("gameUpdated", callback)
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
