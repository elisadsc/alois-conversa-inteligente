
import * as React from "react";
import { useSidebar } from "./sidebar-context";
import { SidebarCollapsible, SidebarSide, SidebarVariant } from "./types";

interface SidebarProps extends React.ComponentProps<"div"> {
  side?: SidebarSide;
  variant?: SidebarVariant;
  collapsible?: SidebarCollapsible;
}

export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      side = "left",
      variant = "sidebar",
      collapsible = "offcanvas",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

    if (collapsible === "none") {
      return (
        <div
          className={`sidebar ${className || ""}`.trim()}
          style={{ 
            display: "flex",
            height: "100%",
            width: "var(--sidebar-width)",
            flexDirection: "column",
            backgroundColor: "var(--sidebar-background)",
            color: "var(--sidebar-foreground)"
          }}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      );
    }

    if (isMobile) {
      return (
        <>
          {/* Mobile overlay */}
          {openMobile && (
            <div
              className={`sidebar-mobile-overlay ${openMobile ? "open" : ""}`}
              onClick={() => setOpenMobile(false)}
            />
          )}
          
          {/* Mobile sidebar */}
          <div
            className={`sidebar-mobile ${openMobile ? "open" : ""} ${className || ""}`.trim()}
            data-sidebar="sidebar"
            data-mobile="true"
            data-side={side}
            ref={ref}
            {...props}
          >
            {children}
          </div>
        </>
      );
    }

    return (
      <>
        {/* Desktop spacer */}
        <div
          className="sidebar-spacer"
          data-state={state}
          data-collapsible={state === "collapsed" ? collapsible : ""}
          data-variant={variant}
          data-side={side}
        />
        
        {/* Desktop sidebar */}
        <div
          ref={ref}
          className={`sidebar ${className || ""}`.trim()}
          data-state={state}
          data-collapsible={state === "collapsed" ? collapsible : ""}
          data-variant={variant}
          data-side={side}
          data-sidebar="sidebar"
          {...props}
        >
          {children}
        </div>
      </>
    );
  }
);

Sidebar.displayName = "Sidebar";
