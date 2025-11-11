import { useNavigation } from "react-router-dom";
import PageLoader from "@/components/common/PageLoader";

const RouteChangeLoader = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  if (!isLoading) return null;
  return <PageLoader fullScreen message="Loading page..." />;
};

export default RouteChangeLoader;
