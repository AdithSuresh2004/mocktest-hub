import { useNavigate } from "react-router-dom";
import { FaHourglassHalf } from "react-icons/fa";
import EmptyState from "@/components/common/EmptyState";

const NoPendingTests = () => {
  const navigate = useNavigate();

  return (
    <EmptyState
      icon={FaHourglassHalf}
      title="No Pending Tests"
      message="You don't have any incomplete exams at the moment"
      actionLabel="Browse Exams"
      onAction={() => navigate("/exams")}
    />
  );
};

export default NoPendingTests;
