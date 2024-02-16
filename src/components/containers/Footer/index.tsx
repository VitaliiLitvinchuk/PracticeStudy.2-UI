
const Footer = () => {
    return (
        <div className='text-center mt-10 bg-dark'>
            <div className="container">
                <footer className="text-center text-lg-start">
                    <div className="container d-flex justify-content-center py-5">
                        <button type="button" className="btn btn-primary btn-lg btn-floating mx-2" >
                            <i className="fa fa-facebook-f"></i>
                        </button>
                        <button type="button" className="btn btn-danger btn-lg btn-floating mx-2" >
                            <i className="fa fa-youtube"></i>
                        </button>
                        <button type="button" className="btn btn-primary btn-lg btn-floating mx-2" style={{ background: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)" }} >
                            <i className="fa fa-instagram"></i>
                        </button>
                        <button type="button" className="btn btn-info btn-lg text-light btn-floating mx-2" >
                            <i className="fa fa-twitter"></i>
                        </button>
                    </div>
                    <div className="text-center text-white p-3" >
                        © {new Date().getFullYear()} Copyright
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default Footer;