/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React, { createRef, useCallback, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import MobileDetect from 'mobile-detect'
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import withRouterAndRef from 'components/core/withRouterAndRef'

/*******************************************************************************************************/
// Verificamos si el dispositivo es un móvil //
/*******************************************************************************************************/
const md = new MobileDetect(window.navigator.userAgent)
const isMobile = md.mobile()

/*******************************************************************************************************/
// Nombres por cada envento //
/*******************************************************************************************************/
const handlerNameByEvent = {
  'ps-scroll-y': 'onScrollY',
  'ps-scroll-x': 'onScrollX',
  'ps-scroll-up': 'onScrollUp',
  'ps-scroll-down': 'onScrollDown',
  'ps-scroll-left': 'onScrollLeft',
  'ps-scroll-right': 'onScrollRight',
  'ps-y-reach-start': 'onYReachStart',
  'ps-y-reach-end': 'onYReachEnd',
  'ps-x-reach-start': 'onXReachStart',
  'ps-x-reach-end': 'onXReachEnd'
}
Object.freeze(handlerNameByEvent)

/*******************************************************************************************************/
// Definimos los estilos //
/*******************************************************************************************************/
const useStyles = makeStyles(theme => ({
  root: {}
}))

/*******************************************************************************************************/
// Definimos el componente de las Barras de Scroll //
/*******************************************************************************************************/
const Scrollbars = React.forwardRef((props, ref) => {
  ref = ref || createRef()
  const ps = useRef(null)
  const handlerByEvent = useRef(new Map())
  const classes = useStyles()
  const { customScrollbars } = props

  const hookUpEvents = useCallback(() => {
    Object.keys(handlerNameByEvent).forEach(key => {
      const callback = props[handlerNameByEvent[key]]
      if (callback) {
        const handler = () => callback(ref.current)
        handlerByEvent.current.set(key, handler)
        ref.current.addEventListener(key, handler, false)
      }
    })
  }, [ref, props])

  const unHookUpEvents = useCallback(() => {
    handlerByEvent.current.forEach((value, key) => {
      if (ref.current) {
        ref.current.removeEventListener(key, value, false)
      }
    })
    handlerByEvent.current.clear()
  }, [ref])

  const destroyPs = useCallback(() => {
    unHookUpEvents()
    if (!ps.current) {
      return
    }
    ps.current.destroy()
    ps.current = null
  }, [unHookUpEvents])

  const createPs = useCallback(() => {
    if (isMobile || !ref || ps.current) {
      return
    }
    ps.current = new PerfectScrollbar(ref.current, props.option)
    hookUpEvents()
  }, [hookUpEvents, props.option, ref])

  useEffect(() => {
    function updatePs() {
      if (!ps.current) {
        return
      }
      ps.current.update()
    }
    updatePs()
  })

  useEffect(() => {
    if (customScrollbars) {
      createPs()
    } else {
      destroyPs()
    }
  }, [createPs, customScrollbars, destroyPs])

  const scrollToTop = useCallback(() => {
    if (ref && ref.current) {
      ref.current.scrollTop = 0
    }
  }, [ref])

  useEffect(() => {
    if (props.scrollToTopOnChildChange) {
      scrollToTop()
    }
  }, [scrollToTop, props.children, props.scrollToTopOnChildChange])

  useEffect(
    () =>
      props.history.listen(() => {
        if (props.scrollToTopOnRouteChange) {
          scrollToTop()
        }
      }),
    [scrollToTop, props.history, props.scrollToTopOnRouteChange]
  )

  useEffect(
    () => () => {
      destroyPs()
    },
    [destroyPs]
  )

  // Renderizamos el componente
  return (
    <div
      id={props.id}
      className={clsx(classes.root, props.className)}
      style={
        props.customScrollbars && (props.enable || true) && !isMobile
          ? {
              position: 'relative',
              overflow: 'hidden'
            }
          : {}
      }
      ref={ref}
    >
      {props.children}
    </div>
  )
})

/*******************************************************************************************************/
// Exportamos el componente memorizado //
/*******************************************************************************************************/
function mapStateToProps({ settings }) {
  return {
    customScrollbars: settings.customScrollbars
  }
}

/*******************************************************************************************************/
// Definimos los tipos de propiedades del componente //
/*******************************************************************************************************/
Scrollbars.propTypes = {
  onScrollY: PropTypes.func,
  onScrollX: PropTypes.func,
  onScrollUp: PropTypes.func,
  onScrollDown: PropTypes.func,
  onScrollLeft: PropTypes.func,
  onScrollRight: PropTypes.func,
  onYReachStart: PropTypes.func,
  onYReachEnd: PropTypes.func,
  onXReachStart: PropTypes.func,
  onXReachEnd: PropTypes.func,
  scrollToTopOnRouteChange: PropTypes.bool,
  scrollToTopOnChildChange: PropTypes.bool
}

/*******************************************************************************************************/
// Definimos las propiedades por defecto del componente //
/*******************************************************************************************************/
Scrollbars.defaultProps = {
  className: '',
  enable: true,
  scrollToTopOnChildChange: false,
  scrollToTopOnRouteChange: false,
  option: {
    wheelPropagation: true
  },
  ref: undefined,
  onScrollY: undefined,
  onScrollX: undefined,
  onScrollUp: undefined,
  onScrollDown: undefined,
  onScrollLeft: undefined,
  onScrollRight: undefined,
  onYReachStart: undefined,
  onYReachEnd: undefined,
  onXReachStart: undefined,
  onXReachEnd: undefined
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default connect(mapStateToProps, null, null, { forwardRef: true })(
  withRouterAndRef(Scrollbars)
)
