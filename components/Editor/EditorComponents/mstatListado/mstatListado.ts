import { validateNumber, validateString } from "../validators";

const mstatListado = function (editor) {
  editor.DomComponents.addType("mstat-listado", {
    // Make the editor understand when to bind `my-input-type`
    isComponent: (el) =>
      el.tagName === "DIV" && el.dataset.tipo === "mstat-listado",
    // Model definition
    model: {
      // Default properties
      defaults: {
        attributesType: {
          /* type: {
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
          }, */
          ["data-tipo"]: {
            type: "string",
            attributes: {
              readonly: "readonly",
            },
          },
          ['data-marcar_fila']: { 
            type: 'boolean'
          },
          ['allow_import']: { 
            type: 'boolean'
          },
          ['data-escuchar_cambios']: { 
            type: 'boolean'
          },
          ['allow_export']: { 
            type: 'boolean'
          },
          ['allow_group']: { 
            type: 'boolean'
          },
          ['allow_columnchoose']: { 
            type: 'boolean'
          },
          ['allow_columnfix']: { 
            type: 'boolean'
          },
          ['allow_search']: { 
            type: 'boolean'
          },
          ['allow_filter']: { 
            type: 'boolean'
          },
          ['allow_insert']: { 
            type: 'boolean'
          },
          ['allow_multi_insert']: { 
            type: 'boolean'
          },
          ['allow_delete']: { 
            type: 'boolean'
          },
          ['allow_update']: { 
            type: 'boolean'
          },
          ['allow_check']: { 
            type: 'boolean'
          }
        },
        tagName: "div",
        attributes: {
          // Default attributes
          "allow_import":"",
          "form_create":"",
          "form_edit":"",
          "class":"",
          "data-traer-datos-init":"",
          "data-marcar_fila":"",
          "data-alias":"",
          "data-escuchar_cambios":"",
          "ata-valores_formulario":"",
          "allow_export":"",
          "allow_group":"",
          "allow_columnchoose":"",
          "allow_columnfix":"",
          "allow_search":"",
          "allow_filter":"",
          "allow_insert":"",
          "allow_multi_insert":"",
          "allow_delete":"",
          "allow_update":"",
          "allow_check":"",
          "data-events":"",
        },
        components: `
        <table class="table">
              <thead>
                  <tr>
                      <th>Column n</th>
                      <th>Column n</th>
                      <th>Column n</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td scope="row">data example</td>
                      <td>data example</td>
                      <td>data example</td>
                  </tr>
                  <tr>
                      <td scope="row">data example</td>
                      <td>data example</td>
                      <td>data example</td>
                  </tr>
              </tbody>
          </table>    
            `,
      },
    },
  });
};

export default mstatListado;
