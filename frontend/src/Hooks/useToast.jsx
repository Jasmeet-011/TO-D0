// src/hooks/useToast.js
import { useSnackbar } from 'notistack';

export const useToast = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showToast = (message, variant = 'info') => {
    enqueueSnackbar(message, { variant });
  };

  return showToast;
};
