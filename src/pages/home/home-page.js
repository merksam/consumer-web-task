import React from 'react';
import PropTypes from 'prop-types';
import { RestaurantList } from '../../components/molecules/restaurant-list';
import { Page } from '../../components/page';
import { SidebarHomePage } from './sidebar-home-page';
import { MediaQueryMobile } from '../../components/atoms/media-query';
import { ModalRestaurantsFilter } from '../../components/molecules/modal-restaurants-filter';
import { Button } from '../../components/atoms/button';
import styles from './home-page-style.scss';

const propTypes = {
  translate: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export const HomePage = props => {
  const { translate, isLoading } = props;
  const [isFiltersModalOpen, setIsFiltersModalOpen] = React.useState(false);
  return (
    <Page>
      <SidebarHomePage />
      <div className={styles.content}>
        <MediaQueryMobile>
          <Button
            disabled={isLoading}
            className={styles['open-filters-button']}
            type="button"
            onClick={() => setIsFiltersModalOpen(true)}
          >
            {translate('openFiltersButton')}
          </Button>
        </MediaQueryMobile>
        <RestaurantList />
      </div>
      <ModalRestaurantsFilter
        key={isFiltersModalOpen}
        isOpen={isFiltersModalOpen}
        onClose={() => setIsFiltersModalOpen(false)}
      />
    </Page>
  );
};

HomePage.propTypes = propTypes;
