import React from 'react';
import { useParams } from 'react-router-dom';
import DoctorChatWindow from '../components/DoctorChatWindow.jsx';

const ChatWindowWrapper = () => {
  const { userId, doctorId } = useParams();

  return <DoctorChatWindow  doctorId={doctorId} userId={userId} />;
};

export default ChatWindowWrapper;
