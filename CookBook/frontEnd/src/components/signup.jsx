import React , {Component} from "react";
import PageHeader from "./common/pageHeader";
import http from "../services/httpService";
import { apiUrl } from "../config.json";
import { toast } from "react-toastify";
import * as Yup  from "yup"
import {  Formik, Form, Field, ErrorMessage } from 'formik';


class Signup extends Component {
  state = {
    errors: ''
    };
    schema =Yup.object().shape( {
      email: Yup.string().required("You must enter an email").email(),
      password: Yup.string().required('You must enter a password').min(6, 'Your password must be atleast 6 charcters'),
      name: Yup.string()
      .required('You must enter your  name')
      .min(2)
      ,
      userImage: Yup.string().required().url('Your image must be a valid url')
     
    });

  render() {
    return (
      <React.Fragment>
     
      
     <PageHeader titleText='Sign Up'></PageHeader>
      <div className=' mt-2  container form-group formDesign'>
     
       <Formik
        initialValues={{email:'',password:'',}}
       validationSchema={this.schema}
           onSubmit={ async (values)  => {
             try {
               await http.post(`${apiUrl}/users`, values);
               toast("A new acoount is opened");
               this.props.history.replace("/signin");
             } catch (ex) {
               if (ex.response && ex.response.status === 400) {
                 this.setState({ errors: { email: "Email is taken" } });
               }
             }
           }}

        render={() => (
        <Form className='text-center' >
        
            <Field className='my-2 mx-2 form-control' name='email' id='email' placeholder='email'></Field>
            <ErrorMessage name="email" className='errornote' component="div" />
          
            <Field className='my-2 mx-2 form-control' type='password' name='password' id='password' placeholder='password'></Field>
            <ErrorMessage name="password" className='errornote' component="div"  />

            <Field className='my-2 mx-2 form-control'  name='name' id='name' placeholder='name'></Field>
            <ErrorMessage name="name" className='errornote' component="div"  />

            <Field className='my-2 mx-2 form-control'  name='userImage' id='userImage' placeholder='your Image - must be a url'></Field>
            <ErrorMessage name="userImage" className='errornote' component="div"  />

        <button className='my-5 mx-5 orangeButton  ' type="submit">Submit</button>
        </Form>
      )}
    />
  </div>
  </React.Fragment>
    );
  }
}

export default Signup;
