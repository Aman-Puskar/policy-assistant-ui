import { useRef, useState } from "react";
import Icon from "./Icon";

export default function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState("");
  const ref = useRef(null);

  const submit = () => {
    const text = value.trim();
    if (text.length < 2 || disabled) return;
    onSend(text);
    setValue("");
    if (ref.current) ref.current.style.height = "auto";
  };

  const onKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  };

  const onChange = (event) => {
    setValue(event.target.value);
    event.target.style.height = "auto";
    event.target.style.height = `${Math.min(event.target.scrollHeight, 160)}px`;
  };

  return (
    <footer className="composer">
      <div className="composer__box">
        <textarea
          ref={ref}
          rows={1}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder="Ask about a scheme or policy"
          aria-label="Your question"
          maxLength={300}
        />
        <button
          className="send"
          onClick={submit}
          disabled={disabled || value.trim().length < 2}
          aria-label="Send question"
        >
          <Icon name="send" size={18} />
        </button>
      </div>
      <p className="composer__note">
        This is AI Assistant. Answers may be incomplete; verify details on the
        official government portal.
      </p>
    </footer>
  );
}
