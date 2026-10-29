import Icon from "./Icon";

export default function Header({ onNewChat, canReset }) {
  return (
    <header className="header">
      <div className="header__brand">
        <div className="header__logo">
          <Icon name="landmark" size={20} />
        </div>
        <div>
          <h1>Government Policy Assistant</h1>
          <p>Schemes, eligibility and application help</p>
        </div>
      </div>
      <button className="btn-new" onClick={onNewChat} disabled={!canReset}>
        <Icon name="plus" size={16} />
        New chat
      </button>
    </header>
  );
}
