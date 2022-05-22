export const createElement = (
  elementType: string,
  elementAttr: object = [],
  innerText: string = ""
): HTMLElement => {
  const elementDom = document.createElement(elementType);
  for (const key in elementAttr) {
    if (Object.prototype.hasOwnProperty.call(elementAttr, key)) {
      const value = elementAttr[key];
      if (key !== "events") {
        elementDom.setAttribute(key, value);
      }
    }
  }
  if (elementAttr["events"]) {
    for (const eventName in elementAttr["events"]) {
      if (
        Object.prototype.hasOwnProperty.call(elementAttr["events"], eventName)
      ) {
        const fn = elementAttr["events"][eventName];
        elementDom.addEventListener(eventName, fn);
      }
    }
  }

  if(innerText !== "") elementDom.innerText = innerText;

  return elementDom;
};

export const setAttributesToElementType = (inputHandlerElement, attributes) : HTMLElement  => {
  for (const attr in attributes) {
    if (Object.prototype.hasOwnProperty.call(attributes, attr)) {
      const value = attributes[attr];
      inputHandlerElement.setAttribute(attr, value);
    }
  }

  return inputHandlerElement;
}

export const getAttrElementType = ({ attributes, attributesType, attributeName, attributeValue, component}) : HTMLElement => {
  //Default input type="text"
  let inputHandlerElement = (createElement('input', {
    class: 'attr-input',
    type: "text",
    name: attributeName,
    value: attributeValue,
    events: {
      'change': ({ target }) => {
        component.set({
          attributes: {
            ...attributes,
            [attributeName]: target.value
          }
        });
      }
    }
  }));

  if(!attributesType){
    return inputHandlerElement;
  }

  if(attributesType.attributes) inputHandlerElement = setAttributesToElementType(inputHandlerElement, attributesType.attributes);

  switch (attributesType.type) {
    case 'string':
      return inputHandlerElement;
    case 'number':
      inputHandlerElement.setAttribute('type', 'number');
      return inputHandlerElement;
    case"select": 
    inputHandlerElement = (createElement('select', {
      class: 'attr-input',
      name: attributeName,
      value: attributeValue,
      events: {
        'change': ({ target }) => {
          component.set({
            attributes: {
              ...attributes,
              [attributeName]: target.value
            }
          });
        }
      }
    }));
    let {options} = attributesType
    options.forEach(obj => {
      let option = createElement('option', {
        value: obj.value
      },
        obj.label
      );
      inputHandlerElement.append(option);
    });
    return inputHandlerElement;

    default:
      return inputHandlerElement;
  }
}