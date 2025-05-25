import React from 'react';

const CourseCard = ({ course, onEnroll, isEnrolled }) => {
  return (
    <div className="course-card" style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
      <h3>{course.title}</h3>
      <p>Instructor: {course.instructor}</p>
      <p>Duration: {course.duration}</p>
      <button
        onClick={() => onEnroll(course._id)}
        disabled={isEnrolled}
        style={{
          cursor: isEnrolled ? 'not-allowed' : 'pointer',
          backgroundColor: isEnrolled ? '#ccc' : '#007bff',
          color: 'white',
          padding: '8px 16px',
          border: 'none',
          borderRadius: '4px',
        }}
      >
        {isEnrolled ? 'Enrolled' : 'Enroll'}
      </button>
    </div>
  );
};

export default CourseCard;
