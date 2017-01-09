/* global describe, it, expect */

import React from 'react';
import { mount } from 'enzyme';
import ReactInputSuggest from '../src/index';

describe('<ReactInputSuggest />', () => {
  it('Should render default component', () => {
    const renderedComponent = mount(
      <ReactInputSuggest />,
    );

    expect(renderedComponent.props().addTagKeys).toEqual([13, 9, 32]);
    expect(renderedComponent.props().removeTagKeys).toEqual([8, 27]);
    expect(renderedComponent.props().keyArrowDown).toBe(40);
    expect(renderedComponent.props().keyArrowUp).toBe(38);
    expect(renderedComponent.props().isSuggestList).toBe(false);
    expect(renderedComponent.props().tags).toEqual([]);
    expect(renderedComponent.props().suggestions).toEqual([]);
    expect(renderedComponent.props().suggestionValueName).toBe('name');
    expect(renderedComponent.props().placeholder).toBe('Add new tag');
  });
});
