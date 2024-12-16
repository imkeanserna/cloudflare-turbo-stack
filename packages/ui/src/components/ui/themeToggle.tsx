"use client";

import React from 'react';
import { useTheme } from '@repo/ui/context/ThemeContext';
import { Moon, Sun } from "lucide-react";
import { Button } from './button';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const darkTheme = theme === 'dark';

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="icon"
      className="p-2"
    >
      {darkTheme ? (
        <Moon className="h-6 w-6" />
      ) : (
        <Sun className="h-6 w-6" />
      )}
    </Button>
  );
};

export default ThemeToggle;
