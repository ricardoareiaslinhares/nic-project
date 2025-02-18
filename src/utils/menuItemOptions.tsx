import { MenuItemOptions } from "../types";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

interface MenuOptionsConfig {
  openFn: (id: number) => void;
  editFn: (id: number) => void;
  deleteFn: () => void;
}

export class MenuOptions {
  openFn: (id: number) => void;
  editFn: (id: number) => void;
  deleteFn: () => void;

  constructor({ openFn, editFn, deleteFn }: MenuOptionsConfig) {
    this.openFn = openFn;
    this.editFn = editFn;
    this.deleteFn = deleteFn;
  }
  getItem(): MenuItemOptions[] {
    return [
      {
        label: "Abrir",
        icon: <VisibilityIcon />,
        onClick: this.openFn,
      },
      {
        label: "Editar",
        icon: <EditIcon />,
        onClick: this.editFn,
      },
      {
        label: "Apagar",
        icon: <DeleteIcon />,
        onClick: this.deleteFn,
      },
    ];
  }
}
