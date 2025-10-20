import type { Product } from "./types";

export interface ConfirmModalProps {
  text: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export interface AddProductModalProps {
  onClose: () => void;
  product?: Product;
}