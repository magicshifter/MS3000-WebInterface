export const clampNumberInputValue =
  (e, max, min) => {
    e.target.value = Math.max(Math.min(min, e.target.value), max);
  };

export const onFormSubmit =
  (e, action = () => {}, fields = []) => {
    const { elements } = e.target;

    const values = {};

    Object.keys(elements).forEach(key => {
      const ele = elements[key];
      if (ele.name && fields.indexOf(ele.name) > -1) {
        const val =
          ele.type === 'number'
          ? parseInt(ele.value, 10)
          : ele.value;

        values[ele.name] = val;
      }
    });

    action(values);

    e.preventDefault();
    return false;
  };

export const normalizeMin =
  (value, previousValue, allValues, previousAllValues) => {
    if (allValues.min !== previousAllValues.min) {
      if (value === undefined || Number(allValues.min) > Number(value)) {
        return allValues.min;
      }
    }

    return value;
  };

export const normalizeMax =
  (value, previousValue, allValues, previousAllValues) => {
    if (allValues.max !== previousAllValues.max) {
      // max changed
      if (value === undefined || Number(allValues.max) < Number(value)) {
        return allValues.max;
      }
    }
    return value;
  };

export const normalizeMinMax =
  (value, previousValue, allValues, previousAllValues) => {
    value = normalizeMax(value, previousValue, allValues, previousAllValues);
    value = normalizeMin(value, previousValue, allValues, previousAllValues);

    return value;
  };
