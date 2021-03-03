import React from 'react';
import styles from './sidebar-home-page-style.scss';
import { MediaQueryDesktop } from '../../../components/atoms/media-query';
import { RestaurantSorting } from '../../../components/molecules/restaurant-sorting';
import { RestaurantFiltering } from '../../../components/molecules/restaurant-filtering';
import { Divider } from '../../../components/atoms/divider';

export const SidebarHomePage = () => (
  <MediaQueryDesktop>
    <aside className={styles.side}>
      <RestaurantSorting />
      <Divider />
      <RestaurantFiltering />
    </aside>
  </MediaQueryDesktop>
);
