import express from 'express';
import logger from 'morgan';
import path from 'node:path'; 
import cookieParser from 'cookie-parser'; 


import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import proveedorRouter from './routes/proveedor.js';
import rubroRouter from './routes/rubro.js'

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.static('public'));

app.use('/', indexRouter);
app.use('/proveedor', proveedorRouter);
app.use('/rubro', rubroRouter)

export default app;
