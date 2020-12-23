var express = require("express");
var app = express();
const shortid = require("shortid");
var fs = require("fs");
const FILE_URL = `${__dirname}/todo.json`;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  next();
});

// For parsing application/json
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const updateFile = (fileContent) => {
  return new Promise((res, rej) => {
    fs.writeFile(FILE_URL, JSON.stringify(fileContent), "utf8", (err, data) => {
      if (err) {
        rej(err);
      } else {
        res();
      }
    });
  });
};

const readFileData = () => {
  return new Promise((res, rej) => {
    fs.readFile(FILE_URL, "utf8", (err, data) => {
      if (err) {
        rej(err);
      } else {
        res(data ? JSON.parse(data) : []);
      }
    });
  });
};

app.get("/api/todos", (req, res) => {
  readFileData()
    .then((fileData) => {
      res.status(200).send(fileData);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/api/todos/:id", (req, res) => {
  // First read existing users.
  readFileData()
    .then((fileData) => {
      const todo = fileData.find((item) => item.id === req.params.id);
      console.log(todo);
      res.status(200).send(JSON.stringify(todo));
    })
    .catch((err) => {
      res.end(err);
    });
});

app.delete("/api/todos/:id", (req, res) => {
  // First read existing users.
  readFileData()
    .then((fileData) => {
      const updatedTodos = fileData.filter((item) => item.id !== req.params.id);
      updateFile(updatedTodos)
        .then(() => {
          res.status(200).send(JSON.stringify(updatedTodos));
        })
        .catch((err) => {
          res.status(500).send(JSON.stringify(err));
        });
    })
    .catch((err) => {
      res.status(500).send(JSON.stringify(err));
    });
});

app.post("/api/login", (req, res) => {
  res.status(200).send(JSON.stringify({ email: req.body.email }));
});

app.post("/api/todos", (req, res) => {
  // First read existing users.
  readFileData()
    .then((fileData) => {
      const { userData, ...body } = req.body;
      const fileContent = [
        ...fileData,
        {
          ...body,
          id: shortid.generate(),
          email: userData.email,
        },
      ];
      updateFile(fileContent)
        .then(() => {
          res.status(200).send(JSON.stringify(fileContent));
        })
        .catch((err) => {
          res.status(500).send(JSON.stringify(err));
        });
    })
    .catch((err) => {
      res.status(500).send(JSON.stringify(err));
    });
});

app.put("/api/todos/:id", (req, res) => {
  readFileData()
    .then((fileData) => {
      const filteredData = fileData.filter((item) => item.id !== req.params.id);
      const fileContent = [...filteredData, req.body];
      updateFile(fileContent)
        .then(() => {
          res.status(200).send(JSON.stringify(fileContent));
        })
        .catch((err) => {
          res.status(500).send(JSON.stringify(err));
        });
    })
    .catch((err) => {
      res.status(500).send(JSON.stringify(err));
    });
});

var server = app.listen(4001, () => {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
