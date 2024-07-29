import PropTypes from 'prop-types';

const AppSSR = ({ children, bootStrapCSS }) => {
	return (
		<html>
		<head>
			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			{
				bootStrapCSS.map(cssPath => <link key={cssPath} rel="stylesheet" href={cssPath}></link>)
			}
		</head>
		<body>
		<div className="row me-1 app-container">
			<div className="col-lg-2" id="global-side-nav-placeholder"></div>
			<div className="col-lg-10 mt-3" id="component-mount">{children}</div>
		</div>
		</body>
		</html>
)
}

AppSSR.propTypes = {
	bootStrapCSS: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default AppSSR;