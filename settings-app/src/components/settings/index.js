import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  input: {
    fontSize: '24px',
  },
  label: {
    fontSize: '20px',
  },
}));

const Settings = ({
  account, reg, integration, setToken,
}) => {
  const classes = useStyles();

  const [tokenValue, setTokenValue] = useState('');

  const handleChange = ({ target }) => {
    setTokenValue(target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setToken(tokenValue);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          disabled={integration}
          label="Token"
          placeholder="Enter token here"
          margin="normal"
          fullWidth
          value={tokenValue}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
            className: classes.label,
          }}
          InputProps={{
            className: classes.input,
          }}
        />

        {integration && (
          <>
            <TextField
              disabled
              label="Account"
              margin="normal"
              fullWidth
              value={account}
              InputLabelProps={{
                shrink: true,
                className: classes.label,
              }}
              InputProps={{
                className: classes.input,
              }}
            />
            <TextField
              disabled
              label="Reg#"
              margin="normal"
              fullWidth
              value={reg}
              InputLabelProps={{
                shrink: true,
                className: classes.label,
              }}
              InputProps={{
                className: classes.input,
              }}
            />
          </>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="small"
          startIcon={<SaveIcon />}
          disabled={integration}
          style={{ marginTop: '15px' }}
        >
          Confirm
        </Button>
      </form>
    </div>
  );
};

export default Settings;
