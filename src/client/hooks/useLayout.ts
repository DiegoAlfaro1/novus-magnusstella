import { useEffect } from 'react';

export const useSidebarToggle = () => {
  useEffect(() => {
    const toggle = document.getElementById('toggle-sidebar');
    const sidebar = document.querySelector('.side_bar');
    const mainContent = document.querySelector('.main-content');

    const handleToggle = () => {
      sidebar?.classList.toggle('close');
      mainContent?.classList.toggle('main-content-increase', !sidebar?.classList.contains('close'));
    };

    toggle?.addEventListener('click', handleToggle);

    return () => {
      toggle?.removeEventListener('click', handleToggle);
    };
  }, []); // Empty array is intentional - we only want to set up event listeners once on mount
};

export const useDarkMode = () => {
  useEffect(() => {
    const body = document.querySelector('body');
    const modeToggle = document.querySelector('.dark-light');

    // Initialize dark mode from localStorage
    const getMode = localStorage.getItem('mode');
    if (getMode && getMode === 'dark-mode') {
      body?.classList.add('dark');
    }

    const handleModeToggle = () => {
      modeToggle?.classList.toggle('active');
      body?.classList.toggle('dark');

      if (!body?.classList.contains('dark')) {
        localStorage.setItem('mode', 'light-mode');
      } else {
        localStorage.setItem('mode', 'dark-mode');
      }
    };

    modeToggle?.addEventListener('click', handleModeToggle);

    return () => {
      modeToggle?.removeEventListener('click', handleModeToggle);
    };
  }, []); // Empty array is intentional - we only want to set up event listeners once on mount
};
