import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import DraggableDialog from "./delete-confirmation";
import { get, post, put, deleteApi } from "../../services/api-service";
import TodoList from "./todo-list";
import CreateOrEditTodo from "./create-edit-todo";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setTodos } from "../../actions";

const ManageTodo = ({ userDetails, setTodos }) => {
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const [deletedTodo, setDeletedTodo] = useState(null);

  useEffect(() => {
    setLoading(true);
    get("/todos", userDetails)
      .then((res) => {
        let userTodoList = res.filter(
          (item) => item.email === userDetails.email
        );
        setTodos(userTodoList);
        setLoading(false);
      })
      .catch((err) => {
        setTodos([]);
        setLoading(false);
      });
  }, [userDetails]);

  const onInputValueChange = (event) => {
    const {
      target: { value },
    } = event;
    setTodo({ description: value, isCompleted: false, id: todo?.id || "" });
  };

  const onInputKeyDown = (event) => {
    const {
      keyCode,
      target: { value },
    } = event;
    if (keyCode === 13 && value.trim().length) {
      if (todo.id) {
        updateTodo(todo);
      } else {
        addTodo({ description: value, isCompleted: false, id: "" });
      }
    } else {
      setTodo({ description: value, isCompleted: false, id: todo?.id || "" });
    }
  };

  const addTodo = (_todo) => {
    setLoading(true);
    post("/todos", _todo, userDetails).then((result) => {
      setTodo(null);
      setTodos(result);
      setLoading(false);
    });
  };

  const updateTodo = (_todo) => {
    setLoading(true);
    put(`/todos/${_todo.id}`, _todo, userDetails).then((result) => {
      setTodo(null);
      setTodos(result);
      setLoading(false);
    });
  };

  const onDelete = () => {
    setLoading(true);
    deleteApi(`/todos/${deletedTodo.id}`, userDetails).then((res) => {
      setTodos(res);
      setLoading(false);
      setDeleting(false);
    });
  };

  const onEditTodo = (listItem) => {
    setEditing(true);
    setTodo(listItem);
  };

  const onDeleteTodo = (listItem) => {
    setDeleting(true);
    setDeletedTodo(listItem);
  };

  const onChangeStatus = (listItem) => {
    updateTodo({ ...listItem, isCompleted: !listItem.isCompleted });
  };

  return (
    <div>
      {loading ? (
        <CircularProgress
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
          }}
          disableShrink
        />
      ) : (
        <div>
          {
            <CreateOrEditTodo
              editing={editing}
              onInputValueChange={onInputValueChange}
              todo={todo}
              onInputKeyDown={onInputKeyDown}
            />
          }
          <TodoList
            onChangeStatus={onChangeStatus}
            onEditTodo={onEditTodo}
            onDeleteTodo={onDeleteTodo}
          />
        </div>
      )}
      {!!isDeleting && (
        <DraggableDialog
          open={isDeleting}
          handleClose={() => {
            setDeleting(false);
          }}
          handleConfirm={onDelete}
        />
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setTodos }, dispatch);
};

export default connect(null, mapDispatchToProps)(ManageTodo);
