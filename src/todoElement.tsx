function TodoElement(text: string, markAsDone: Function, id: number) {
  return (
    <>
      <label className="form-check-label" onClick={() => markAsDone(id, text)}>
        {text}
      </label>
    </>
  );
}

export default TodoElement;
