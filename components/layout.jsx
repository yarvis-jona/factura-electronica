
const Layout = ({children}) => {
  return (
    <div>
        <header>
            <h3>Logo</h3>
            <h3>Factura Electronica</h3>
        </header>
            {children}
        <footer>
            <h5>Derechos Reservados {new Date().getFullYear()}</h5>
        </footer>
    </div>
  )
}

export default Layout