const card = () => {
  interface ICreateItemProps {
    tag: string
    className?: string
    text?: string
    src?: string
    alt?: string
  }

  interface IProduct {
    img: string
    altimg: string
    title: string
    descr: string
    price: number
  }

  class Card {
    src: string
    alt: string
    title: string
    description: string
    price: number
    parent: Element
    classes: string[]
    private transfer = 27

    constructor(
      src: string,
      alt: string,
      title: string,
      description: string,
      price: number,
      parent: string,
      ...classes: string[]
    ) {
      this.src = src
      this.alt = alt
      this.title = title
      this.description = description
      this.price = price
      this.parent = document.querySelector(parent)!
      this.convertToRub()
      this.classes = classes
    }

    convertToRub() {
      this.price *= this.transfer
    }

    createCardItem({ tag, className, text, src, alt }: ICreateItemProps) {
      const item = document.createElement(tag)
      if (className) {
        item.classList.add(className)
      }
      if (text) {
        item.textContent = text
      }
      if (src && alt && item instanceof HTMLImageElement) {
        item.src = src
        item.alt = alt
      }

      return item
    }

    render() {
      const card = this.createCardItem({ tag: 'div', className: 'menu__item' })
      const img = this.createCardItem({
        tag: 'img',
        src: this.src,
        alt: this.alt,
      })
      const title = this.createCardItem({
        tag: 'h3',
        className: 'menu__item-subtitle',
        text: this.title,
      })
      const description = this.createCardItem({
        tag: 'div',
        className: 'menu__item-descr',
        text: this.description,
      })
      const divider = this.createCardItem({
        tag: 'div',
        className: 'menu__item-divider',
      })
      const price = this.createCardItem({
        tag: 'div',
        className: 'menu__item-price',
      })
      const cost = this.createCardItem({
        tag: 'div',
        className: 'menu__item-cost',
        text: 'Цена',
      })
      const total = this.createCardItem({
        tag: 'div',
        className: 'menu__item-total',
        text: ' руб/день',
      })
      const span = this.createCardItem({
        tag: 'span',
        text: String(this.price),
      })

      this.classes.forEach((className) => card.classList.add(className))

      total.prepend(span)
      price.append(cost, total)
      card.append(img, title, description, divider, price)

      this.parent.append(card)
    }
  }

  const getProducts = async (): Promise<IProduct[]> => {
    const response = await fetch('http://localhost:3000/menu')

    return await response.json()
  }

  getProducts().then((data) => {
    data.forEach(({ img, altimg, title, descr, price }) => {
      new Card(img, altimg, title, descr, price, '.menu .container').render()
    })
  })
}

export default card
