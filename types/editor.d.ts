type pageHTMLObjectType = {
  props: any;
  children: Array<pageHTMLObjectType>;
};

type pageModelType = {
  key: string;
  text: string;
  path: string;
  icono: string;
  roles: string;
  menu: string;
  children: [];
  pantalla: pageHTMLObjectType;
  orden: number;
};

type grapesjsModelType = {
  type: string;
  classes?: Array<string>;
  content: string;
};

type pageJsonType = {
  type: string;
  attributes?: object;
  components?: Array<pageJsonType>;
  tagName?: string;
  content?: string;
};
