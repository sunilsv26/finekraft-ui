import { Component } from "react";


class ErrorBoundry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    componentDidCatch(error, errorInfo) {
        console.error(error, errorInfo);
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h2>Something went wrong.</h2>
                    <p>Please try again later.</p>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundry;