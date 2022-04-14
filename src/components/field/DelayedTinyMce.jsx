import React from 'react';
import PropTypes from 'prop-types';
import PageLoader from '../../components/PageLoader';

class DelayedTinyMce extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hidden: true };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ hidden: false });
    }, this.props.waitBeforeShow);
  }

  render() {
    return this.state.hidden ? (
      <div>
        <PageLoader />
      </div>
    ) : (
      this.props.children
    );
  }
}

DelayedTinyMce.propTypes = {
  waitBeforeShow: PropTypes.number.isRequired
};

export default DelayedTinyMce;
