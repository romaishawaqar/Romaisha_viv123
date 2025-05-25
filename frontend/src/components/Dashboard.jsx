import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = ({ user }) => {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/enroll', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setEnrollments(res.data);
      } catch (err) {
        console.error('Error fetching enrolled courses:', err);
      }
    };

    if (user) fetchMyCourses();
  }, [user]);

  if (!user) return <p>Please log in to view your dashboard.</p>;

  return (
    <div>
      <h2>Your Courses</h2>
      <p>Total Enrolled: {enrollments.length}</p>
      {enrollments.map((e) => (
        <div key={e._id} style={{ border: '1px solid #ddd', margin: '10px', padding: '10px' }}>
          <h3>{e.course.title}</h3>
          <p>Instructor: {e.course.instructor}</p>
          <p>Duration: {e.course.duration}</p>
          <p>Enrolled At: {new Date(e.enrolledAt).toLocaleDateString()}</p>
          <button>Continue Learning</button>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
