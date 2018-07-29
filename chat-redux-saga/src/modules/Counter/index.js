import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Controls from './Controls';

import { connect } from 'react-redux';
// @ts-ignore
import styles from './index.scss';

class Counter extends Component {
    static propTypes = {
        count: PropTypes.number
    }

    render() {
        const { count } = this.props;
        return (
            <div className={styles.counter}>
                <div>{count}</div>
                <Controls />
                <hr />
                <span>
                    <a href='https://github.com/Gigacore/React-Redux-Starter'>Fork it onbhj Github</a>
                </span>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        count: state.count
    }
}

export default connect(
    mapStateToProps,
    undefined
)(Counter)