
import * as React from "react";
import { PanelLeft } from "lucide-react";
import { useSidebar } from "./sidebar-context";

// Sidebar Content
export const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`sidebar-content ${className || ""}`.trim()}
      data-sidebar="content"
      {...props}
    />
  );
});
SidebarContent.displayName = "SidebarContent";

// Sidebar Header
export const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`sidebar-header ${className || ""}`.trim()}
      data-sidebar="header"
      {...props}
    />
  );
});
SidebarHeader.displayName = "SidebarHeader";

// Sidebar Footer
export const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`sidebar-footer ${className || ""}`.trim()}
      data-sidebar="footer"
      {...props}
    />
  );
});
SidebarFooter.displayName = "SidebarFooter";

// Sidebar Group
export const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`sidebar-group ${className || ""}`.trim()}
      data-sidebar="group"
      {...props}
    />
  );
});
SidebarGroup.displayName = "SidebarGroup";

// Sidebar Group Label
export const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`sidebar-group-label ${className || ""}`.trim()}
      data-sidebar="group-label"
      {...props}
    />
  );
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";

// Sidebar Group Content
export const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`sidebar-group-content ${className || ""}`.trim()}
    data-sidebar="group-content"
    {...props}
  />
));
SidebarGroupContent.displayName = "SidebarGroupContent";

// Sidebar Menu
export const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={`sidebar-menu ${className || ""}`.trim()}
    data-sidebar="menu"
    {...props}
  />
));
SidebarMenu.displayName = "SidebarMenu";

// Sidebar Menu Item
export const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={`sidebar-menu-item ${className || ""}`.trim()}
    data-sidebar="menu-item"
    {...props}
  />
));
SidebarMenuItem.displayName = "SidebarMenuItem";

// Sidebar Menu Button
interface SidebarMenuButtonProps extends React.ComponentProps<"button"> {
  asChild?: boolean;
  isActive?: boolean;
}

export const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(({ className, isActive = false, asChild = false, ...props }, ref) => {
  const Component = asChild ? "div" : "button";
  
  return (
    <Component
      ref={ref}
      className={`sidebar-menu-button ${className || ""}`.trim()}
      data-sidebar="menu-button"
      data-active={isActive}
      {...props}
    />
  );
});
SidebarMenuButton.displayName = "SidebarMenuButton";

// Sidebar Trigger
export const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      ref={ref}
      className={`sidebar-trigger ${className || ""}`.trim()}
      data-sidebar="trigger"
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeft />
      <span className="sr-only">Toggle Sidebar</span>
    </button>
  );
});
SidebarTrigger.displayName = "SidebarTrigger";

// Sidebar Rail
export const SidebarRail = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      ref={ref}
      className={`sidebar-rail ${className || ""}`.trim()}
      data-sidebar="rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      {...props}
    />
  );
});
SidebarRail.displayName = "SidebarRail";

// Sidebar Inset (main content area)
export const SidebarInset = React.forwardRef<
  HTMLElement,
  React.ComponentProps<"main">
>(({ className, ...props }, ref) => {
  return (
    <main
      ref={ref}
      className={`sidebar-inset ${className || ""}`.trim()}
      {...props}
    />
  );
});
SidebarInset.displayName = "SidebarInset";
