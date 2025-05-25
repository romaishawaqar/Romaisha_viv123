import express from 'express';
import { enrollInCourse, getMyCourses } from '../controllers/enrollmentController.js';
import { authenticate } from '../config/auth.js';

const router = express.Router();

router.post('/', authenticate, enrollInCourse);
router.get('/', authenticate, getMyCourses); // now matches frontend

export default router;
