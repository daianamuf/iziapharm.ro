export default {
  name: 'product', // The name of the schema
  title: 'Product', // The title of the schema, for display purposes
  type: 'document', // Indicates this is a document schema
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string', // Text input
      validation: (Rule) => Rule.required().max(80), // Makes this field required
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'productCode',
      title: 'Product Code',
      type: 'string',
      validation: (Rule) => Rule.required().max(15),
    },
    {
      name: 'prescription',
      title: 'Prescription',
      type: 'boolean', // Checkbox input
      description: 'Check if the product requires a prescription',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'blockContent', // Multi-line text input
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number', // Number input
      validation: (Rule) => Rule.required().min(0), // Price must be a positive number
    },
    {
      name: 'field',
      title: 'Field',
      type: 'reference', // References another document
      to: [{type: 'medicalField'}],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'administration',
      title: 'Administration',
      type: 'reference',
      to: [{type: 'routeOfAdministration'}],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array', // Allows for an array of items
      of: [{type: 'image'}], // Each item in the array is an image
      options: {
        hotspot: true, // Enables image cropping and hotspot selection
      },
      validation: (Rule) => Rule.required(),
    },
  ],
}
