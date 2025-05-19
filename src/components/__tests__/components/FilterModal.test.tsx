import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import FilterModal from '../../UI/FilterModal';
import {FilterModalProps} from '../../../types/types';

describe('FilterModal', () => {
  it('opens modal and applies empty filters', () => {
    const onApply = jest.fn();

    const {getByText} = render(
      <FilterModal filters={{status: [], species: []}} onApply={onApply} />,
    );

    fireEvent.press(getByText('FILTER'));

    fireEvent.press(getByText('APPLY'));

    expect(onApply).toHaveBeenCalledWith({status: [], species: []});
  });

  it('opens modal and applies selected filters', () => {
    const onApply = jest.fn();

    const filters: FilterModalProps['filters'] = {
      status: ['Alive'],
      species: ['Human'],
    };

    const {getByText} = render(
      <FilterModal filters={filters} onApply={onApply} />,
    );

    fireEvent.press(getByText('FILTER'));

    fireEvent.press(getByText('APPLY'));

    expect(onApply).toHaveBeenCalledWith(filters);
  });
});
