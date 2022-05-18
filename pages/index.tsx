import type { NextPage } from 'next'

import Editor from './Editor';

const Home: NextPage = () => {
  return (
    <div className="container">
      <Editor />
    </div>
  )
}

export default Home
