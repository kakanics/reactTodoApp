function inputField(addTodo: Function, todoText: string) {
  return (
    <>
      <div
        className="input-group mb-3"
        style={{ paddingLeft: "10%", paddingRight: "24%" }}
        onKeyDownCapture={(e) => {
          addTodo(e.key);
        }}
      >
        <span className="input-group-text " id="basic-addon1">
          @
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Enter a todo"
          aria-label="Enter a todox"
          aria-describedby="basic-addon1"
          value={todoText}
        />
      </div>
    </>
  );
}

export default inputField;
