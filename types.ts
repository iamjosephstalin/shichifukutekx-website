import React from 'react';

export interface NavItem {
  label: string;
  path: string;
}

export interface CaseStudy {
  id: number;
  client: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  tags: string[];
}

export interface Stat {
  value: string;
  label: string;
}

export interface Project {
  id: number;
  title: string;
  client: string;
  category: string;
  image: string;
  year: string;
  tags: string[];
}
