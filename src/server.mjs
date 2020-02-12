import micro from 'micro';

import app from './app.mjs';

const server = micro(app);

server.listen(process.env.PORT || 4000);
