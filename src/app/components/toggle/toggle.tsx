import "./toggle.css";

const Toggle = () => {
  return (
    <label className="switch">
      <input type="checkbox" />
      <span className="slider"></span>
      <span className="text offline">offline</span>
      <span className="text online">online</span>
    </label>
  );
};
export default Toggle;
