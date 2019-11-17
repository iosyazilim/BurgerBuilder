import React from 'react';
import Modal from '../../UI/Modal/Modal';
import Aux from '../HocAux/HighOrderAux';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.reqInterceptor = axios.interceptors.request.use(request => {
        this.setState({
          error: null
        });
        return request;
      });
      this.resInterceptor = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({
            error: error
          });
        }
      );

      this.state = {
        error: null
      };
    }

    componentWillUnmount() {
        console.log('Will Unmount', this.reqInterceptor, this.resInterceptor);
        axios.interceptors.request.eject(this.reqInterceptor);
        axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({
        error: null
      });
    };

    render() {
        const {error} = this.state;
      return (
        <Aux>
          <Modal
            show={error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};
export default withErrorHandler;
