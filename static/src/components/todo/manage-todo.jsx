import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Notes from "@material-ui/icons/Notes";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Checkbox from "@material-ui/core/Checkbox";
import EditIcon from "@material-ui/icons/Edit";
import CircularProgress from "@material-ui/core/CircularProgress";
import DraggableDialog from "./delete-confirmation";
import { get, post, put, deleteApi } from "../../services/api-service";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(8),
  },
}));

const ManageTodo = ({ userDetails }) => {
  const classes = useStyles();
  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const [deletedTodo, setDeletedTodo] = useState(null);

  useEffect(() => {
    setLoading(true);
    get("/todos", userDetails)
      .then((res) => {
        let userTodoList = res.filter(item => item.email === userDetails.email);
        setTodoList(userTodoList);
        setLoading(false);
      })
      .catch((err) => {
        setTodoList([]);
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
    debugger;
    post("/todos", _todo, userDetails).then((result) => {
      setTodo(null);
      setTodoList(result);
      setLoading(false);
    });
  };

  const updateTodo = (_todo) => {
    setLoading(true);
    put(`/todos/${_todo.id}`, _todo, userDetails).then((result) => {
      setTodo(null);
      setTodoList(result);
      setLoading(false);
    });
  };

  const onDelete = () => {
    setLoading(true);
    deleteApi(`/todos/${deletedTodo.id}`, userDetails).then((res) => {
      setTodoList(res);
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

  const renderTodoList = () => {
    return (
      <List dense={true} className={classes.margin}>
        {todoList.map((listItem, i) => {
          return (
            <ListItem key={listItem.id}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={listItem.isCompleted}
                  tabIndex={-1}
                  disableRipple
                  onChange={() => {
                    onChangeStatus(listItem);
                  }}
                  inputProps={{ "aria-labelledby": `checkbox-list-label-${i}` }}
                />
              </ListItemIcon>
              <ListItemText primary={listItem.description} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  <EditIcon
                    onClick={() => {
                      onEditTodo(listItem);
                    }}
                  />
                  <DeleteIcon
                    onClick={() => {
                      onDeleteTodo(listItem);
                    }}
                  />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    );
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
          <FormControl style={{ width: "85%" }} className={classes.margin}>
            <InputLabel htmlFor="input-with-icon-adornment">
              {editing ? "Update todo" : "Add todo"}
            </InputLabel>
            {editing ? (
              <Input
                placeholder="Hit enter to add"
                id="input-with-icon-adornment"
                onChange={onInputValueChange}
                value={todo?.description || ""}
                onKeyDown={onInputKeyDown}
                startAdornment={
                  <InputAdornment position="start">
                    <Notes />
                  </InputAdornment>
                }
              />
            ) : (
              <Input
                placeholder="Hit enter to add"
                id="input-with-icon-adornment"
                onChange={onInputValueChange}
                onKeyDown={onInputKeyDown}
                startAdornment={
                  <InputAdornment position="start">
                    <Notes />
                  </InputAdornment>
                }
              />
            )}
          </FormControl>
          {!!todoList.length && renderTodoList()}
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

export default ManageTodo;
