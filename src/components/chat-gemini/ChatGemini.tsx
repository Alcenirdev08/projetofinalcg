import React, {useEffect, useState} from 'react'
import * as S from './styles'
import {AiOutlineMessage} from 'react-icons/ai'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../services/firebase';
import http from '../../http';

export default function ChatGemini({despesas}: {despesas: any[]}) {
    const [user] = useAuthState(auth as unknown as import("firebase/auth").Auth);
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{sender: string; text: string}[]>([]);
    const [input, setInput] = useState("")

    const toggleChat = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        if(user?.uid){
            createSession()
        }
    }, [user])

    const createSession = async () => {
        try {
            const response = await http.post("/chat", {
                uid: user?.uid,
                message: "Iniciando a conversa"
            })

            setMessages([
                ...response.data.messages.map((msg: any) => ({
                    sender: msg.sender,
                    text: msg.content
                }))
            ])
        } catch(error) {
            console.error("Erro ao criar a sessão", error);
        }
    }

    const sendMessage = async () => {
        if(!input.trim()) return;

        const userMessage = {sender: "user", text: input}

        setMessages(prev => [...prev, userMessage])

        setInput("");

        try {
            // const response = await fetch("/api/gemini-chat", {
            //     method: "POST",
            //     headers: {"Content-Type": "application/json"},
            //     body: JSON.stringify({message: input, despesas})
            // });

            const response = await http.post("/chat", {
                uid: user?.uid,
                message: input
            })

            const botMessage = await response.data.messages?.[response.data.messages.length - 1].content;

            if(botMessage) {
                setMessages(prev => [...prev, {sender: "bot", text: botMessage}])
            }
       
        }
        catch (err) {
            console.error("Erro ao enviar a mensagem", err)
            setMessages(prev => [...prev, {sender: "bot", text: "Erro ao te responder"}])
        }

        setInput("")
    }

  return (
    <>
      <S.ChatIcon onClick={toggleChat}>
        <AiOutlineMessage size={32} />
      </S.ChatIcon>

      {isOpen && (
        <S.ChatContainer>
          <S.ChatHeader>
            <span>Conselheiro Financeiro</span>

            <S.ChatCloseIcon onClick={toggleChat} />
          </S.ChatHeader>

          <S.ChatBody>
            {messages.map((msg, index) => (
              <S.Message key={index} sender={msg.sender}>
                {msg.text}
              </S.Message>
            ))}
          </S.ChatBody>

          <S.ChatFooter>
            <S.Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua mensagem..."
            />
            <S.SendButton onClick={sendMessage}>Enviar</S.SendButton>
          </S.ChatFooter>
        </S.ChatContainer>
      )}
    </>
  );
}