import { useState } from "react";

interface ConfirmConfig {
  title: string;
  message: string;
  onConfirm: () => void;
  type?: "warning" | "danger" | "info";
}

export function useConfirmModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<ConfirmConfig>({
    title: "",
    message: "",
    onConfirm: () => {},
    type: "warning",
  });

  const openConfirm = ({
    title,
    message,
    onConfirm,
    type = "warning",
  }: ConfirmConfig) => {
    setConfig({ title, message, onConfirm, type });
    setIsOpen(true);
  };

  const closeConfirm = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    config,
    openConfirm,
    closeConfirm,
  };
}
