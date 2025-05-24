
export type SidebarCollapsible = "offcanvas" | "icon" | "none";
export type SidebarVariant = "sidebar" | "floating" | "inset";
export type SidebarSide = "left" | "right";

export type SidebarState = "expanded" | "collapsed";

export type SidebarContext = {
  state: SidebarState;
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};
