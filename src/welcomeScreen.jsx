import "./welcomeScreen.css";

function WelcomeScreen(props) {
  console.log("welcome");
  return props.showWelcomeScreen ? (
    <div className="WelcomeScreen">
      <h1>Welcome to the Meet app</h1>
      <h4>
        Log in to see upcoming events around the world for full-stack developers
      </h4>
      <div className="button_cont" align="center">
        <button
          className="google-btn btn-text"
          onClick={() => {
            props.getAccessToken();
          }}
          rel="nofollow noopener"
        >
          <b>Sign in with google</b>
        </button>
      </div>

      <a
        href="https://regazi.github.io/MeetUp/privacy.html"
        rel="nofollow noopener"
      >
        Privacy policy
      </a>
    </div>
  ) : null;
}
export default WelcomeScreen;
