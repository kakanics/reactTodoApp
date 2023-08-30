import { ReactNode } from "react";
function listColumn(text: string, todoEle: ReactNode) {
  return (
    <>
      <div className="col-5">
        <ul
          className="list-group container-sm p-3 mb-2 bg-white text-dark"
          style={{ maxHeight: "500px", overflow: "auto" }}
        >
          <li className="list-group-item">
            <h1>{text}</h1>
          </li>
          {todoEle}
        </ul>
      </div>
    </>
  );
}

export default listColumn;
