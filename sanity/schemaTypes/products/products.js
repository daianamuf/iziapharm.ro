export default {
  name: 'product', // The name of the schema
  title: 'Product', // The title of the schema, for display purposes
  type: 'document', // Indicates this is a document schema
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string', // Text input
      validation: (Rule) => Rule.required(), // Makes this field required
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
      name: 'category',
      title: 'Category',
      type: 'reference', // References another document
      to: [{type: 'category'}], // Assumes you have a 'category' schema defined
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array', // Allows for an array of items
      of: [{type: 'image'}], // Each item in the array is an image
      options: {
        hotspot: true, // Enables image cropping and hotspot selection
      },
    },
  ],
}
