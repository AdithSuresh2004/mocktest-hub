import { globalLoadingStore } from "@/stores/globalLoadingStore";
import PageLoader from "@/components/common/PageLoader";

const GlobalLoadingOverlay = () => {
  const count = globalLoadingStore((s) => s.count);
  const message = globalLoadingStore((s) => s.message || undefined);

  if (count <= 0) return null;

  return <PageLoader fullScreen message={message} />;
};

export default GlobalLoadingOverlay;
