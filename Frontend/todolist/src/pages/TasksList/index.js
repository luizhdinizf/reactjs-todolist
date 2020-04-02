import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiPlusCircle } from "react-icons/fi";
import {
  FaArrowDown,
  FaPencilAlt,
  FaCheckCircle,
  FaTrashAlt,
  FaArrowCircleUp,
  FaArrowUp
} from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import "./styles.css";

export default function TasksList() {
  const [filteredTasks, setTasks] = useState([]);
  const history = useHistory();
  const userName = "Luiz";
  var loadedTasks = JSON.parse(localStorage.getItem(userName));

  useEffect(() => {
    loadedTasks = JSON.parse(localStorage.getItem(userName));
    setTasks(
      loadedTasks !== null
        ? loadedTasks
        : [
            {
              id: 0,
              title: 0,
              description: 0,
              priority: 0,
              visibility: true
            }
          ]
    );
  }, [userName]);

  async function handleAddTask() {
    const newTask = {
      id: parseInt(filteredTasks[filteredTasks.length - 1].id) + 1,
      title: filteredTasks[filteredTasks.length - 1].id + 1,
      description: filteredTasks[filteredTasks.length - 1].id + 1,
      priority: 0,
      visibility: true
    };
    const newTasks = filteredTasks;
    newTasks.push(newTask);
    console.log(newTasks);
    setTasks(filteredTasks.filter(task => task.id !== 8789792));
    localStorage.setItem(userName, JSON.stringify(filteredTasks));
  }
  async function handleHideShowId(idBuscado) {
    setTasks(
      filteredTasks.map(task => ({
        id: task.id,
        title: task.title,
        description: task.description,
        priority: task.priority,
        visibility: task.id === idBuscado ? !task.visibility : task.visibility
      }))
    );
    localStorage.setItem(userName, JSON.stringify(filteredTasks));
  }
  async function handleEditTitle(idBuscado) {
    const newTitle = await window.prompt(
      "Editar Titulo",
      filteredTasks.filter(task => task.id === idBuscado)[0].title
    );
    await setTasks(
      filteredTasks.map(task => ({
        id: task.id,
        title:
          task.id === idBuscado && newTitle !== null ? newTitle : task.title,
        description: task.description,
        priority: task.priority,
        visibility: task.visibility
      }))
    );
    localStorage.setItem(userName, JSON.stringify(filteredTasks));
  }
  async function handleEditDescription(idBuscado) {
    const newDescription = await window.prompt(
      "Editar Descrição",
      filteredTasks.filter(task => task.id === idBuscado)[0].description
    );
    await setTasks(
      filteredTasks.map(task => ({
        id: task.id,
        title: task.title,
        description:
          task.id === idBuscado && newDescription !== null
            ? newDescription
            : task.description,
        priority: task.priority,
        visibility: task.visibility
      }))
    );
    localStorage.setItem(userName, JSON.stringify(filteredTasks));
  }
  async function handleEditPriority(idBuscado) {
    const newPriority = await window.prompt(
      "Editar Prioridade",
      filteredTasks.filter(task => task.id === idBuscado)[0].priority
    );
    await setTasks(
      filteredTasks.map(task => ({
        id: task.id,
        title: task.title,
        priority:
          task.id === idBuscado && newPriority !== null
            ? newPriority
            : task.priority,
        description: task.description,
        visibility: task.visibility
      }))
    );
    localStorage.setItem(userName, JSON.stringify(filteredTasks));
  }
  async function handleDeleteTask(id) {
    console.log(filteredTasks);
    setTasks(filteredTasks.filter(task => task.id !== id));
    localStorage.setItem(userName, JSON.stringify(filteredTasks));
  }

  return (
    <div className="task-cards-container">
      <header>
        <span>Bem vindo, {userName}</span>
      </header>

      <ul>
        {filteredTasks.map(task => (
          <li key={task.id}>
            <header className={task.visibility ? "hidden" : "show"}>
              <strong className="card-title">
                {task.title}
                <button
                  type="button"
                  className="edit-button"
                  onClick={() => handleEditTitle(task.id)}
                >
                  <FaPencilAlt size="12" />
                </button>
              </strong>
              <button
                className="card-priority"
                onClick={() => handleEditPriority(task.id)}
              >
                {task.priority}
              </button>
              <button
                type="button"
                className="hideShow-button"
                onClick={() => handleHideShowId(task.id)}
              >
                <FaArrowDown size="12" display={task.visibility ? "none" : "block"}/>
                <FaArrowUp size="12" display={task.visibility ? "block" : "none"}/>
              </button>
            </header>

            <p className={task.visibility ? "visible" : "not-visible"}>
              <footer>
                <button type="button" className="card-check">
                  <FaCheckCircle size={15} />
                </button>
                <button
                  type="button"
                  className="card-remove"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  <FaTrashAlt size={15} />
                </button>
              </footer>
              {task.visibility}
              {task.description}
              <button
                type="button"
                className="edit-button"
                onClick={() => handleEditDescription(task.id)}
              >
                <FaPencilAlt size="12" />
              </button>

            </p>
          </li>
        ))}

        <li>
          <button
            type="button"
            className="add-button"
            onClick={() => handleAddTask()}
          >
            <FiPlusCircle size={15} />
            Novo
          </button>
        </li>
      </ul>
    </div>
  );
}
