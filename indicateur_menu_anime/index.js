const menu = document.querySelector('.menu');
const menuItems = Array.from(menu.querySelectorAll('a'));
let activeItem = menu.querySelector('[aria-selected]')

// eviter les querySelector()
const indicators = new Map()

menuItems.forEach( item => {
  const span = document.createElement('span');
  span.classList.add('indicator'); 
  indicators.set(item, span)
  item.appendChild(span)
})

/**
 * 
 * @param {HTMLElement} fromElement 
 * @param {HTMLElement} toElement 
 * @return {string}
 */
function getTransform (fromElement, toElement) {
  const fromRect = fromElement.getBoundingClientRect()
  const toRect = toElement.getBoundingClientRect()

  const transform = {
    x: fromRect.x - toRect.x,
    y: fromRect.y - toRect.y,
    scaleX: fromRect.width / toRect.width,
    scaleY: fromRect.height / toRect.height
  }
  
  return `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${transform.scaleX}, ${transform.scaleY})`
}

/**
 * @param {{currentTarget: HTMLElement}} e
 */
function onItemClick(e) {
  if (e.currentTarget === activeItem) {
    return;
  }

  activeItem?.removeAttribute('aria-selected');
  e.currentTarget.setAttribute('aria-selected', 'true')

  if (activeItem) {
    // const prevIndicator =  activeItem.querySelector('.indicator');
    // const currentIndicator = e.currentTarget.querySelector('.indicator');
    const prevIndicator =  indicators.get(activeItem)
    const currentIndicator = indicators.get(e.currentTarget)

    currentIndicator.animate([
      {transform: getTransform(prevIndicator, currentIndicator)},
      {transform: 'transform3d(0, 0, 0), scaleX(1, 1)'}
    ], {
      fill: 'none',
      duration: 600,
      easing: 'cubic-bezier(.48,1.55,.28,1)'
    })
  }

  activeItem = e.currentTarget
}

menuItems.forEach( item => {
  item.addEventListener('mouseover', onItemClick)
})