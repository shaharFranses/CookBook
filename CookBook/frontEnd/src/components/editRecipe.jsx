import React, { Component } from 'react';
import PageHeader from "./common/pageHeader";
import recipeService from "../services/recipeService";
import { toast } from "react-toastify";
import {  Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup  from "yup"
import '../styles/recipeForm.css'
class EditRecipe extends Component {
  state = {
    data: {
      recipeName: "",
      recipeDescription: "",
      recipeIngredients: [],
      recipeTime: "",
      recipeComplexity: "",
      numberOFplates: "",
      recipeImage: "",
      recipeDirections: [],
    },
    errors: {},
  };

  schema =Yup.object().shape( {
    recipeName: Yup.string().min(2,'your recipe name must be atleast 2 chracters').max(255,'name is too long').required('your recipe name is required'),
    recipeDescription: Yup.string().min(2,'your recipe name must be atleast 2 chracters').max(1024 ,'description is too long').required('your recipe Description is required'),
    recipeIngredients: 
    Yup.array().of(
      Yup.string().min(2).max(999).required('your ingredient name must have 2 letters at least')).required('you must  have ingrediants')
    ,
    recipeTime: Yup.string().min(2).max(255).required('the time of making your recipe is requirde'),
    recipeComplexity: Yup.string().min(2).max(255).required('the complexity of your recipe is required'),
    numberOfPlates: Yup.string().min(2).max(255).required('the numbe of plates your recipe will produce is required '),
    recipeImage: Yup.string().min(11).max(1024).required('please enter a link to a photo of your recipe'),
    recipeDirections: Yup.array().of(
      Yup.string().min(5).max(999).required('your  name must have 5 letters at least')).required('you must write a directions to your recipe')
    
  });

  async componentDidMount() {
    const recipeId = this.props.match.params.id;
    const { data } = await recipeService.getRecipe(recipeId);
    this.setState({ data: this.mapToViewModel(data) });
  }

  mapToViewModel(recipe) {
    return {
      _id: recipe._id,
      recipeName: recipe.recipeName,
      recipeDescription: recipe.recipeDescription,
      recipeIngredients: recipe.recipeIngredients,
      recipeTime: recipe.recipeTime,
      recipeComplexity: recipe.recipeComplexity,
      numberOfPlates: recipe.numberOfPlates,
      recipeImage: recipe.recipeImage,
      recipeDirections: recipe.recipeDirections,
    };
  }

  doSubmit = async () => {
    const { data } = this.state;
    await recipeService.editRecipe(data);
    toast("Recipe is Updated");
    this.props.history.replace("/my-recipes");
  };

  handleCancel = () => {
    this.props.history.push("/my-recipes");
  };

  render() {
    const {data}=this.state
    return (
      <React.Fragment>
      <PageHeader className='text-center' titleText='Edit Recipe  '></PageHeader>
      <div className="container recipeDiv my-2 textfont">
    <div className="row mb-2">
      <div className="col-lg-1 col-md-2 col-sm-2 ">
    
      </div>
   
      <div className="col-lg-1 col-md-2 col-sm-2 d-flex justify-content-end ">
        
      </div>
    </div>

    <div className="row">
      <div className="col-lg-4 col-sm-12">
        <p  className='line'>Time :<span className='subline'> {data.recipeTime}</span></p>
        <p className='line'>Complexity :<span className='subline'> {data.recipeComplexity}</span></p>
        <p className='line'>Number of plates :<span className='subline'>{data.numberOfPlates}</span> </p>
    <p className='line'>Description :<span className='subline'> {data.recipeDescription}</span></p>
      </div>
      <div className="col-lg-4 col-sm-12">
        <h3 className='line'>Ingrediants</h3>
        <ul>
          {data.recipeIngredients.map((ingridient, index) => (
            <li key={index}>{ingridient}</li>
          ))}
        </ul>
      </div>
      <div className="col-lg-4 col-sm-12">
        <img
          className="dishimg mr-auto my-2"
          src={data.recipeImage}
          alt={data.recipeName}
        />
      </div>
    </div>
   
  
    <Formik
      initialValues={{recipeName:'',recipeDescription:'',recipeTime:'',recipeComplexity:'',numberOfPlates:'',recipeImage:''
      ,recipeDirections:['','',''], recipeIngredients:['','',''] }}


        validationSchema={this.schema}
          onSubmit={ async (values) => {
            await recipeService.createRecipe(values);
           toast("Recipe is Updated");
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
        
        <button className='my-5 mx-5' type="submit">Submit</button>
        </Form>
      )}
    />
  </div>
  </React.Fragment>
    );
  }
}

export default EditRecipe;
