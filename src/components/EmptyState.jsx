import Icon from "./Icon";

const TOPICS = [
  { icon: "health", title: "Health", question: "How do I apply for an Ayushman Bharat card?" },
  {
    icon: "education",
    title: "Education",
    question: "What scholarships are available for students from low-income families?",
  },
  { icon: "agriculture", title: "Agriculture", question: "Who is eligible for PM-KISAN?" },
  { icon: "housing", title: "Housing", question: "How can I apply under PM Awas Yojana?" },
];

export default function EmptyState({ onPick }) {
  return (
    <section className="welcome">
      <div className="welcome__mark">
        <Icon name="landmark" size={28} />
      </div>
      <p className="welcome__eyebrow">PUBLIC SERVICES · POLICY GUIDE</p>
      <h2>Ask anything about government schemes</h2>
      <p>
        Health facilities, education, agriculture, housing and more. Get clear answers on
        eligibility, benefits and how to apply.
      </p>
      <div className="welcome__grid">
        {TOPICS.map((topic) => (
          <button key={topic.title} className="topic" onClick={() => onPick(topic.question)}>
            <span className="topic__icon">
              <Icon name={topic.icon} size={18} />
            </span>
            <span className="topic__text">
              <strong>{topic.title}</strong>
              <span>{topic.question}</span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
