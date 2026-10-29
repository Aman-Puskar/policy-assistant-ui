import { useState } from "react";
import Header from "./components/Header";
import MessageList from "./components/MessageList";
import ChatInput from "./components/ChatInput";
import { askPolicyAssistant } from "./api";
import "./styles.css";

let nextId = 1;

export default function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFirstRequest, setIsFirstRequest] = useState(true);

  const send = async (text) => {
    setMessages((current) => [...current, { id: nextId++, role: "user", content: text }]);
    setLoading(true);
    try {
      const answer = await askPolicyAssistant(text);
      setIsFirstRequest(false);
      setMessages((current) => [
        ...current,
        { id: nextId++, role: "assistant", content: answer, animate: true },
      ]);
    } catch (error) {
      console.error("Unable to get a policy assistant response:", error);
      setMessages((current) => [
        ...current,
        {
          id: nextId++,
          role: "assistant",
          error: true,
          animate: false,
          content: isFirstRequest
            ? "The assistant may still be waking up. Its first response can take up to 2 minutes. Please wait a little, then try sending your question again."
            : "Couldn't reach the assistant. Please try again after some time.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Header onNewChat={() => setMessages([])} canReset={messages.length > 0 && !loading} />
      <MessageList
        messages={messages}
        loading={loading}
        onPick={send}
        isFirstRequest={isFirstRequest}
      />
      <ChatInput onSend={send} disabled={loading} />
    </div>
  );
}
