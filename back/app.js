import express from 'express';
import logger from 'morgan';
import path from 'node:path'; 
import cookieParser from 'cookie-parser'; 


import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import proveedorRouter from './routes/proveedor.js'

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/proveedor', proveedorRouter)

export default app;
