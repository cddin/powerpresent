// -- upload photo
FS.debug = true;
FS.HTTP.setBaseUrl('uploads');

Images = new FS.Collection("images", {
  stores: [
    // new FS.Store.FileSystem("thumbs", { transformWrite: createThumb }),
    new FS.Store.GridFS("images")
    // new FS.Store.FileSystem("images")
  ],
  filter: {
    allow: {
      contentTypes: ['image/*'] //allow only images in this FS.Collection
    }
  }
});