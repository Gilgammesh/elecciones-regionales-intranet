/*******************************************************************************************************/
// Importamos las dependencias //
/*******************************************************************************************************/
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Animate from 'components/core/Animate'
import LoginLeft from './LoginLeft'
// import LoginLeft from './LoginLeft_';
// import LoginLeft from './LoginLeft__';
import LoginRight from './LoginRight'
import background from 'assets/images/backgrounds/login-bg.jpg'

/*******************************************************************************************************/
// Definimos los estilos del componente //
/*******************************************************************************************************/
const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    backgroundColor: '#f6f7f9',
    color: 'rgba(0, 0, 0, 0.87)',
    '&.boxed': {
      maxWidth: 1280,
      margin: '0 auto',
      boxShadow: theme.shadows[3]
    },
    '&.scroll-body': {
      '& $wrapper': {
        height: 'auto',
        flex: '0 0 auto',
        overflow: 'auto'
      },
      '& $contentWrapper': {},
      '& $content': {}
    },
    '&.scroll-content': {
      '& $wrapper': {},
      '& $contentWrapper': {},
      '& $content': {}
    },
    '& .navigation': {
      '& .list-subheader-text, & .list-item-text, & .item-badge, & .arrow-icon': {
        transition: theme.transitions.create('opacity', {
          duration: theme.transitions.duration.shortest,
          easing: theme.transitions.easing.easeInOut
        })
      }
    }
  },
  wrapper: {
    display: 'flex',
    position: 'relative',
    width: '100%',
    height: '100%',
    flex: '1 1 auto'
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    zIndex: 3,
    overflow: 'hidden',
    flex: '1 1 auto'
  },
  content: {
    position: 'relative',
    display: 'flex',
    overflow: 'auto',
    flex: '1 1 auto',
    flexDirection: 'column',
    width: '100%',
    '-webkit-overflow-scrolling': 'touch',
    zIndex: 2
  },
  section: {
    backgroundImage: `url(${background})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    color: '#FFFFFF'
  }
}))

/*******************************************************************************************************/
// Definimos la Vista del componente Login //
/*******************************************************************************************************/
const LoginView = () => {
  // Instanciamos los estilos
  const styles = useStyles()

  // Renderizamos el componente
  return (
    <div id="app-layout" className={clsx(styles.root, 'fullwidth', 'scroll-content')}>
      <div className="flex flex-1 flex-col overflow-hidden relative">
        <div className={styles.wrapper}>
          <div className={styles.contentWrapper}>
            <div className={styles.content}>
              <div
                className={clsx(
                  styles.section,
                  'flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24'
                )}
              >
                <Animate animation="transition.expandIn">
                  <div className="flex w-full max-w-400 md:max-w-3xl rounded-12 shadow-2xl overflow-hidden">
                    <LoginLeft />
                    <LoginRight />
                  </div>
                </Animate>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/*******************************************************************************************************/
// Exportamos el componente //
/*******************************************************************************************************/
export default LoginView
