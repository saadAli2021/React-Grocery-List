import "./App.css";
import { useEffect, useState } from "react";
import List from "./List";

const getLocalStorage = () => {
  let groceryList = localStorage.getItem("groceryList");
  if (groceryList) return (groceryList = JSON.parse(groceryList));
  else return [];
};
function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [groceryList, setGroceryList] = useState(getLocalStorage());
  const [name, setName] = useState("");
  const [editID, setEditID] = useState("");
  const [alertmsg, setAlertMsg] = useState("");

  useEffect(() => {
    localStorage.setItem("groceryList", JSON.stringify(groceryList));
  }, [groceryList]);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setAlertMsg("");
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [alertmsg]);

  // handle item updation
  const editItem = (id) => {
    let specifieditem = groceryList.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specifieditem.title);
  };
  // handle item deletion
  const deleteItem = (id) => {
    setGroceryList(groceryList.filter((item) => item.id !== id));
    setAlertMsg("Deleted sucessfully");
    setName("");
  };
  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // add new item
    if (!isEditing && name) {
      let item = { id: new Date().getTime().toString(), title: name };
      setGroceryList([...groceryList, item]);
      setAlertMsg("Item Added Sucessfully!");
    } // editing the existing element
    else if (isEditing && name) {
      setIsEditing(false);
      let newlist = groceryList.map((item) => {
        if (item.id === editID) return { ...item, title: name };
        return item;
      });

      setGroceryList(newlist);
      setAlertMsg("Updated Sucessfully!");
    }
    setName("");
  };
  //**********************-- R E T U R N --********************** */
  return (
    <section className="section-center">
      {alertmsg ? <div className="alert toast"> {alertmsg}</div> : null}

      <form className="grocery-form" onSubmit={handleSubmit}>
        <h3>Grocery List</h3>
        <div className="form-control">
          <input
            type="text"
            className="tf"
            placeholder="Type here ..."
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <button className="btnsubmit" type="submit">
            {isEditing ? "Update" : "Save"}
          </button>
        </div>
      </form>
      <List
        groceryList={groceryList}
        editItem={editItem}
        deleteItem={deleteItem}
      />
    </section>
  );
}

export default App;
