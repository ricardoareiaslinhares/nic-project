export interface MenuItemOptions {
    label: string;
    icon: React.ReactNode;
    onClick: (id: number) => void;
}

export interface ContentForModalBase {
    title:string;
    message:string
}

export interface ContentForModalDelete extends ContentForModalBase {
    action: () => void
}

export interface ContentForModalDeleteFn<T>{
    (data:T[]):(id:number) => ContentForModalDelete
}


export interface ModalsControl {
    isCreateEditModalOpen: boolean;
    isCreateMode: boolean;
    openEditModal?: (id: number) => void;
    openCreateModal: () => void;
    closeModal: () => void;
    isDeleteModalOpen: boolean;
    toggleModalDelete: () => void;
  };