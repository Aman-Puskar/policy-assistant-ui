import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkTablesAsLists from "../plugins/remarkTablesAsLists";
import { useTypewriter } from "../hooks/useTypewriter";
import Icon from "./Icon";

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Message({ message, onProgress }) {
  const isUser = message.role === "user";
  const { shown, done } = useTypewriter(
    message.content,
    !isUser && message.animate && !message.error && !prefersReducedMotion()
  );
  const [copied, setCopied] = useState(false);
  const markdown = shown.replace(/<br\s*\/?>/gi, " • ");

  useEffect(() => {
    onProgress?.();
  }, [shown, onProgress]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error("Unable to copy the assistant response:", error);
    }
  };

  if (isUser) {
    return (
      <div className="row row--user">
        <div className="bubble">{message.content}</div>
      </div>
    );
  }

  return (
    <div className="row row--assistant">
      <div className="avatar" aria-hidden="true">
        <Icon name="landmark" size={16} />
      </div>
      <div className="answer-wrap">
        <div className={`answer ${message.error ? "answer--error" : ""}`}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkTablesAsLists]}
            components={{
              a: ({ children, ...props }) => (
                <a {...props} target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              ),
            }}
          >
            {markdown}
          </ReactMarkdown>
          {!done && <span className="answer-caret" aria-hidden="true" />}
        </div>
        {done && !message.error && (
          <div className="actions">
            <button onClick={copy}>
              <Icon name={copied ? "check" : "copy"} size={14} />
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
