import {defineField, defineType} from 'sanity'

// Define schema for 'medicalField'
export default defineType({
  name: 'medicalField',
  title: 'Medical Field',
  type: 'document',
  fields: [
    defineField({
      name: 'fieldName',
      title: 'Field Name',
      type: 'string',
    }),
  ],
})
