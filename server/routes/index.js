import express from 'express';
const router = express.Router()

import usersRoute from './users.js';


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/users',usersRoute)


export default router;
