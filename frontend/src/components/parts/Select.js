import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import CreatableSelect from 'react-select/creatable';
import styled from 'styled-components';
import Color from 'color';

const createSelectTheme = graspTheme => {
  /*
      neutral0: background color
      neutral5: disabled background
      neutral10: disabled border
      neutral20: normal border
      neutral30: border on hover
      neutral40: chevron no focus on hover, disabled entry text
      neutral50: select font placeholder text
      neutral60: chevron focus no hover
      neutral70:
      neutral80: enter text in input box
      neutral90:
      primary: chevron focus and hover, border focused
    */
  return {
    colors: {
      neutral90: Color(graspTheme.colors.surface.normal.font)
        .alpha(0.9)
        .string(),
      neutral80: Color(graspTheme.colors.surface.normal.font)
        .alpha(0.8)
        .string(),
      neutral70: Color(graspTheme.colors.surface.normal.font)
        .alpha(0.7)
        .string(),
      neutral60: Color(graspTheme.colors.surface.normal.font)
        .alpha(0.6)
        .string(),
      neutral50: Color(graspTheme.colors.surface.normal.font)
        .alpha(0.5)
        .string(),
      neutral40: Color(graspTheme.colors.surface.normal.font)
        .alpha(0.4)
        .string(),
      neutral30: Color(graspTheme.colors.surface.normal.font)
        .alpha(0.3)
        .string(),
      neutral20: Color(graspTheme.colors.surface.normal.font)
        .alpha(0.2)
        .string(),
      neutral10: Color(graspTheme.colors.surface.normal.font)
        .alpha(0.1)
        .string(),
      neutral5: Color(graspTheme.colors.surface.normal.font)
        .alpha(0.05)
        .string(),
      neutral0: graspTheme.colors.surface.normal.background,
      primary: graspTheme.colors.vantage.normal.background,
      primary75: Color(graspTheme.colors.vantage.normal.background)
        .alpha(0.75)
        .string(),
      primary50: Color(graspTheme.colors.vantage.normal.background)
        .alpha(0.5)
        .string(),
      primary25: Color(graspTheme.colors.vantage.normal.background)
        .alpha(0.25)
        .string(),
    },
  };
};

const Creatable = ({ disableDropdown, ...props }) => {
  return disableDropdown ? (
    <CreatableSelect
      components={{
        DropdownIndicator: null,
      }}
      menuIsOpen={false}
      isClearable={true}
      {...props}
    />
  ) : (
    <CreatableSelect {...props} />
  );
};

Creatable.propTypes = { disableDropdown: PropTypes.bool };

export const Select = styled(({ className, creatable, ...props }) => {
  const customStyles = {
    placeholder: provided => ({
      ...provided,
      fontStyle: 'italic',
    }),
  };
  return creatable ? (
    <Creatable
      className={className}
      classNamePrefix={className}
      theme={props.selectTheme}
      styles={customStyles}
      {...props}
    />
  ) : (
    <ReactSelect
      className={className}
      classNamePrefix={className}
      theme={props.selectTheme}
      styles={customStyles}
      {...props}
    />
  );
}).attrs(props => ({
  selectTheme: createSelectTheme(props.theme),
}))`
  flex-grow: ${props => props.flexGrow};
  font-family: ${props => props.theme.type.normal};
  color: ${props => props.theme.colors.surface.normal.font};
  width: ${props => props.width};
`;

export default Select;
