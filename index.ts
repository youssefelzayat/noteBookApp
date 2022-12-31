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

app.post("/createNote", (req, res) => {
    // Read the JSON file
    const data = fs.readFileSync('./noteBook.json', 'utf8');

    // Parse the JSON data
    const jsonData = JSON.parse(data);

    // Add a new entry to the JSON object
    //console.log(jsonData);
    jsonData.push(req.body);

    // Write the JSON object back to the file
    fs.writeFileSync('./noteBook.json', JSON.stringify(jsonData), 'utf8');

    res.send('Entry added!');

});

app.get("/readNote/:id?", (req, res) => {
    const id = req.params.id;

    const data = fs.readFileSync('./noteBook.json', 'utf8');

    var jsonData = JSON.parse(data);

    if (id) {
        // Find the object with the matching id
        const object = jsonData.find((obj: Note) => obj.id === id);

        res.send(object);
    }
    else {
        jsonData.sort((a: Note, b: Note) => {
            if (a.title < b.title) {
                return -1;
            }
            if (a.title > b.title) {
                return 1;
            }
            return 0;
        });
        res.send(jsonData);
    }

});
app.put("/updateNote/:id", (req, res) => {
    const id = req.params.id;

    const data = fs.readFileSync('./noteBook.json', 'utf8');

    var jsonData = JSON.parse(data);

    const objectIndex = jsonData.findIndex((obj: Note) => obj.id === id);

    // Update the object's properties
    jsonData[objectIndex] = req.body;

    fs.writeFileSync('./noteBook.json', JSON.stringify(jsonData), 'utf8');

    res.send('Entry updated!');

});

app.delete("/deleteNote/:id", (req, res) => {
    const id = req.params.id;

    const data = fs.readFileSync('./noteBook.json', 'utf8');

    var jsonData = JSON.parse(data);

    const objectIndex = jsonData.findIndex((obj: Note) => obj.id === id);

    jsonData.splice(objectIndex,1);

    fs.writeFileSync('./noteBook.json', JSON.stringify(jsonData), 'utf8');

    res.send('Entry deleted!');

});
