"use client";

import { GoogleLogin } from "@react-oauth/google";

export default function () {

  const Signup = () => {

  };

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-[300px] rounded-3xl border-2 border-slate-200 h-auto flex flex-col items-center p-3 backdrop-blur-lg shadow-2xl bg-white/5">
          <h1 className="font-bold text-[20px]">Join to click!!</h1>

          <div className="w-full h-auto flex items-center justify-center mt-[50px]">
            <GoogleLogin
              onSuccess={Signup}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>

          <h1 className="text-center mt-[40px] font-medium">Already have a Account? Login</h1>

        </div>
      </div>
    </>
  );
}
