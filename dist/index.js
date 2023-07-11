import express from 'express';
const app = express();
const port = 3000;
app.get('/', (req, res) => {
    res.send('Hello World!');
});
console.log("Hello from TypeScript and TS ");
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=index.js.map