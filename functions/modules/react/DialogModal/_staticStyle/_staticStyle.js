export default `
  @font-face {
    font-family: dayRoman;
    src: url('/font--day_roman/DAYROM__.ttf')
  }

  .content-display {
    font-size: 1.2rem;
  }

  .content-display p,
  .content-display h1,
  .content-display h3,
  .content-display h5 {
    font-family: dayRoman;
    width: 100%;
    max-width: 600px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }

  .content-display p {
    margin-top: 0.5rem;
  }

  .content-display > :first-child:not(.img) > p {
    margin-top: 3.5rem;
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