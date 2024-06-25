import { LoginFacebook, LoginGoogle } from "../_lib/actions";

function SignInButton() {
  return (
    <>
      <form action={LoginGoogle}>
        <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium">
          <img
            src="https://authjs.dev/img/providers/google.svg"
            alt="Google logo"
            height="24"
            width="24"
          />
          <span>Continue with Google</span>
        </button>
      </form>

      {/* <form action={LoginFacebook}>
        <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium">
          <img
            src="https://authjs.dev/img/providers/facebook.svg"
            alt="Google logo"
            height="24"
            width="24"
          />
          <span>Continue with Facebook</span>
        </button>
      </form> */}
    </>
  );
}

export default SignInButton;
