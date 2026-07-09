import express from 'express'

const app = express();

app.get('/', (req, res) => {
    res.json("Ripple backend")
})

app.listen(3000, () => {
    console.log("Backend is running")
})
