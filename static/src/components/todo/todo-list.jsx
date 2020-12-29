import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Checkbox from "@material-ui/core/Checkbox";
import EditIcon from "@material-ui/icons/Edit";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(8),
  },
}));

const TodoList = ({ todos, onChangeStatus, onEditTodo, onDeleteTodo }) => {
  const classes = useStyles();

  return (
    <List dense={true} className={classes.margin}>
      {!!todos &&
        todos.map((listItem, i) => {
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

const mapStateToProps = (state) => ({
  todos: state.todoReducers.todos,
});

export default connect(mapStateToProps, null)(TodoList);
