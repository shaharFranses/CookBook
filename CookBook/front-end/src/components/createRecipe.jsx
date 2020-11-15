import React, { Component } from 'react';
import PageHeader from "./common/pageHeader";
import * as Yup  from "yup"
import recipeService from "../services/recipeService";
import { toast } from "react-toastify";
import {  Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import '../styles/recipeForm.css'

class CreateRecipe extends Component {
  state = {};
  schema =Yup.object().shape( {
    recipeName: Yup.string().min(2,'your recipe name must be atleast 2 chracters').max(255,'name is too long').required('your recipe name is required'),
    recipeDescription: Yup.string().min(2,'your recipe Descripition must be atleast 2 chracters').max(1024 ,'description is too long').required('your recipe Description is required'),
    recipeIngredients: 
    Yup.array().of(
      Yup.string().min(2).max(999).required('your ingredient name must have 2 letters at least')).required('you must  have ingrediants')
    ,
    recipeTime: Yup.string().min(2).max(255).required('the time of making your recipe is requirde'),
    recipeComplexity: Yup.string().min(2,"your recipe complexity must have at least 2 charcters ").max(255).required('the complexity of your recipe is required'),
    numberOfPlates: Yup.string().max(255).required('the number of plates your recipe will produce is required'),
    recipeImage: Yup.string().min(11,"your image url must be at least 11 charcters").max(1024).required('please enter a link to a photo of your recipe'),
    recipeDirections: Yup.array().of(
      Yup.string().min(5).max(999).required('your  Direction  must have 5 letters at least')).required('you must write a directions to your recipe')
    
  });

  render() {
    return (
      <React.Fragment>
      <PageHeader className='text-center' titleText='New Recipe Creation '></PageHeader>
      <div className='container form-group formDesign'>
  
    <Formik
      initialValues={{recipeName:'',recipeDescription:'',recipeTime:'',recipeComplexity:'',numberOfPlates:'',recipeImage:''
      ,recipeDirections:['','',''], recipeIngredients:['','',''] }}


        validationSchema={this.schema}
          onSubmit={ async (values) => {
            await recipeService.createRecipe(values);
           toast("Recipe Created");
            this.props.history.replace("/my-recipes");
           }}

        render={({ handleSubmit,
        handleChange,
        values,
        touched,
        errors, }) => (
        <Form >
        
            <Field className='my-2 mx-2 form-control' name='recipeName' id='recipename' placeholder='Recipe Name'></Field>
            <ErrorMessage name="recipeName" className='errornote' component="div" />
          

            <Field className='my-2 mx-2 form-control' name='recipeDescription' id='recipeDescription' placeholder='Recipe Description'></Field>
            <ErrorMessage name="recipeDescription" className='errornote' component="div"  />

            <Field className='my-2 mx-2 form-control' name='recipeTime' id='recipeTime' placeholder='Recipe Time' ></Field>
            <ErrorMessage name="recipeTime" className='errornote' component="div" />

          
         
            <Field  className='my-2 mx-2 form-control' name='recipeComplexity' id='recipeComplexity' placeholder='Recipe Complexity' ></Field>
            <ErrorMessage name="recipeComplexity" className='errornote' component="div" />

            <Field  className='my-2 mx-2 form-control' name='numberOfPlates' id='numberOfPlates' placeholder='Number Of Plates'></Field>
            <ErrorMessage name="numberOfPlates" className='errornote' component="div" />

            <Field  className='my-2 mx-2 form-control' name='recipeImage' id='recipeImage' placeholder='Recipe photo' ></Field>
            <ErrorMessage name="recipeImage"  className='errornote' component="div"/>

             
              <div className="row">
          <FieldArray
            name="recipeIngredients"
            render={arrayHelpers => (
          
              <div className='col'>
                  <h2>Recipe ingrediants</h2>
                { values.recipeIngredients.length > 0 ? (
                  values.recipeIngredients.map((recipeIngredients, index) => (
                    
                    <div  key={index}>
                         <Field style={{margin:8+'px'}} name={`recipeIngredients.[${index}]`} placeholder={`Ingrediant number ${index+1}`} className='form-control'  />
                         <ErrorMessage  name={`recipeIngredients.[${index}]`}  >{msg => <div className='errornote my-1'>your ingredient name must have 2 letters at least</div>}</ErrorMessage>
                         <button
                    className='btn btn-success ml-2'
                      type="button"
                      onClick={() => arrayHelpers.insert(index)} // insert an empty string at a position
                    >
                      +
                    </button>
                    <button className='btn btn-danger mx-1'
                      type="button"
                      onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                    >
                      -
                    </button>
                    
               
                    </div>
                  
                  ))
                ) : (
                  <button type="button" onClick={() => arrayHelpers.push('')}>
                    {/* show this when user has removed all friends from the list */}
                    Add an ingerdiant
                  </button>
                )}
              <ErrorMessage  name={`recipeIngredients`} >{msg => <div className='errornote'>your recipe must have at least one ingredient </div>}</ErrorMessage>
              </div>
            )}
          />
         
          <FieldArray
          name="recipeDirections"
          render={arrayHelpers => (
            <div className='col'>
                <h2 >Recipe Directions</h2>
              { values.recipeDirections.length > 0 ? (
                values.recipeDirections.map((recipeDirections, index) => (
                  <div key={index}>
                       <Field style={{margin:8+'px'}} name={`recipeDirections.[${index}]`} placeholder={`Direction number ${index+1}`}   className='form-control'  />
                       <ErrorMessage  name={`recipeDirections.[${index}]`}  >{msg => <div className='errornote my-1'>your Direction name must have 5 letters at least</div>}</ErrorMessage>
                       <button
                    className='btn btn-success mx-1'
                      type="button"
                      onClick={() => arrayHelpers.insert(index)} // insert an empty string at a position
                    >
                      +
                    </button>
                    <button className='btn btn-danger'
                      type="button"
                      onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                    >
                      -
                    </button>
                   
                    
                  </div>

                ))
              ) : (
                <button type="button" onClick={() => arrayHelpers.push('')}>
                  {/* show this when user has removed all friends from the list */}
                  Add a Direction
                </button>
                
              )}
              <div>
              <ErrorMessage  name={`recipeDirections`}  >{msg => <div className='errornote my-1'>your recipe must have at least one Direction </div>}</ErrorMessage>
              </div>
              
            </div>
            
          )}
          
        />
        </div>
        <div className="container text-center">
        <button className=' orangeButton my-5 mx-5' type="submit">Submit</button>
        </div>
        </Form>
      )}
    />
  </div>
  </React.Fragment>
    );
  }
}

export default CreateRecipe;
