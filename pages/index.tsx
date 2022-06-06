import type { NextPage } from 'next'

import Editor from '../components/Editor/Editor';

const Home: NextPage = () => {

  const html = `<div allow_import="false" form_create="" form_edit="" name="INI_USUARIOS_PER" class="table table-hover col-12 col-xl-12 templateTest tabla-wrapper" data-tipo="mstat-listado" data-traer-datos-init="true" data-marcar_fila="false" data-alias="INI_USUARIOS_PER" data-escuchar_cambios="false" data-valores_formulario="" allow_export="true" allow_group="false" allow_columnchoose="false" allow_columnfix="false" allow_search="true" allow_filter="true" allow_insert="true" allow_multi_insert="false" allow_delete="true" allow_update="false" allow_check="false" data-events=""></div>`;

  return (
    <div className="container">
      <Editor html={html}/>
    </div>
  )
}

export default Home
