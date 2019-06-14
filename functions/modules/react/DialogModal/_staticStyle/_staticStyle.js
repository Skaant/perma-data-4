export default `
  .content-display p:not(.text-init),
  .content-display ol {
    font-size: 1.2rem;
  }

  .content-display h5 {
    font-size: 1.75rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .content-display h3 {
    font-size: 2.1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .content-display h1 {
    font-size: 2.8rem;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .content-display p:not(.text-init),
  .content-display ol,
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

  .content-display > .row > p {
    margin-top: 0.5rem;
  }

  .content-display > .row:first-of-type > h1 {
    margin-top: 4rem;
  }

  .content-display> .row > blockquote {
    width: 100%;
    margin-top: 1.5rem;
    margin-bottom: 0;
    color: grey;
  }

  .content-display .img > img {
    margin: auto;
  }`