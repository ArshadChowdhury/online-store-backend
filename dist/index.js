import express from 'express';
const app = express();
const port = 3000;
app.get('/', (req, res) => {
    res.send('Hello World to youuuuuuu!');
});
console.log("Hello from TypeScript and TS and JS");
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=index.js.map