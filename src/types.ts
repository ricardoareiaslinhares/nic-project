export interface MenuItemOptions {
    label: string;
    icon: React.ReactNode;
    onClick: (id: number) => void;
}

export interface ContentForModal {
    title:string;
    message:string;
    action: (id: number) => void
}