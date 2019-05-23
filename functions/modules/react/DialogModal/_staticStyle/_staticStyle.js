export default `
  .content-display p,
  .content-display h1,
  .content-display h3 {
    width: 100%;
    max-width: 600px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }

  .content-display h1 {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .content-display .img > img {
    max-height: 50vh;
    margin: auto;
  }
  
  .content-display .img:not(.first) {
    margin-top: 1rem;
  }
  
  .content-display .img:not(.last) {
    margin-bottom: 1.5rem;
  }`