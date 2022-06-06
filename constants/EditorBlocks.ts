const EditorBlocks = [
  {
    id: "listado",
    label: "Listado",
    content: {
      type: "mstat-listado",
    },
    category: "Basic",
  },
  {
    id: "section", // id is mandatory
    label: "<b>Section</b>", // You can use HTML/SVG inside labels
    attributes: { class: "gjs-block-section" },
    content: `<section>
                  <h1>This is a simple title</h1>
                  <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
                </section>`,
  },
  {
    id: "text",
    label: "Text",
    content: '<div data-gjs-type="text">Insert your text here</div>',
  },
];

export default EditorBlocks;

export const examplePageObject: pageModelType = {
  key: "108d4816-3907-11ea-b82b-102400010008",
  text: "Provincias",
  path: "/abm/provincias_lst#251573bb",
  icono: "",
  children: [],
  roles: "ADMIN,CONSULTA_LOCALIDAD,GESTION_LOCALIDAD",
  pantalla: {
    props: {
      key: "17f4bd66-e073-4ecb-bbf4-3d12b75a39e8",
      name: "3",
      type: "form",
      class: ["col-12", "col-xl-12", "templateTest", "formespecifico"],
      "data-tipo": "simpleform",
      "data-tabla": "CNT_PERSONAS",
      formaction: "",
      "data-mapping": "",
      "data-comp_agrupados": "true",
    },
    children: [
      {
        props: {
          html: "\n\t",
          type: "html",
        },
        children: [],
      },
      {
        props: {
          key: "f742a4b7-1300-49b0-974b-967368ac4d75",
          name: "PROVINCIAS_LST",
          type: "table",
          class: [
            "table",
            "table-hover",
            "col-12",
            "col-xl-12",
            "templateTest",
            "tabla-wrapper",
          ],
          "data-tipo": "mstat-listado",
          form_edit: "",
          "data-alias": "PROVINCIAS_LST",
          allow_check: "false",
          allow_group: "false",
          "data-events": "",
          form_create: "",
          allow_delete: "false",
          allow_export: "true",
          allow_filter: "true",
          allow_import: "false",
          allow_insert: "false",
          allow_search: "true",
          allow_update: "false",
          allow_columnfix: "false",
          "data-marcar_fila": "false",
          allow_columnchoose: "false",
          allow_multi_insert: "false",
          "data-escuchar_cambios": "true",
          "data-traer-datos-init": "true",
          "data-valores_formulario": "",
        },
        children: [],
      },
      {
        props: {
          html: "\n",
          type: "html",
        },
        children: [],
      },
    ],
  },
  menu: "MENU_ABM_3",
  orden: 110,
};

export const examplePageJson: Array<pageJsonType> = [
  {
    type: "my-first-block",
    attributes: {
      type: "text",
      name: "default-name",
      placeholder: "Insert text here",
      "data-valores-formularios": "valor-de-la-propiedad",
      "data-valores-nico": "valor-de-la-propiedad",
      min: "0",
      color: "green",
    },
    components: [
      {
        tagName: "h1",
        type: "text",
        components: [{ type: "textnode", content: "Header test" }],
      },
      {
        tagName: "p",
        type: "text",
        components: [{ type: "textnode", content: "Paragraph test" }],
      },
    ],
  },
];

const castBlockTypes = (strType): string => {
  let blockTypes = {
    "mstat-listado": "my-first-block",
  };
  return blockTypes[strType] ? blockTypes[strType] : "div";
};

export const pageModelToGrapesjsModel = ({
  props,
  children,
}: pageHTMLObjectType): Array<pageJsonType> => {
  let components = [];

  children.forEach((element) => {
    components.push(pageModelToGrapesjsModel({ ...element })[0]);
  });

  let pageJson = {
    type: castBlockTypes(props['data-tipo']),
    attributes: { ...props },
    components,
    content: ""
  };

  return [pageJson];
};

export const grapesjsModelToPageModel = (obj: Array<pageJsonType>) => {};
