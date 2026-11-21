export type SocketEventHandler<T = unknown> = (data: T) => void;

export class LiveSocketClient {
  private socket: WebSocket | null = null;
  private listeners: Map<string, Set<SocketEventHandler>> = new Map();

  connect(wsUrl?: string) {
    if (typeof window === "undefined" || !wsUrl) return;
    if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) {
      return;
    }

    try {
      this.socket = new WebSocket(wsUrl);

      this.socket.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          const handlers = this.listeners.get(payload.event);
          if (handlers) {
            handlers.forEach((h) => h(payload.data));
          }
        } catch (err) {
          console.error("LiveSocket parse error:", err);
        }
      };
    } catch {
      // Offline fallback
    }
  }

  on<T>(event: string, handler: SocketEventHandler<T>) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)?.add(handler as SocketEventHandler);

    return () => {
      this.listeners.get(event)?.delete(handler as SocketEventHandler);
    };
  }

  send(event: string, data: unknown) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ event, data }));
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
    this.listeners.clear();
  }
}

export const liveSocket = new LiveSocketClient();
