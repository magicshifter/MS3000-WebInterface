import classes from 'styles/icons.scss';

import { isObject, isString } from 'utils/types';

export const getIconCssClass =
  icon => {
    let classArray = [classes['icon']];
    if (isObject(icon)) {
      Object.keys(icon).forEach(key => {
        classArray.push(classes[icon[key]]);
      });
    } else if (isString(icon)) {
      classArray.push(classes[icon]);
    }

    return classArray.join(' ');
  };

export const getIconCssClassObject =
  icon => ({
    className: getIconCssClass(icon),
  });
