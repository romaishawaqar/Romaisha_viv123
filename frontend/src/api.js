const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const fetchCourses = () =>
  fetch(`${API}/api/courses`).then(res => res.json());

export const enrollCourse = (userId, courseId) =>
  fetch(`${API}/api/enroll`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ userId, courseId }),
  });

export const fetchMyCourses = () =>
  fetch(`${API}/api/my-courses`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  }).then(res => res.json());
