import { useEffect, useRef } from "react";
import Message from "./Message";
import LoadingStatus from "./LoadingStatus";
import EmptyState from "./EmptyState";

export default function MessageList({ messages, loading, onPick }) {
  const bottomRef = useRef(null);
  const scroll = () => bottomRef.current?.scrollIntoView({ block: "end" });

  useEffect(() => {
    scroll();
  }, [messages, loading]);

  return (
    <main className="messages">
      <div className="messages__inner">
        {messages.length === 0 && !loading ? (
          <EmptyState onPick={onPick} />
        ) : (
          messages.map((message) => (
            <Message key={message.id} message={message} onProgress={scroll} />
          ))
        )}
        {loading && <LoadingStatus />}
        <div ref={bottomRef} />
      </div>
    </main>
  );
}
