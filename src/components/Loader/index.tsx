import { PacmanLoader } from 'react-spinners'
import { ContainerLoader } from './styles'
import { Cores } from '../../styles'

const Loader = () => {
  return (
    <ContainerLoader>
      <PacmanLoader color={Cores.branca} />
    </ContainerLoader>
  )
}

export default Loader
