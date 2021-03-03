import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RestaurantSorting } from '../restaurant-sorting/restaurant-sorting';
import { Divider } from '../../atoms/divider';
import { RestaurantFiltering } from '../restaurant-filtering/restaurant-filtering';
import { Modal } from '../../atoms/modal';
import RestaurantListFiltering from '../../../logic/restaurant-filtering/models/restaurant-filtering-model';
import RestaurantListSorting from '../../../logic/restaurant-sorting/models/restaurant-sorting-model';
import { Button } from '../../atoms/button';

import styles from './modal-restaurant-filter-style.scss';

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

const defaultProps = {};

export class ModalRestaurantFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cuisines: {},
      deliveryType: RestaurantListFiltering.DEFAULT_FILTERING_TYPE,
      sortingType: RestaurantListSorting.DEFAULT_SORTING_TYPE,
    };
  }

  componentDidMount() {
    const { selectedCuisines, selectedDeliveryType, selectedSortingType } = this.props;
    this.setState({
      cuisines: selectedCuisines,
      deliveryType: selectedDeliveryType,
      sortingType: selectedSortingType,
    });
  }

  onChange = data => {
    this.setState(data);
  };

  onApply = () => {
    const { updateFilterAndSearch, onClose } = this.props;
    const { cuisines, deliveryType, sortingType } = this.state;
    updateFilterAndSearch({
      cuisines,
      deliveryType,
      sortingType,
    });
    onClose();
  };

  render() {
    const {
      isOpen,
      onClose,
      deliveryTypes,
      sortingTypes,
      cuisines,
      sortingTranslationMap,
      filteringTranslationMap,
      translate,
      intl,
      isLoading,
    } = this.props;

    const {
      cuisines: selectedCuisines,
      deliveryType: selectedDeliveryType,
      sortingType: selectedSortingType,
    } = this.state;

    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <RestaurantSorting
          isLoading={isLoading}
          intl={intl}
          selectedSortingType={selectedSortingType}
          sortingTypes={sortingTypes}
          onChange={this.onChange}
          translate={path => translate(`restaurantSorting.${path}`)}
          translationMap={sortingTranslationMap}
        />
        <Divider />
        <RestaurantFiltering
          isLoading={isLoading}
          intl={intl}
          selectedCuisines={selectedCuisines}
          selectedDeliveryType={selectedDeliveryType}
          cuisines={cuisines}
          deliveryTypes={deliveryTypes}
          onChange={this.onChange}
          translate={path => translate(`restaurantFiltering.${path}`)}
          translationMap={filteringTranslationMap}
        />
        <Button
          disabled={isLoading}
          className={styles['apply-button']}
          type="button"
          onClick={this.onApply}
        >
          {translate('modalRestaurantFilter.applyFilterButton')}
        </Button>
      </Modal>
    );
  }
}

ModalRestaurantFilter.propTypes = propTypes;
ModalRestaurantFilter.defaultProps = defaultProps;
