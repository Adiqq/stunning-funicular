import React from 'react';

export const ReadOnlyInputField = ({ label, value }) => (
  <div className="field is-horizontal">
    <div className="field-label is-normal">
      <label className="label">{label}</label>
    </div>
    <div className="field-body">
      <div className="field">
        <p className="control">
          <input
            className="input is-static"
            type="email"
            value={value}
            readOnly
          />
        </p>
      </div>
    </div>
  </div>
);
