import "./input-box.css";

function InputBox() {
  return (
    <>
      <div className={"inputbox"}>
        <form className={"inputbox__form"}>
          <input
            type="text"
            placeholder={"Search by..."}
            className="input input-bordered w-full max-w-xs"
          />
          <div className={"form-alert"}>This field is required</div>
        </form>
      </div>
    </>
  );
}

export default InputBox;
