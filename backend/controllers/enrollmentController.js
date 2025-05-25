import Enrollment from '../models/enrollmentModel.js';
import Course from '../models/courseModel.js';

// POST /api/enroll
export const enrollInCourse = async (req, res) => {
  const { userId, courseId } = req.body;

  try {
    const exists = await Enrollment.findOne({ userId, courseId });
    if (exists) return res.status(400).json({ message: 'Already enrolled' });

    const enrollment = new Enrollment({ userId, courseId });
    await enrollment.save();

    res.status(201).json({ message: 'Enrolled successfully', enrollment });
  } catch (error) {
    res.status(500).json({ message: 'Enrollment failed', error: error.message });
  }
};

// GET /api/my-courses
export const getMyCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    const enrollments = await Enrollment.find({ userId }).populate('courseId');
    const result = enrollments.map(enroll => ({
      _id: enroll._id,
      enrolledAt: enroll.enrolledAt,
      course: enroll.courseId,
    }));
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Could not fetch enrolled courses', error: error.message });
  }
};
