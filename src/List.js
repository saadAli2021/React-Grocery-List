import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({ groceryList, editItem, deleteItem }) => {
  return (
    <section className="list-section">
      {groceryList.map((item) => {
        return (
          <article className="listItem" key={item.id}>
            <p>{item.title}</p>
            <div className="icons">
              <button
                className="tbtn"
                onClick={() => {
                  editItem(item.id);
                }}
              >
                <FaEdit className="icon edit" />
              </button>
              <button
                className="tbtn"
                onClick={() => {
                  deleteItem(item.id);
                }}
              >
                <FaTrash className="icon delete" />
              </button>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default List;
