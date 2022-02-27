import React , { Component }  from "react";
import PageHeader from "./common/pageHeader";
import * as Yup  from "yup"
import {  Formik, Form, Field, ErrorMessage } from 'formik';
import userService from "../services/userService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
class Signin extends Component {
  state = {
  errors: ''
  };
  schema =Yup.object().shape( {
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(6).label("Password")
   
  });


  render() {
    return (
      <React.Fragment>
     
      <div className="container">
       <h2 className='text-center navDiv p-3'>hey and welcome to CookBook !</h2>
     <p className='textfont'>  In order to enjoy our great App you need to sign in. </p>
     <p className='textfont'>dont have a password yet ? <Link to='/signup'>no worries sign up here ! </Link> </p>

      </div>
     
      <div className='container form-group formDesign'>
<PageHeader titleText='Sign In'></PageHeader>
    <Formik
      initialValues={{email:'',password:'',}}

        validationSchema={this.schema}
           onSubmit={ async (values)  => {
              const {email,password}=values
                   try  {
                    await userService.login(email,password)
                   window.location = "/";
                         }
                   catch(ex){
                  if (ex.response && ex.response.status === 400) {
                  await  this.setState({ errors: { email: ex.response.data } });
                  toast(this.state.errors.email)
                         }}
              }}

        render={() => (
        <Form className='text-center' >
        
            <Field className='my-2 mx-2 form-control' name='email' id='email' placeholder='email'></Field>
            <ErrorMessage name="email" className='errornote' component="div" />
          
            <Field className='my-2 mx-2 form-control' type='password' name='password' id='password' placeholder='password'></Field>
            <ErrorMessage name="password" className='errornote' component="div"  />

        <button className='my-5 mx-5 orangeButton ' type="submit">Submit</button>
        </Form>
      )}
    />
  </div>
  </React.Fragment>
    );
  }
}

export default Signin;
