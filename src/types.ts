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

