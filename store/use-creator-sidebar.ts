import {create} from 'zustand';
interface Creatorsidebarstore{
    collapsed: boolean;
    onExpand: () => void;
    onCollapse: () => void;

};

export const useCreatorSidebar = create<Creatorsidebarstore>((set, ) => ({
    collapsed: false,
    onExpand: () => set({collapsed: false}),
    onCollapse: () => set({collapsed: true}),
}));

