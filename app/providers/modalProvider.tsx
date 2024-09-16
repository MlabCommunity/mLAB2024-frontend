import { useEffect, useState } from "react";
import DeleteQuizzModal from "../[locale]/(dashboard)/components/modals/DeleteQuizzModal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <DeleteQuizzModal />
    </>
  );
};

export default ModalProvider;
