import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Notes from "@material-ui/icons/Notes";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(8),
  },
}));

const CreateOrEditTodo = ({
  editing,
  onInputValueChange,
  todo,
  onInputKeyDown,
}) => {
  const classes = useStyles();

  return (
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
  );
};

export default CreateOrEditTodo;
