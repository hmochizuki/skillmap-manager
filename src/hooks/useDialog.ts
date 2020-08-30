import { useState, useCallback } from "react";

const useDialog = (): [boolean, (o: boolean) => void] => {
  const [open, setOpen] = useState(false);
  const handleDialog = useCallback((o) => setOpen(o), []);

  return [open, handleDialog];
};

export default useDialog;
