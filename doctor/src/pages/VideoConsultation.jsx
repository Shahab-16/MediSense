import React from 'react';

const VideoConsultation = ({ match }) => {
  const appointmentId = match.params.id;

  return (
    <div>
      <h2 className="text-3xl font-semibold">Video Consultation</h2>
      <div className="mt-4">
        <p>Video consultation for appointment ID: {appointmentId}</p>
        {/* You can integrate a video call API here (e.g., Zoom, WebRTC, etc.) */}
        <button className="mt-6 px-4 py-2 bg-green-500 text-white rounded">Start Video Call</button>
      </div>
    </div>
  );
};

export default VideoConsultation;
