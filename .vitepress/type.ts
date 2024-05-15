export interface SidebarItems {
    text?:string;
    link?:string;
    items?:SidebarItems[];
    collapsed?:boolean;
}