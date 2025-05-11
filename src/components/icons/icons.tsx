import {
  Gauge,
  Shirt,
  CircleDollarSign,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Command,
  CreditCard,
  Plus,
  Settings,
  Trash,
  User,
  X,
  Sticker,
  FileImage,
} from 'lucide-react';

export type Icon = typeof X;

export const Icons = {
  logo: Command,
  dashboard: Gauge,
  product: Shirt,
  order: CircleDollarSign,
  close: X,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  trash: Trash,
  settings: Settings,
  billing: CreditCard,
  add: Plus,
  user: User,
  arrowRight: ArrowRight,
  check: Check,
  brand: Sticker,
  fileImage: FileImage,
};
