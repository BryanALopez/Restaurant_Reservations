import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createTable } from '../utils/api';
import ErrorAlert from '../layout/ErrorAlert';

function FormComponent() {
  const initialFormState = {
    table_name: "",
    capacity: 0,
  };

  const history = useHistory();
  const [formData, setFormData] = useState({ ...initialFormState });
  const [error, setError] = useState('');

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleCancel = () => history.go(-1);
  const handleSubmit = async event => {
    event.preventDefault();

    const abortController = new AbortController();
    const newTable = formData;
    newTable.capacity = parseInt(formData.capacity, 10);
    newTable.is_seated = false;
    createTable(newTable, abortController.signal)
      .then(() => history.push(`/dashboard`))
      .catch(err => setError(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="table_name" onChange={handleChange} value={formData.table_name} minLength='2' required/>
        <input name="capacity" onChange={handleChange} value={formData.capacity} type='number' min='1' required/>
        <button type="submit">Submit</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
      <ErrorAlert error={error} />
    </div>
  );
}

export default FormComponent;
