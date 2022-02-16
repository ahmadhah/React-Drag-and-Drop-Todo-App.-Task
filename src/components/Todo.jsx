import React, { useState } from 'react';
import './style.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrashAlt, faPen, faEdit } from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function Todo() {

    const [data, setData] = useState('')
    const [items, setItems] = useState([])
    const [toggle, settoggle] = useState(true)
    const [store, setStore] = useState()

    function onSubmit(e) {
        if (data) {
            e.preventDefault()
            const input = { id: new Date().getTime().toString(), task: data }
            setItems([input, ...items])
            setData("")
            settoggle(true)

        }
        if (data && !toggle) {
            setItems(items.map((v) => {
                if (v.id === store) {
                    return { ...v, task: data }
                }
                return v;
            }))
        }
    }

    function del(index) {
        const delItem = items.filter((val, ind) => {
            return index !== val.id
        })
        setItems(delItem)
    }

    function edit(index) {
        const editItem = items.find((v, i) => {
            return index === v.id
        })
        settoggle(false)
        setData(editItem.task)
        setStore(index)
    }

    const onDragEnd = (result) => {
        const newItems = Array.from(items);
        const [removed] = newItems.splice(result.source.index, 1);
        newItems.splice(result.destination.index, 0, removed);
        setItems(newItems);
    };


    return (
        <div className="wrapper">
            <div className="inner">
                <input type="text" style={{ "marginBottom": "10px" }} placeholder="  Add Task... &#x270D;" onChange={(e) => setData(e.target.value)} value={data} />
                <div className="btns">
                    <button onClick={onSubmit}>{toggle ? <FontAwesomeIcon icon={faPlus} /> : <FontAwesomeIcon icon={faEdit} />}</button>
                </div>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {items.map((items, index) => (
                                <Draggable key={items.id} draggableId={items.id} index={index}>
                                    {(provided, snapshot) => (
                                        <div className="list"
                                            ref={provided.innerRef}
                                            snapshot={snapshot}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <li>{items.task}</li>
                                            <div className="btns">
                                                <button onClick={() => del(items.id)}><FontAwesomeIcon icon={faTrashAlt} /></button>
                                                <button onClick={() => edit(items.id)}> <FontAwesomeIcon icon={faPen} /></button>
                                            </div>
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}