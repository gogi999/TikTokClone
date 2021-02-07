import express from 'express';
import mongoose from 'mongoose';

import data from './data.js';
import Videos from './dbModel.js';


const app = express();
const port = process.env.PORT || 9000;

// DB config
const connection_url =
    "mongodb+srv://gogsi99:x099vLQEvMHdjeIY@cluster0.hg8gj.mongodb.net/tiktok?retryWrites=true&w=majority";
mongoose
  .connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'));

// Middlewares
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'),
    res.setHeader('Access-Control-Allow-Headers', '*')
    next();
});

// API endpoints
app.get('/', (req, res) => res.status(200).send('Hello World!'));

// app.get('/api/v1/posts', (req, res) => {
//     res.status(200).json({
//         status: 'success',
//         results: data.length,
//         data: {
//             data
//         }
//     });
// });

app.get('/api/v1/posts', async (req, res) => {
    try {
        const videos = await Videos.find();

        res.status(201).json({
            status: 'success',
            results: videos.length,
            data: {
                videos
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: 'err',
        });
    }
});

app.get('/api/v1/posts/:id', async (req, res) => {
    try {
        const video = await Videos.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                video
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: 'err',
        });
    }
});

// app.post('/api/v1/posts', (req, res) => {
//     const dbVideos = req.body;

//     Videos.create(dbVideos, (err, data) => {
//         if (err) {
//             res.status(500).json({
//                 status: 'fail',
//                 message: 'Internal server error!!!',
//             });
//         } else {
//             res.status(201).json({
//                 status: 'success',
//                 data: {
//                     data,
//                 }
//             });
//         }
//     });
// });

app.post('/api/v1/posts', async (req, res) => {
    try {
        const newVideo = await Videos.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                video: newVideo,
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: 'err',
        });
    }
});

// Listen
app.listen(port, () => {
    console.log(`Listening on localhost: ${port}...`);
});
