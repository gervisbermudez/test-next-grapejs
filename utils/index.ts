export const createElement = (
  elementType: string,
  elementAttr: object = [],
  innerText: string = ""
): HTMLElement => {
  const elementDom = document.createElement(elementType);
  if (innerText !== "") elementDom.innerText = innerText;

  for (const key in elementAttr) {
    if (Object.prototype.hasOwnProperty.call(elementAttr, key)) {
      const value = elementAttr[key];
      if (key === "children") {
        let arrayChildrenNodes: Array<HTMLElement> = [];
        value.forEach((element) => {
          arrayChildrenNodes.push(
            createElement(
              element.elementType,
              element.elementAttr,
              element.innerText
            )
          );
        });
        arrayChildrenNodes.forEach((element) => {
          elementDom.append(element);
        });
      } else if (key !== "events") {
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

  return elementDom;
};

export const setAttributesToElementType = (
  inputHandlerElement,
  attributes
): HTMLElement => {
  for (const attr in attributes) {
    if (Object.prototype.hasOwnProperty.call(attributes, attr)) {
      const value = attributes[attr];
      inputHandlerElement.setAttribute(attr, value);
    }
  }

  return inputHandlerElement;
};

export const getAttrElementType = ({
  attributes,
  attributesType,
  attributeName,
  attributeValue,
  component,
}): HTMLElement => {
  //Default input type="text"
  let inputHandlerElement = createElement("input", {
    class: "attr-input-text",
    type: "text",
    name: attributeName,
    value: attributeValue,
    events: {
      change: ({ target }) => {
        component.set({
          attributes: {
            ...attributes,
            [attributeName]: target.value,
          },
        });
      },
    },
  });

  if (!attributesType) {
    return inputHandlerElement;
  }

  if (attributesType.attributes)
    inputHandlerElement = setAttributesToElementType(
      inputHandlerElement,
      attributesType.attributes
    );

  switch (attributesType.type) {
    case "string":
      return inputHandlerElement;
    case "number":
      inputHandlerElement.setAttribute("class", "attr-input-number");
      inputHandlerElement.setAttribute("type", "number");
      return inputHandlerElement;
    //Booleans definitios for inputs values as true | false
    case "boolean":
      inputHandlerElement = createElement(
        "label",
        {
          for: attributeName,
          children: [
            {
              elementType: "input",
              elementAttr: {
                class: "attr-input-boolean",
                type: "checkbox",
                name: attributeName,
                value: attributeValue,
                checked: attributeValue === 'true' ? "checked" : false,
                id: attributeName,
                events: {
                  change: ({ target }) => {
                    console.log("change checkbox", target.checked);
                    component.set({
                      attributes: {
                        ...attributes,
                        [attributeName]: target.checked ? "true" : "false",
                      },
                    });
                  },
                },
              },
            },
          ],
        }
      );

      return inputHandlerElement;
    case "select":
      inputHandlerElement.setAttribute("class", "attr-input-select");
      inputHandlerElement = createElement("select", {
        class: "attr-input",
        name: attributeName,
        value: attributeValue,
        events: {
          change: ({ target }) => {
            component.set({
              attributes: {
                ...attributes,
                [attributeName]: target.value,
              },
            });
          },
        },
      });
      {
        let { options } = attributesType;
        options.forEach((obj) => {
          let option = createElement(
            "option",
            {
              value: obj.value,
            },
            obj.label
          );
          inputHandlerElement.append(option);
        });
      }
      return inputHandlerElement;
    case "radio":
      inputHandlerElement = createElement("div", {
        class: "attr-input-radio input-radio-container",
        name: attributeName,
        value: attributeValue,
      });

      {
        let { options } = attributesType;
        options.forEach((obj) => {
          let option = createElement("div", {
            children: [
              {
                elementType: "input",
                elementAttr: {
                  type: "radio",
                  name: attributeName,
                  value: obj.value,
                  id: obj.value,
                  events: {
                    change: ({ target }) => {
                      component.set({
                        attributes: {
                          ...attributes,
                          [attributeName]: target.value,
                        },
                      });
                    },
                  },
                },
              },
              {
                elementType: "label",
                elementAttr: {
                  for: obj.value,
                },
                innerText: obj.label,
              },
            ],
          });

          inputHandlerElement.append(option);
        });
      }
      return inputHandlerElement;

    default:
      return inputHandlerElement;
  }
};
