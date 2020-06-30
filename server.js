const express = require('express');
const config = require('config');
const colors = require('colors');
const mongoose = require('mongoose');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const cors = require('cors');

const conn = require('./config/db');



// MiddleWare
const { protect } = require('./middleware/protect');



// Routes
const user = require('./routes/user');
const profile = require('./routes/profile');
const post = require('./routes/posts');


const app = express();


app.use(express.json({ extended: false }));
app.use(cors());

app.use('/api/users', user);
app.use('/api/profiles', profile)
app.use('/api/posts', post);



// init gfs
let gfs;
// let gridFSBucket

conn.once('open', () => {
  // init Stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');

  // gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db);
  // const writeStream = gridFSBucket.openUploadStream('uploads');
  console.log('Connected to MongoDB'.yellow.underline)
});

// Create storage object

const storage = new GridFsStorage({
  url: config.get('MONGO_URI'),
  file: (req, file) => {
    // 

    gfs.files.findOne({ filename: req.user._id.toString() }, (err, file) => {
      if (err) {
        return res.status(400).json({
          success: false,
          error: err
        })
      }

      if (file) {
        gfs.files.deleteOne({ filename: req.user._id.toString() }, (err) => {
          if (err) {
            return res.status(400).json({
              success: false,
              error: err
            })
          }
        })
      }
    })
    // 
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        // const filename = buf.toString('hex') + path.extname(file.originalname);
        const filename = req.user._id.toString();
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads',
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

// @route POST /uploads
// @desc add a Photo
// @access Public
app.post('/api/uploads', [protect, upload.single('file')], async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        errors: [{ msg: 'No Image to Upload'}]
      });
    };


    if (!req.file.contentType.startsWith('image') && !req.file.contentType.startsWith('img')) {
      return res.status(400).json({
        success: false,
        errors: [{ msg: 'Please upload an image file'}]
      })

    };

    res.status(201).json({
      success: true,
      data: req.file
    });


  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});


// @route GET /api/uploads
// @desc get all uploads 
// @access Public
app.get('/api/uploads', async (req, res) => {

  try {
    await gfs.files.find().toArray((err, files) => {
      // Check for files
      if (!files || files.length === 0) {
        return res.status(404).json({
          success: false,
          error: 'No Files Found'
        });
      }

      // Files exist
      res.status(200).json({
        success: true,
        data: files
      })

    })

  } catch (error) {

    console.error(error.message);

    res.status(500).json({
      success: false,
      error: 'Server Error'
    })

  }

});

// @route GET /api/uploads/:id
// @desc get a file by id
// @access Public
app.get('/api/uploadsbyid/:id', async (req, res) => {
  try {


    await gfs.findOne({ _id: req.params.id }, (err, file) => {
      if (!file) {
        return res.status(404).json({
          success: false,
          error: 'File Not Found...'
        });

      }

      res.status(200).json({
        success: true,
        data: file
      });

    })

  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      error: 'Server Error'
    })

  }
});

// @route GET /api/uploads/filename:/filename
// @desc get a file by filename
// @access Public
app.get('/api/uploads/filename/', protect, async (req, res) => {
  try {

    await gfs.files.findOne({ filename: req.user._id.toString() }, (err, file) => {
      if (err) {
        return res.status(400), json({
          success: false,
          error: err
        })
      }

      if (!file) {
        return res.status(404).json({
          success: false,
          error: 'File Not Found'
        });
      }


      res.status(200).json({
        success: true,
        data: file
      })
    })

  } catch (error) {
    console.error(error);


    res.status(500).json({
      success: false,
      error: 'Server Error'
    })

  }
});


// @route GET /api/image/:filename
// @desc Display image
// @access Public
app.get('/api/image/:filename', async (req, res) => {
  try {
    await gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      if (!file) {
        return res.status(404).json({
          success: false,
          error: 'File Not Found...'
        })
      }

      // Check if img
      if (file.contentType.startsWith('image') || file.contentType.startsWith('img')) {
        // // Read output to browser
        const readstream = gfs.createReadStream(file.filename);
        return readstream.pipe(res);

      } else {
        return res.status(404).json({
          success: false,
          error: 'Not an Img'
        })
      }

    });



  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      error: 'Server Error'
    })

  }
});


// @route DELETE /api/uploads/:filename
// @desc Delete an image
// @access Public
app.delete('/api/uploads/:filename', async (req, res) => {
  try {
    await gfs.files.deleteOne({ filename: req.params.filename }, (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          error: err
        })
      } else {
        res.status(200).json({
          success: true,
          deleted: true
        })
      }
    });



  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      error: 'Server Error'
    })

  }
});


// @route DELETE /api/uploads/
// @desc Delete all images
// @access Public
app.delete('/api/uploads', async (req, res) => {
  try {
    await gfs.files.deleteMany(err => {
      if (err) {
        return res.status(400).json({
          success: false,
          error: err
        })
      }

      res.status(200).json({
        success: true,
        deleted: true
      });

    })

  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      error: 'Server Error'
    });

  }
});






const PORT = config.get('PORT') || 5000;


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.green.inverse);
});








