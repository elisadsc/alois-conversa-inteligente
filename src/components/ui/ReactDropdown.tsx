
import React, { useState, useRef, useEffect } from 'react';
import './ReactDropdown.css';

interface ReactDropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

export function ReactDropdown({ trigger, children }: ReactDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="react-dropdown" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      {isOpen && (
        <div className="react-dropdown-content">
          {children}
        </div>
      )}
    </div>
  );
}
