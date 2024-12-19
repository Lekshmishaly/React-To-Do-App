import React, { useState } from 'react';
 

function TodoApp (){
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null); 
  const [isLocked, setIsLocked] = useState(false); 

  const maxItems = Infinity;

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const storeItems = (event) => {
    event.preventDefault();

    if (isLocked) {
      alert("The list has been confirmed. No more items can be added.");
      return;
    }

    const trimmedInput = input.trim();

    if (trimmedInput === "") {
      alert("Input cannot be empty!");
      return;
    }

    const stringOnlyPattern = /^[a-zA-Z\s]+$/;
    if (!stringOnlyPattern.test(trimmedInput)) {
      alert("Please enter only alphabetic characters.");
      return;
    }

    if (items.length >= maxItems) {
      alert(`You cannot add more than ${maxItems} items.`);
      return;
    }

    const itemExists = items.some((item) => item.toLowerCase() === trimmedInput.toLowerCase());
    if (itemExists && editIndex === null) {
      alert("This item already exists in the list!");
      return;
    }

    if (editIndex !== null) {
      const updatedItems = items.map((item, index) =>
        index === editIndex ? trimmedInput : item
      );
      setItems(updatedItems);
      setEditIndex(null);
    } else {
      setItems([trimmedInput,...items]);
    }

    setInput("");
  };

  const deleteItem = (index) => {
    if (isLocked) {
      alert("The list has been confirmed. Items cannot be deleted.");
      return;
    }
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const editItem = (index) => {
    if (isLocked) {
      alert("The list has been confirmed. Items cannot be edited.");
      return;
    }
    setInput(items[index]);
    setEditIndex(index);
  };
  
  const handleLock = () => {
    setIsLocked(true);
  };

  const handleModify = () => {
    setIsLocked(false);
  };

  return (
    <div className='background-image'>
    <div className='todo-container'>
      <form className="input-section" onSubmit={storeItems}>
        <h1>Todo App</h1>
        <input
          type='text'
          value={input}
          onChange={handleChange}
          placeholder='Enter Items...'
          disabled={isLocked || items.length >= maxItems}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              storeItems(e);
            }
          }}
        />
        {!isLocked && (
          <button type="button" onClick={handleLock}>Confirm List</button>
        )}
        {isLocked && (
          <button type="button" onClick={handleModify}>Modify</button>
        )}
      </form>
      <ul>
        {items.map((data, index) => (
          <li key={index}>
            {data}
            <div className="button-container">
              <button className="edit-btn" onClick={() => editItem(index)}>Edit</button>
              <button className="delete-btn" onClick={() => deleteItem(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default TodoApp;