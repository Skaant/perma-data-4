export default props =>
  _id =>
    props.extracts.find(extract =>
      extract._id === _id)