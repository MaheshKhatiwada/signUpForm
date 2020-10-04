import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";
import "../signUpForm.css";

class SignUpForm extends Component {
  state = {
    data: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      occupation: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    firstName: Joi.string().alphanum().required().label("FirstName"),
    lastName: Joi.string().required().label("LastName"),
    username: Joi.string().alphanum().required().label("Username"),
    email: Joi.string().email().required().label("Email"),
    occupation: Joi.string().required().label("Occupation"),
    password: Joi.string().required().label("Password"),
  };
  options = [
    { id: 1, job: "coder", label: "Coder" },
    { id: 2, job: "designer", label: "Designer" },
    { id: 3, job: "manager", label: "Manager" },
    { id: 4, job: "ceo", label: "CEO" },
  ];

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return null;
    //call the server
    console.log("Submitted");
  };
  render() {
    const { data, errors } = this.state;
    return (
      <div className='container'>
        <h1>Sign Up</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name='firstName'
            value={data.firstName}
            onChange={this.handleChange}
            id='firstName'
            label='FirstName'
            placeholder='Your first name'
            error={errors.firstName}
          />
          <Input
            name='lastName'
            value={data.lastName}
            onChange={this.handleChange}
            id='lastName'
            label='LastName'
            placeholder='Your last name'
            error={errors.lastName}
          />
          <Input
            name='username'
            value={data.username}
            onChange={this.handleChange}
            id='username'
            label='Username'
            placeholder='username'
            error={errors.username}
          />
          <Input
            name='email'
            value={data.email}
            onChange={this.handleChange}
            id='email'
            label='Email'
            placeholder='Please, enter your email'
            error={errors.email}
          />

          <Select
            name='occupation'
            value={data.occupation}
            onChange={this.handleChange}
            id='occupation'
            options={this.options}
            label='Occupation'
            error={errors.occupation}
          />
          <Input
            name='password'
            value={data.password}
            onChange={this.handleChange}
            id='password'
            placeholder='Password'
            error={errors.password}
          />

          <button disabled={this.validate()} className='btn btn-primary'>
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}

export default SignUpForm;
