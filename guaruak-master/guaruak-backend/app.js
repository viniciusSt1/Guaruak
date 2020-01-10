const app = require('./config/server');

require('./src/controllers/adminController')(app);
require('./src/controllers/dictionaryController')(app);

const port = 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));