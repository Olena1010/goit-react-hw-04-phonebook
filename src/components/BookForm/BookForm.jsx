import React from "react";
import PropTypes from "prop-types";
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Form, FormField, Field, ErrorMessage, SubmitButton } from "./BookForm.styled"
import { nanoid } from 'nanoid';


const BookSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
  number: Yup.string()
    .min(6, 'Too Short!')
    .max(20, 'Too Long!')
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required('Required'),
});

export const BookForm = ({ onAddContact }) => {
  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={BookSchema}
      onSubmit={(values, actions) => {
        onAddContact({ ...values, id: nanoid() });
        actions.resetForm();
      }}
    >
      <Form>
        <FormField>
          Name
          <Field name="name" placeholder="Enter the name of the contact" />
          <ErrorMessage name="name" component="div" />
        </FormField>
        <FormField>
          Number
          <Field
            name="number"
            placeholder="Enter the contact's phone number"
            type="tel"
          />
          <ErrorMessage name="number" component="div" />
        </FormField>
        <SubmitButton type="submit">Add contact</SubmitButton>
      </Form>
    </Formik>
  );
};

BookForm.protoType = {
  onAddContact: PropTypes.func.isRequired,
};