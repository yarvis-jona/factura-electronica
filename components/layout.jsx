import Image from 'next/image'
import Link from 'next/link'
import style from '../styles/Layout.module.css'

const Layout = ({children}) => {
  return (
    <div className={style.altura}>
      <div className={style.parent}>
          <header className="fondo-header">
              <Link href='/'>
                <a>
                  <Image
                    src="/logo.png"
                    alt="Logo de la empresa"
                    width={80}
                    height={80}
                  />
                </a>
              </Link>
            <p className='fuente fuente-familia-titulo fuente-xl fuente-bold fuente-secundary'>FACTURACIÓN ELECTRONICA</p>
          </header>
          <main className={`fondo-main ${style.desborde}`}>
              {children}
          </main>
          <footer className="fondo-footer">
              <h5 className='fuente fuente-familia-contenido fuente-secundary'>@Derechos Reservados {new Date().getFullYear()}</h5>
          </footer>
      </div>
    </div>
  )
}

export default Layout