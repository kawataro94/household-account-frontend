import React from 'react';
import { Loader } from 'rsuite';
import { withRouter } from "react-router-dom";

import Center from '../components/Center';
import { center } from './style';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.log(error);
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      const { history } = this.props;
      const redirectMsg = (
        <div>
          <div>ログイン情報がありません。</div>
          <div>数秒後にサインインページに移動します。</div>
        </div>
      );

      setTimeout(() => {
        history.push('/signin');
      }, 10000);
      return (
        <Center>
          <div css={center}>
            <Loader size='md' speed='slow' content={redirectMsg} vertical />
          </div>
        </Center>
      );
    }

    return this.props.children;
  }
}

export default withRouter(ErrorBoundary);