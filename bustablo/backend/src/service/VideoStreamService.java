package com.transport.bustablo.backend.service;


import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Service
public class VideoStreamService extends TextWebSocketHandler {
    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // Echo the message for demo purposes
        session.sendMessage(new TextMessage("Echo: " + message.getPayload()));
    }
}
