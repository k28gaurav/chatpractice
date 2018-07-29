import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './index.scss';

import { incrementNum, decrementNum, resetCounter } from 'actions/counterActions';

class Controls extends Component {

    handleIncrement = () => {
        this.props.dispatch(incrementNum());
    }

    handleDecrement = () => {
        this.props.dispatch(decrementNum());
    }

    handleResetCount = () => {
        this.props.dispatch(resetCounter(0));
    }

    render() {

        const {
            resetLabel,
            incrementLabel,
            decrementLabel
        } = this.props;


        return (
            <div className={styles.controls}>
                <div onClick={this.handleIncrement}>
                    <span>{incrementLabel}</span>
                </div>
                <div onClick={this.handleResetCount}>
                    <span>{resetLabel}</span>
                </div>
                <div onClick={this.handleDecrement}>
                    <span>{decrementLabel}</span>
                </div>
            </div>
        );
    }
}

Controls.propTypes = {
    dispatch: PropTypes.func,
    resetLabel: PropTypes.string,
    incrementLabel: PropTypes.string,
    decrementLabel: PropTypes.string
};

Controls.defaultProps = {
    resetLabel: 'RESET',
    incrementLabel: '+',
    decrementLabel: '-'
};

export default connect((state) => { state })(Controls)
