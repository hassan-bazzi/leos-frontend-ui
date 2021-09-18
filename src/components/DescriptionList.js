import React from 'react';
import PropTypes from 'prop-types';
import { TextField, MaskedTextField, SelectField, AddressFieldGroup } from './Fields';

export function DescriptionListItem({ term, description, fieldName, editMode, maskType, inputType, selectOptions }) {
  return (
    <>
      {term &&
        <dt className='w-1/2 text-sm font-medium leading-none text-left text-gray-500'>{term}</dt>
      }
      {description && !editMode &&
        <dd className='w-1/2 mt-1 text-sm leading-none text-right text-gray-900 sm:mt-0 sm:col-span-2'>{description}</dd>
      }
      {description && editMode && !inputType &&
        <div className='-mt-3'>
          <TextField name={fieldName} initialValue={description} />
        </div>
      }
      {description && editMode && inputType === 'masked' &&
        <MaskedTextField name={fieldName} initialValue={description} maskType={maskType} />
      }
      {description && editMode && inputType === 'select' &&
        <SelectField name={fieldName} initialValue={description} options={selectOptions} />
      }
      {description && editMode && inputType === 'address' &&
        <AddressFieldGroup name={fieldName} />
      }
    </>
  );
}

DescriptionListItem.defaultProps = {
  term: '',
  description: ''
};

const propTypes = {
  header: PropTypes.string.isRequired,
  subHeader: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.object)
};

const defaultProps = {
  subHeader: null,
  children: []
}

export function DescriptionList({ header, subHeader, children }) {
  const descriptionListItems = (listItems) => {
    const formattedItems = [];
    let highlightItem = false;

    if (!Array.isArray(listItems)) {
      listItems = [listItems];
    }

    listItems.forEach(listItem => {
      if (listItem.type.name === 'DescriptionListItem') {
        let formattedItem = <div />;
        if (!highlightItem) {
          formattedItem = <div className='px-4 py-5 bg-gray-100 sm:flex-row sm:flex sm:justify-between sm:px-6 '>{listItem}</div>;
        } else {
          formattedItem = <div className='px-4 py-5 bg-white sm:flex-row sm:flex sm:justify-between sm:px-6 '>{listItem}</div>;
        }

        formattedItems.push(formattedItem);
        highlightItem = !highlightItem;
      }
    });

    return (
      <dl>
        {formattedItems}
      </dl>
    );
  };

  return (
    <div className='min-h-full overflow-hidden bg-white shadow sm:rounded-lg'>
      <div className='px-4 py-5 border-b border-gray-200 sm:px-6'>
        {header &&
          <h3 key='description-list-header' className='text-lg font-medium text-gray-900 leading-6'>
            {header}
          </h3>
        }
        {subHeader &&
          <p className='max-w-2xl mt-1 text-sm text-gray-500 leading-5'>
            {subHeader}
          </p>
        }
      </div>
      <div>
        {descriptionListItems(children)}
      </div>
    </div>
  )
}

DescriptionList.propTypes = propTypes;
DescriptionList.defaultProps = defaultProps;
