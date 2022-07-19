interface IChildren {
  title: string
  index: string
  auth?: number
  children?: Array<IChildren>
}

interface IMenu {
  title: string
  index: string
  auth?: number
  icon?: string
  children?: Array<IChildren>
}

interface IPaths {
  name: string
  url: string
  query: Dict
}

export { IChildren, IMenu, IPaths }
