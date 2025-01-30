import { CircleLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#228aca]">
      <CircleLoader color="#1a13d1" size={60} />
    </div>
  );
};

export default LoadingSpinner;
