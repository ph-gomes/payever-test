export const fileFactory = (): Express.Multer.File => ({
  originalname: 'sample.name',
  mimetype: 'sample.type',
  path: 'sample.url',
  buffer: Buffer.from('any_thing'),
  size: 100,
  destination: 'sample.destination',
  filename: 'sample.filename',
  fieldname: 'sample.fieldname',
  stream: null,
  encoding: 'sample.encoding',
});
