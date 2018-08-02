import { Theme, WithStyles, withStyles } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import ProgressBar from 'react-progress-bar-plus';
import 'react-progress-bar-plus/lib/progress-bar.css';

const styles = (theme: Theme) => ({
  root: {
    '& .react-progress-bar-percent': {
      backgroundColor: theme.palette.primary.light,
      boxShadow: `0 0 10px ${theme.palette.primary.light}, 0 0 5px ${
        theme.palette.primary.light
      }`,
    },
  },
});

interface Props extends WithStyles<typeof styles> {
  isLoading?: boolean;
}

class Progress extends React.PureComponent<Props> {
  public static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
  };

  public render() {
    return (
      <ProgressBar
        autoIncrement
        spinner={false}
        percent={this.props.isLoading === true ? 20 : 100}
        className={this.props.classes.root}
      />
    );
  }
}

export default withStyles(styles)(Progress);
