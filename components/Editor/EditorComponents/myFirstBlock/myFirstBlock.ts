import { validateNumber, validateString } from "../validators";

type attributesType = {
  type: string;
  isRequired: boolean;
  validate: Function;
  categorie?: string;
};

export const myFirstBlock = function (editor) {
  editor.DomComponents.addType("my-first-block", {
    // Make the editor understand when to bind `my-input-type`
    isComponent: (el) => el.tagName === "DIV",
    // Model definition
    model: {
      // Default properties
      defaults: {
        attributesType: {
          type: {
            type: "string",
            isRequired: true,
            validate: validateString,
          },
          name: {
            type: "select",
            isRequired: false,
            validate: validateString,
            options: [
              {
                label: "Gervis B.",
                value: "gervis",
              },
              {
                label: "Nico F.",
                value: "nico",
              },
              {
                label: "Juan R.",
                value: "juan",
              },
            ],
          },
          placeholder: {
            type: "string",
            isRequired: false,
            validate: validateString,
          },
          color: {
            type: "radio",
            isRequired: false,
            validate: () => {},
            options: [
              {
                value: "red",
                label: "Red",
              },
              {
                value: "blue",
                label: "Blue",
              },
              {
                value: "yellow",
                label: "Yellow",
              },
              {
                value: "green",
                label: "Gren",
              },
            ],
          },
          min: {
            type: "number",
            isRequired: false,
            validate: validateNumber,
            attributes: {
              min: "0",
              max: "10",
            },
          },
        },
        tagName: "div",
        attributes: {
          // Default attributes
          type: "text",
          name: "default-name",
          placeholder: "Insert text here",
          ["data-valores-formularios"]: "valor-de-la-propiedad",
          ["data-valores-nico"]: "valor-de-la-propiedad",
          min: "0",
          color: "green",
        },
        components: `
              <h1>Header test</h1>
              <p>Paragraph test</p>
            `,
      },
    },
  });
};
