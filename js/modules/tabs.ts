const tabs = (
  tabSelector: string,
  tabActiveSelector: string,
  tabContentSelector: string,
  tabsParentSelector: string
) => {
  const tabsParent: HTMLElement = document.querySelector(tabsParentSelector)!
  const tabs: NodeListOf<HTMLElement> = tabsParent.querySelectorAll(tabSelector)
  const tabContent: NodeListOf<HTMLElement> =
    document.querySelectorAll(tabContentSelector)

  const hideTabContent = () => {
    tabContent.forEach((item) => ((item as HTMLElement).style.display = 'none'))

    tabs.forEach((item) => item.classList.remove(tabActiveSelector))
  }

  const showTabContent = (idx = 0) => {
    tabContent[idx].style.display = 'block'
    tabs[idx].classList.add(tabActiveSelector)
  }

  tabsParent?.addEventListener('click', (e: Event) => {
    if (e.target instanceof Element) {
      if (e.target && e.target.classList.contains(tabSelector))
        tabs.forEach((tab, idx) => {
          if (e.target === tab) {
            hideTabContent()
            showTabContent(idx)
          }
        })
    }
  })

  hideTabContent()
  showTabContent()
}

export default tabs
