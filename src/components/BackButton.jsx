import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function BackButton({ to = '/' }) {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(to)}>
      <ArrowLeft size={24} className="text-gray-700" />
    </button>
  );
}