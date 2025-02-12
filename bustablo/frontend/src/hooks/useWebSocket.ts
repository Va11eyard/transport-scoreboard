import { useEffect, useState } from 'react';

export const useWebSocket = (url: string) => {
  const [message, setMessage] = useState<string>('');
  
  useEffect(() => {
    const ws = new WebSocket(url);
    ws.onmessage = (event) => {
      setMessage(event.data);
    };
    return () => {
      ws.close();
    };
  }, [url]);
  
  return message;
};
