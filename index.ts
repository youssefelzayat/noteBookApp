import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';




const jsonParser = bodyParser.json();
const app = express();

export class Note {
    id: string;
    title: string;
    description: string;
    date: Date;
    priority: string;

    constructor(id: string, title: string, description: string, date: Date, priority: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.priority = priority;
    }
}



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

app.post("/createNote", (req,res) => {
      // Read the JSON file
  const data = fs.readFileSync('./noteBook.json', 'utf8');

  // Parse the JSON data
  const jsonData = JSON.parse(data);

  // Add a new entry to the JSON object
  jsonData.newEntry = req.body.newEntry;

  // Write the JSON object back to the file
  fs.writeFileSync('./noteBook.json', JSON.stringify(jsonData), 'utf8');

  // Send a response to the client
  res.send('Entry added');

});
