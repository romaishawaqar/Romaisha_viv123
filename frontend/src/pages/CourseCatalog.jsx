import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CourseCard from '../components/CourseCard';
import { toast } from 'react-toastify';

const CourseCatalog = ({ user }) => {
  const [courses, setCourses] = useState([]);
  const [enrolledIds, setEnrolledIds] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/courses');
        console.log('Fetched courses:', res.data); // Debug
        setCourses(res.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
      }
    };

    const fetchEnrolled = async () => {
      if (user) {
        try {
          // Use '/api/my-courses' if that returns enrollments
          const res = await axios.get('http://localhost:5000/api/my-courses', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });

          console.log('Fetched enrolled courses:', res.data); // Debug

          // Adjust based on your API response structure:
          // If enrollment has courseId inside, use e.courseId._id
          const ids = res.data.map((e) => e.courseId._id);

          setEnrolledIds(ids);
        } catch (err) {
          console.error('Error fetching enrolled courses:', err);
        }
      } else {
        setEnrolledIds([]); // Clear enrolled ids on logout
      }
    };

    fetchCourses();
    fetchEnrolled();
  }, [user]);

  const handleEnroll = async (courseId) => {
    if (!user) return toast.error('Please log in to enroll.');

    try {
      await axios.post(
        'http://localhost:5000/api/enroll',
        {
          userId: user._id,
          courseId,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );

      toast.success('Enrollment successful!');
      setEnrolledIds([...enrolledIds, courseId]);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Enrollment failed');
    }
  };

  console.log('Rendering course catalog, courses:', courses);
  console.log('Currently enrolled IDs:', enrolledIds);

  return (
    <div>
      <h2>Course Catalog</h2>
      {courses.length === 0 && <p>No courses available.</p>}
      {courses.map((course) => (
        <CourseCard
          key={course._id}
          course={course}
          isEnrolled={enrolledIds.includes(course._id)}
          onEnroll={handleEnroll}
        />
      ))}
    </div>
  );
};

export default CourseCatalog;
