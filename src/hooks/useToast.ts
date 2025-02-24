import { useCallback, useState } from "react";

const useToast = () => {
  const [toast, setToast] = useState({ open: false, message: "" });
  //Se a msgSuccess = Falso, então é msgError
  const showToast = useCallback((isSuccess: boolean, isError: boolean) => {
    if (isError || isSuccess) {
      setToast({
        open: true,
        message: isSuccess
          ? "Operação realizada com sucesso!"
          : "Erro ao realizar operação!",
      });
    }
  }, []);

  const closeToast = useCallback(() => {
    setToast((prev) => ({ ...prev, open: false }));
  }, []);

  return {
    openToast: toast,
    showToast,
    closeToast,
  };
};

export default useToast;
