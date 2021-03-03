import React from 'react';

import { Page } from '../../components/page';
import styles from './home-page-style.scss';

import { RestaurantList } from '../../components/molecules/restaurant-list';

import { SidebarHomePage } from './sidebar-home-page';

export const HomePage = props => (
  <Page>
    <SidebarHomePage />
    <div className={styles.content}>
      <RestaurantList />
    </div>
  </Page>
);
