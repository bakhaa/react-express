import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import { graphql, compose } from 'react-apollo';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Button from '@material-ui/core/Button';

// icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { updateTodoMutation } from './graphql';

class Todo extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { autosave: false };

    this.onChangeExpanded = this.onChangeExpanded.bind(this);
    this.isChanged = this.isChanged.bind(this);
    this.isExpanded = this.isExpanded.bind(this);
    this.getShortDescription = this.getShortDescription.bind(this);
  }

  async componentWillReceiveProps(nextProps) {
    const { item, expandedId, handleSubmit } = this.props;
    if (item._id === expandedId && item._id !== nextProps.expandedId && this.isChanged()) {
      this.setState({ autosave: true });
      await handleSubmit();
      setTimeout(() => this.setState({ autosave: false }), 200);
    }
  }

  async onChangeExpanded() {
    const { item, onChange } = this.props;

    onChange(item._id);
  }

  isChanged() {
    const { item, values } = this.props;

    const isChangedText = item.text !== values.text;
    const isChangedDescription = item.description !== values.description;
    const isChangedCompleted = item.completed !== values.completed;

    return isChangedText || isChangedDescription || isChangedCompleted;
  }

  isExpanded() {
    const { item, expandedId } = this.props;
    const { autosave } = this.state;

    return autosave || item._id === expandedId;
  }

  getShortDescription(str) {
    const shortLength = 25;
    let description = str;

    if (str.length > shortLength) {
      description = str.slice(0, shortLength).concat('...');
    }
    return description;
  }

  render() {
    const { item, values, handleChange, handleSubmit, isSubmitting, handleReset } = this.props;

    return (
      <ExpansionPanel expanded={this.isExpanded()} onChange={this.onChangeExpanded}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Checkbox
            style={{ padding: 0, marginRight: 7 }}
            checked={values.completed}
            onChange={handleChange}
            name="completed"
            color="primary"
          />
          {this.isExpanded() ? (
            <TextField
              style={{
                width: 'calc(50% - 28px)',
                height: 30,
                margin: 0,
                fontSize: 12,
              }}
              id="outlined-bare"
              value={values.text}
              name="text"
              onChange={handleChange}
              placeholder="Enter text"
              margin="normal"
              autoFocus
            />
          ) : (
            <React.Fragment>
              <Typography style={{ fontSize: 16, flexBasis: '50%', flexShrink: 0 }}>
                {item.text}
              </Typography>
              {!!item.description.length && (
                <Typography style={{ color: '#0000008a', fontStyle: 'italic' }}>
                  {this.getShortDescription(item.description)}
                </Typography>
              )}
            </React.Fragment>
          )}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <TextField
            id="description"
            label="Notices"
            style={{ width: '50%', paddingLeft: 3 }}
            multiline
            rowsMax="7"
            rows="4"
            value={values.description}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button
            disabled={!this.isChanged() && !isSubmitting}
            onClick={handleReset}
            variant="outlined"
            size="small"
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            disabled={!this.isChanged() && !isSubmitting}
            onClick={handleSubmit}
            variant="outlined"
            size="small"
            color="primary"
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    );
  }
}

Todo.propTypes = {
  item: PropTypes.object.isRequired,
  expandedId: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  handleReset: PropTypes.func.isRequired,
};

export default compose(
  graphql(updateTodoMutation),
  withFormik({
    mapPropsToValues: ({ item }) => ({
      text: item.text,
      description: item.description,
      completed: item.completed,
    }),
    handleReset: ({ props: { item }, resetForm }) => {
      resetForm({ text: item.text, description: item.description, completed: item.completed });
    },
    handleSubmit: async (values, { props: { mutate, item }, setSubmitting, resetForm }) => {
      if (values.text === '') {
        setSubmitting(false);
        return;
      }
      await mutate({
        variables: {
          _id: item._id,
          text: values.text,
          completed: values.completed,
          description: values.description,
        },
      });
      resetForm();
      setSubmitting(false);
    },
  }),
)(Todo);
