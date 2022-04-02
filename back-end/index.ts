import express from 'express';
import dataProcessorRouter from './src/routes/dataProcessor';

const app = express();
const PORT = 3000;

async function main() {

    app.use("/api/v1/dataProcessor", dataProcessorRouter);

    app.listen(PORT, () => {
        console.log(`App listening at http://localhost:${PORT}`);
    });

}

main();