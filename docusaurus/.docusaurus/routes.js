import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '974'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', 'ce6'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'ebc'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', '5a8'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '42e'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', 'e39'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', 'e4d'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', 'c65'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', '96c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/api-endpoints/export/post-json',
        component: ComponentCreator('/api-endpoints/export/post-json', '27e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/api-endpoints/mirror/get-mirror',
        component: ComponentCreator('/api-endpoints/mirror/get-mirror', '913'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/api-endpoints/mirror/post-mirror',
        component: ComponentCreator('/api-endpoints/mirror/post-mirror', 'b2a'),
        exact: true,
        sidebar: "tutorialSidebar"
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
