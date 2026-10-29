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

  const send = async (text) => {
    setMessages((current) => [...current, { id: nextId++, role: "user", content: text }]);
    setLoading(true);
    try {
      const answer = await askPolicyAssistant(text);
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
          content:
            "Couldn't reach the assistant. Try after some time.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Header onNewChat={() => setMessages([])} canReset={messages.length > 0 && !loading} />
      <MessageList messages={messages} loading={loading} onPick={send} />
      <ChatInput onSend={send} disabled={loading} />
    </div>
  );
}
