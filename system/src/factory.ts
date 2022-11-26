import { UIFactory, DOMElements, StyledOptions, HTMLUIComponents, UIComponent, styled } from './'

const factory = () => {
  const cache = new Map<DOMElements, UIComponent<DOMElements>>()

  return new Proxy(styled, {
    apply: (target, thisArg, [el, options]: [DOMElements, StyledOptions]) => {
      return styled(el, options)
    },

    get: (target, el: DOMElements) => {
      if (!cache.has(el)) cache.set(el, styled(el))

      return cache.get(el)
    },
  }) as unknown as UIFactory & HTMLUIComponents
}

export const ui = factory()
