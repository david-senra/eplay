import { TagContainer, PropsTag } from './styles'

const Tag = ({ children, size = 'small' }: PropsTag) => (
  <TagContainer size={size}>{children}</TagContainer>
)

export default Tag
