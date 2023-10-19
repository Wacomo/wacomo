const app = require('./index');
const PORT = process.env.PORT || 3900;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
